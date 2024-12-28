import { TimesheetResponseItem } from "../dto/timesheet.dto";
import { Timesheet, TimesheetStatus } from "../types/timesheet";

  
export const transformToTimesheets = (item: TimesheetResponseItem): Timesheet => {
  return {
    id: item._id,
    employeeId: item.employee._id,
    managerId: item.manager._id,
    startTime: item.startTime,
    endTime: item.endTime || null,
    reportText: item.reportText || '',
    status: item.status as TimesheetStatus,
    isActive: item.isActive,
  };
};

  