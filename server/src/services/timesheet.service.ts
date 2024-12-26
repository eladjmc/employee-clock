import * as TimesheetDal from '../dal/timesheet.dal';
import { ApiError } from '../errors/api-error';
import { TimesheetStatus } from '../constants/timesheet.constant';
import { findUserById } from './user.service'; // existing user service
import { Types } from 'mongoose';
import { Roles } from '../constants/roles.constant';
import { ONE_HOUR } from '../constants/general.constant';

export async function clockIn(userId: string, managerId: string, reportText?: string) {
  const activeTimesheet = await TimesheetDal.findActiveTimesheetByUser(userId);
  if (activeTimesheet) {
    throw new ApiError(400, 'You are already clocked in.');
  }

  // Validate manager
  const manager = await findUserById(managerId);
  if (!manager || manager.role !== Roles.MANAGER) {
    throw new ApiError(404, 'Manager not found');
  }

  // Create new timesheet
  const now = new Date();
  const timesheet = await TimesheetDal.createTimesheet({
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

export async function clockOut(userId: string, finalReportText?: string) {
  // Get the user active timesheet
  const timesheet = await TimesheetDal.findActiveTimesheetByUser(userId);
  if (!timesheet) {
    throw new ApiError(400, 'No active timesheet found for this user.');
  }

  const startTime = timesheet.startTime.getTime();
  const now = Date.now();
  const diffMs = now - startTime; // difference in milliseconds
  const diffHours = diffMs / ONE_HOUR;

  let endTime = new Date(now);
  let reportText = finalReportText ? finalReportText : '';

  if (diffHours > 12) {
    // Cap at 12 hours
    endTime = new Date(startTime + 12 * ONE_HOUR);
    reportText = 'Did not clock out'; 
  }

  const updated = await TimesheetDal.updateTimesheet(timesheet.id, {
    endTime,
    reportText,
    isActive: false,
    status: TimesheetStatus.PENDING, // Now awaiting manager approval
  });
  return updated;
}

export async function getCheckInStatus(userId: string) {
  const activeTimesheet = await TimesheetDal.findActiveTimesheetByUser(userId);
  return !!activeTimesheet; // true if user is clocked in, false otherwise
}

export async function getManagerPendingReports(managerId: string) {
  // All timesheets where manager=managerId and status=PENDING, isActive=false
  return TimesheetDal.findPendingClockedOutByManager(managerId);
}

export async function getClockInStatus(employeeId: string) {
    return TimesheetDal.findActiveTimesheetByEmployee(employeeId);
  }

export async function approveOrRejectTimesheet(timesheetId: string, newStatus: TimesheetStatus) {
    if (![TimesheetStatus.APPROVED, TimesheetStatus.REJECTED].includes(newStatus)) {
      throw new ApiError(400, 'Status must be APPROVED or REJECTED');
    }
    const timesheet = await TimesheetDal.findTimesheetById(timesheetId);
    if (!timesheet) {
      throw new ApiError(404, `Timesheet with ID ${timesheetId} not found`);
    }
    if (!timesheet.endTime) {
      throw new ApiError(400, 'Cannot approve/reject a timesheet that has not been clocked out');
    }
    
    return TimesheetDal.updateTimesheet(timesheetId, {
      status: newStatus
    });
  }
