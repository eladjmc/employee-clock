import mongoose, { Schema, model } from 'mongoose';
import { TimesheetStatus } from '../constants/timesheet.constant';

export interface ITimesheet {
  employee: mongoose.Types.ObjectId;  // references a user with role=EMPLOYEE
  manager: mongoose.Types.ObjectId;   // references a user with role=MANAGER
  date: string;
  startTime: string;
  endTime: string;
  status: TimesheetStatus;
}

const TimesheetSchema = new Schema<ITimesheet>(
  {
    employee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    manager:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date:     { type: String, required: true },
    startTime:{ type: String, required: true },
    endTime:  { type: String, required: true },
    status:   {
      type: String,
      enum: Object.values(TimesheetStatus),
      default: TimesheetStatus.PENDING
    }
  },
  { timestamps: true }
);

export const TimesheetModel = model<ITimesheet>('Timesheet', TimesheetSchema);
