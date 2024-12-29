import { TimesheetResponseItem } from "../dto/timesheet.dto";
import { Timesheet, TimesheetStatus } from "../types/timesheet";

export const transformToTimesheet = (item: TimesheetResponseItem): Timesheet => {
  return {
    id: item._id,
    employeeId: item.employee._id,
    employeeFirstName: item.employee.firstName,
    employeeLastName: item.employee.lastName,
    managerId: item.manager._id,
    startTime: item.startTime,
    endTime: item.endTime || null,
    reportText: item.reportText || '',
    status: item.status as TimesheetStatus,
    isActive: item.isActive,
  };
};
