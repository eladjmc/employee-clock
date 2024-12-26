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

export async function findTimesheetById(id: string) {
    return TimesheetModel.findById(id).populate('employee').populate('manager');
  }

  

  export async function findActiveTimesheetByEmployee(employeeId: string) {
    // "Active" = has startTime but no endTime set => user is 'clocked in'
    return TimesheetModel.findOne({
      employee: employeeId,
      endTime: { $exists: false }
    }).populate('employee').populate('manager');
  }
  
  export async function updateTimesheet(id: string, update: Partial<ITimesheet>) {
    return TimesheetModel.findByIdAndUpdate(id, update, { new: true })
      .populate('employee')
      .populate('manager');
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

