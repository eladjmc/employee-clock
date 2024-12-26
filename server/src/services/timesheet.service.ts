import { CreateTimesheetDto } from '../dto/create-timesheet.dto';
import { ApiError } from '../errors/api-error';
import {
  createTimesheet,
  getTimesheetsByManager,
  getTimesheetById,
  updateTimesheetStatus
} from '../dal/timesheet.dal';
import { TimesheetStatus } from '../constants/timesheet.constant';
import { findUserById } from './user.service';

export async function createNewTimesheet(dto: CreateTimesheetDto) {
  // Validate that employee & manager exist and have correct roles
  const employee = await findUserById(dto.employee);
  if (employee.role !== 'EMPLOYEE') {
    throw new ApiError(400, `User ${dto.employee} is not an EMPLOYEE`);
  }

  const manager = await findUserById(dto.manager);
  if (manager.role !== 'MANAGER') {
    throw new ApiError(400, `User ${dto.manager} is not a MANAGER`);
  }

  return createTimesheet({
    employee: employee._id,
    manager: manager._id,
    date: dto.date,
    startTime: dto.startTime,
    endTime: dto.endTime,
    status: TimesheetStatus.PENDING
  });
}

export async function getManagerTimesheets(managerId: string) {
  return getTimesheetsByManager(managerId);
}

export async function approveOrRejectTimesheet(timesheetId: string, status: TimesheetStatus) {
  if (![TimesheetStatus.APPROVED, TimesheetStatus.REJECTED].includes(status)) {
    throw new ApiError(400, 'Invalid status update: must be APPROVED or REJECTED');
  }

  const timesheet = await getTimesheetById(timesheetId);
  if (!timesheet) {
    throw new ApiError(404, `Timesheet with ID ${timesheetId} not found`);
  }

  return updateTimesheetStatus(timesheetId, status);
}
