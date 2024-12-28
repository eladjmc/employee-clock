import * as TimesheetDal from '../dal/timesheet.dal';
import * as ArchiveTimesheetDal from '../dal/archive-timesheet.dal';
import { ApiError } from '../errors/api-error';
import { TimesheetStatus } from '../constants/timesheet.constant';
import { findUserById } from './user.service'; // existing user service
import mongoose from 'mongoose';
import { ONE_HOUR } from '../constants/general.constant';

// Clock In a user by creating a new timesheet.
export async function clockIn(userId: string, managerId: string, reportText?: string) {
  // Check if user is already active (clocked in)
  const activeTimesheet = await TimesheetDal.findActiveTimesheetByUser(userId);
  if (activeTimesheet) {
    throw new ApiError(400, 'You are already clocked in.');
  }

  // Validate manager
  const manager = await findUserById(managerId);
  if (!manager || manager.role !== 'MANAGER') { // Assuming 'MANAGER' is a valid role
    throw new ApiError(404, 'Manager not found');
  }

  // Create new timesheet
  const now = new Date();
  const timesheet = await TimesheetDal.createTimesheet({
    employee: new mongoose.Types.ObjectId(userId),
    manager: new mongoose.Types.ObjectId(managerId),
    startTime: now,
    endTime: null,
    reportText: reportText || '',
    status: TimesheetStatus.PENDING,
    isActive: true,
  });
  return timesheet;
}

// Clock Out a user by updating the active timesheet.
export async function clockOut(userId: string, finalReportText?: string) {
  // Get the active timesheet
  const timesheet = await TimesheetDal.findActiveTimesheetByUser(userId);
  if (!timesheet) {
    throw new ApiError(400, 'No active timesheet found for this user.');
  }

  // Calculate time difference
  const startTime = timesheet.startTime.getTime();
  const now = Date.now();
  const diffMs = now - startTime; // difference in milliseconds
  const diffHours = diffMs / (ONE_HOUR);

  // Determine endTime and reportText
  let endTime = new Date(now);
  let reportText = finalReportText || timesheet.reportText || "";

  if (diffHours > 12) {
    // Cap at 12 hours
    endTime = new Date(startTime + (12 * ONE_HOUR));
    reportText = 'Did not clock out';
  }

  // Update the timesheet
  const updatedTimesheet = await TimesheetDal.updateTimesheet(timesheet._id.toString(), {
    endTime,
    reportText,
    isActive: false,
    status: TimesheetStatus.PENDING, // Now awaiting manager approval
  });

  return updatedTimesheet;
}

// Get the clock-in status of a user.
export async function getClockInStatus(userId: string) {
  const activeTimesheet = await TimesheetDal.findActiveTimesheetByUser(userId);
  return activeTimesheet; // returns the active timesheet or null - null we tell us that the user didnt clock in yet
}

// Get paginated pending timesheets for a manager.
export async function getManagerPendingReportsPaginated(
  managerId: string,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit;

  // Fetch timesheets
  const [items, totalCount] = await Promise.all([
    TimesheetDal.findPendingClockedOutByManager(managerId, skip, limit),
    TimesheetDal.countPendingOrAllClockedOutByManager(managerId, TimesheetStatus.PENDING)
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    items,
    totalCount,
    totalPages,
    currentPage: page
  };
}

// This is DRY but easier for me to understand the flow like this - sorry
// getting all the report to display in dashboard later on
export async function getManagerAllReportsPaginated(
  managerId: string,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit;

  // Fetch timesheets
  const [items, totalCount] = await Promise.all([
    TimesheetDal.findAllClockedOutByManager(managerId, skip, limit),
    TimesheetDal.countPendingOrAllClockedOutByManager(managerId)
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    items,
    totalCount,
    totalPages,
    currentPage: page
  };
}

// Approve or reject a timesheet, archive it, and remove from active collection.
export async function approveOrRejectTimesheet(
  timesheetId: string,
  newStatus: TimesheetStatus
) {
  // Validate newStatus
  if (![TimesheetStatus.APPROVED, TimesheetStatus.REJECTED].includes(newStatus)) {
    throw new ApiError(400, 'Status must be APPROVED or REJECTED');
  }

  // Find the timesheet
  const timesheet = await TimesheetDal.findTimesheetById(timesheetId);
  if (!timesheet) {
    throw new ApiError(404, `Timesheet with ID ${timesheetId} not found`);
  }

  if (!timesheet.endTime) {
    throw new ApiError(400, 'Cannot approve/reject a timesheet that has not been clocked out');
  }

  // Update status and isActive in Timesheet collection
  timesheet.status = newStatus;
  timesheet.isActive = false;
  await timesheet.save();

  // 4. Archive the timesheet
  const archiveData = {
    originalId: timesheet._id,
    employee: timesheet.employee,
    manager: timesheet.manager,
    startTime: timesheet.startTime,
    endTime: timesheet.endTime,
    reportText: timesheet.reportText,
    status: timesheet.status,
    isActive: timesheet.isActive,
    archivedAt: new Date()
  };

  await ArchiveTimesheetDal.createArchiveTimesheet(archiveData);

  return {
    message: `Timesheet ${timesheetId} ${newStatus}`,
    archived: true
  };
}
