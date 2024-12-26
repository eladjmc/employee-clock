import { createTimesheet, findActiveTimesheetByUser, findTimesheetById, updateTimesheet, findPendingClockedOutByManager } from '../dal/timesheet.dal';
import { ApiError } from '../errors/api-error';
import { TimesheetStatus } from '../constants/timesheet.constant';
import { findUserById } from './user.service'; // existing user service
import { Types } from 'mongoose';

export async function clockIn(userId: string, managerId: string, reportText?: string) {
  // Check if there's an active timesheet
  const activeTimesheet = await findActiveTimesheetByUser(userId);
  if (activeTimesheet) {
    throw new ApiError(400, 'You are already clocked in.');
  }

  // Validate manager
  const manager = await findUserById(managerId);
  if (!manager) {
    throw new ApiError(404, 'Manager not found');
  }
  // Could also check if manager.role === 'MANAGER'

  // Create new timesheet
  const now = new Date();
  const timesheet = await createTimesheet({
    employee: new Types.ObjectId(userId),
    manager: new Types.ObjectId(managerId),
    startTime: now,
    endTime: null,
    reportText: reportText || '',
    status: TimesheetStatus.PENDING,
    isActive: true,
  });
  return timesheet;
}

// 2.2.2 Clock Out
export async function clockOut(userId: string, finalReportText?: string) {
  // Get the user's active timesheet
  const timesheet = await findActiveTimesheetByUser(userId);
  if (!timesheet) {
    throw new ApiError(400, 'No active timesheet found for this user.');
  }

  const startTime = timesheet.startTime.getTime();
  const now = Date.now();
  const diffMs = now - startTime; // difference in milliseconds
  const diffHours = diffMs / (1000 * 60 * 60);

  let endTime = new Date(now);
  let reportText = finalReportText ?? '';

  if (diffHours > 12) {
    // Cap at 12 hours
    endTime = new Date(startTime + 12 * 60 * 60 * 1000);
    reportText = 'Did not clock out'; 
  }

  const updated = await updateTimesheet(timesheet.id, {
    endTime,
    reportText,
    isActive: false,
    status: TimesheetStatus.PENDING, // Now awaiting manager approval
  });
  return updated;
}

// 2.2.3 Check In Status
export async function getCheckInStatus(userId: string) {
  const activeTimesheet = await findActiveTimesheetByUser(userId);
  return !!activeTimesheet; // true if user is clocked in, false otherwise
}

// 2.2.4 Manager: Get Pending Clocked-Out Timesheets
export async function getManagerPendingReports(managerId: string) {
  // All timesheets where manager=managerId and status=PENDING, isActive=false
  return findPendingClockedOutByManager(managerId);
}

// 2.2.5 Approve / Reject
export async function approveOrRejectTimesheet(timesheetId: string, status: TimesheetStatus) {
  if (![TimesheetStatus.APPROVED, TimesheetStatus.REJECTED].includes(status)) {
    throw new ApiError(400, 'Invalid status update: must be APPROVED or REJECTED');
  }
  
  const ts = await findTimesheetById(timesheetId);
  if (!ts) {
    throw new ApiError(404, 'Timesheet not found');
  }
  
  // Option
