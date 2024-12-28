import { TimesheetStatus } from '../constants/timesheet.constant';
import { TimesheetModel } from '../models/timesheet.model';
import { ITimesheet } from '../models/timesheet.model';
import mongoose from 'mongoose';

// Create a new timesheet.
export async function createTimesheet(data: ITimesheet) {
  return TimesheetModel.create(data);
}

//Find a timesheet by its ID.
export async function findTimesheetById(id: string) {
  return TimesheetModel.findById(id).populate('employee').populate('manager');
}

// Find the active timesheet for a user.
export async function findActiveTimesheetByUser(userId: string) {
  return TimesheetModel.findOne({
    employee: new mongoose.Types.ObjectId(userId),
    isActive: true
  }).populate('employee').populate('manager');
}

// Update a timesheet by its ID.
export async function updateTimesheet(
  timesheetId: string,
  update: Partial<ITimesheet>
) {
  return TimesheetModel.findByIdAndUpdate(timesheetId, update, { new: true })
    .populate('employee')
    .populate('manager');
}

// Delete a timesheet by its ID.
export async function deleteTimesheet(timesheetId: string) {
  return TimesheetModel.findByIdAndDelete(timesheetId);
}

// Count documents based on a query.
export async function countDocuments(query: any) {
  return TimesheetModel.countDocuments(query);
}

// Find timesheets based on a query with pagination and sorting.
export async function findTimesheets(query: any, skip: number, limit: number, sortOptions?: any) {
  return TimesheetModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions || { createdAt: -1 })
    .populate('employee')
    .populate('manager');
}

// Find pending and clocked out timesheets by manager with pagination.
export async function findPendingClockedOutByManager(
  managerId: string,
  skip: number,
  limit: number
) {
  const query = {
    manager: new mongoose.Types.ObjectId(managerId),
    status: 'PENDING',
    isActive: false
  };

  return TimesheetModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate('employee')
    .populate('manager');
}
// This is DRY but easier to me to understand the flow  - sorry
export async function findAllClockedOutByManager(
  managerId: string,
  skip: number,
  limit: number
) {
  const query = {
    manager: new mongoose.Types.ObjectId(managerId),
    isActive: false
  };

  return TimesheetModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate('employee')
    .populate('manager');
}

// Count pending and clocked out timesheets by manager.
export async function countPendingOrAllClockedOutByManager(managerId: string,status?:TimesheetStatus) {
  const query = {
    manager: new mongoose.Types.ObjectId(managerId),
    isActive: false,
    status
  };

  console.log(query);
  
  return TimesheetModel.countDocuments(query);
}
