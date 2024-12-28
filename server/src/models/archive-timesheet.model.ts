import mongoose, { Schema, model } from 'mongoose';
import { TimesheetStatus } from '../constants/timesheet.constant';

export interface IArchiveTimesheet {
    originalId:mongoose.Types.ObjectId   // reference to the original doc _id
    employee: mongoose.Types.ObjectId;   // references a user (Employee or Manager)
    manager: mongoose.Types.ObjectId;    // references the user’s manager
    startTime: Date;                   // date/time the user clocked in
    endTime?: Date | null;             // date/time the user clocked out (if any)
    reportText?: string;               // final text or auto-generated text
    status: TimesheetStatus;           // PENDING, APPROVED, REJECTED
    isActive: boolean;                 // is the user currently clocked in for this shift?
    archivedAt: Date
  }
  

const ArchiveTimesheetSchema = new Schema<IArchiveTimesheet>(
  {
    originalId: { type: Schema.Types.ObjectId }, 
    employee: { type: Schema.Types.ObjectId, ref: 'User' },
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
    startTime: Date,
    endTime: Date,
    reportText: String,
    status: String, 
    archivedAt: { type: Date, default: Date.now }, // when did we moved it here (not really important as I added time stamps anyway)
  },
  { timestamps: true }
);

// optional indexes
ArchiveTimesheetSchema.index({ manager: 1 });
ArchiveTimesheetSchema.index({ employee: 1 });

export const ArchiveTimesheetModel = model<IArchiveTimesheet>('ArchiveTimesheet', ArchiveTimesheetSchema);
