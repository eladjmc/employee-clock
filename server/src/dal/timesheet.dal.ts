import { TimesheetModel } from '../models/timesheet.model';
import { ITimesheet } from '../models/timesheet.model';

export async function createTimesheet(data: ITimesheet) {
  return TimesheetModel.create(data);
}

export async function getTimesheetsByManager(managerId: string) {
  return TimesheetModel.find({ manager: managerId })
    .populate('employee')
    .populate('manager');
}

export async function getTimesheetById(timesheetId: string) {
  return TimesheetModel.findById(timesheetId)
    .populate('employee')
    .populate('manager');
}

export async function updateTimesheetStatus(timesheetId: string, status: string) {
  return TimesheetModel.findByIdAndUpdate(
    timesheetId,
    { status },
    { new: true }
  )
    .populate('employee')
    .populate('manager');
}
