import { TimesheetModel } from '../models/timesheet.model';
import { ITimesheet } from '../models/timesheet.model';

export async function createTimesheet(data: Partial<ITimesheet>) {
  return TimesheetModel.create(data);
}

export async function findActiveTimesheetByUser(userId: string) {
  return TimesheetModel.findOne({
    employee: userId,
    isActive: true,
  });
}

export async function findTimesheetById(timesheetId: string) {
  return TimesheetModel.findById(timesheetId);
}

export async function updateTimesheet(timesheetId: string, updates: Partial<ITimesheet>) {
  return TimesheetModel.findByIdAndUpdate(timesheetId, updates, { new: true });
}

export async function findPendingClockedOutByManager(managerId: string) {
  return TimesheetModel.find({
    manager: managerId,
    status: 'PENDING',
    isActive: false, // means user has clocked out
  })
    .populate('employee')
    .populate('manager');
}