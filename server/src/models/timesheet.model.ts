import mongoose, { Schema, model } from 'mongoose';
import { TimesheetStatus } from '../constants/timesheet.constant';
import { NINETY_DAYS_IN_SECONDS } from '../constants/general.constant';

export interface ITimesheet {
  employee: mongoose.Types.ObjectId;   // references a user (Employee or Manager)
  manager: mongoose.Types.ObjectId;    // references the user’s manager
  startTime: Date;                   // date/time the user clocked in
  endTime?: Date | null;             // date/time the user clocked out (if any)
  reportText?: string;               // final text or auto-generated text
  status: TimesheetStatus;           // PENDING, APPROVED, REJECTED
  isActive: boolean;                 // is the user currently clocked in for this shift?
}

const TimesheetSchema = new Schema<ITimesheet>(
  {
    employee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    manager:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, default: null },
    reportText: { type: String, default: '' },
    status: {
      type: String,
      enum: Object.values(TimesheetStatus),
      default: TimesheetStatus.PENDING,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// TTL index: after 90 days from createdAt, doc is auto-removed (time to live...)
TimesheetSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: NINETY_DAYS_IN_SECONDS }
);

// Additional indexes - for faster lookups basically
TimesheetSchema.index({ manager: 1 });
TimesheetSchema.index({ employee: 1 });
TimesheetSchema.index({ manager: 1, isActive: 1 });

export const TimesheetModel = model<ITimesheet>('Timesheet', TimesheetSchema);
