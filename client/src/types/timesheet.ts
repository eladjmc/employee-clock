export enum TimesheetStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }
  
  export interface Timesheet {
    id: string;
    employeeId: string;
    managerId: string;
    startTime: string; 
    endTime?: string | null;
    reportText?: string;
    status: TimesheetStatus;
    isActive: boolean;
  }

  