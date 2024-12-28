import { ArchiveTimesheetModel } from '../models/archive-timesheet.model';
import { IArchiveTimesheet } from '../models/archive-timesheet.model';
import mongoose from 'mongoose';

// Create a new archive timesheet.
export async function createArchiveTimesheet(data: IArchiveTimesheet) {
  return ArchiveTimesheetModel.create(data);
}

// Find archive timesheets by manager with pagination.
export async function findArchiveTimesheetsByManager(
  managerId: string,
  skip: number,
  limit: number
) {
  return ArchiveTimesheetModel.find({ manager: new mongoose.Types.ObjectId(managerId) })
    .skip(skip)
    .limit(limit)
    .sort({ archivedAt: -1 })
    .populate('employee')
    .populate('manager');
}

// Count archive timesheets by manager.
export async function countArchiveTimesheetsByManager(managerId: string) {
  return ArchiveTimesheetModel.countDocuments({ manager: new mongoose.Types.ObjectId(managerId) });
}
