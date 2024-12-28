import { TimesheetStatus } from '../types/timesheet';

export interface ClockInRequestDto {
  reportText?: string;
}

export interface ClockInResponseDto {
  id: string;
  employeeId: string;
  managerId: string;
  startTime: string;
  status: TimesheetStatus;
  isActive: boolean;
}

export interface ClockOutRequestDto {
  reportText?: string;
}

export interface ClockOutResponseDto {
  id: string;
  endTime?: string | null;
  reportText?: string;
  status: TimesheetStatus;
  isActive: boolean;
}

export interface ApproveRejectRequestDto {
  status: TimesheetStatus.APPROVED | TimesheetStatus.REJECTED;
}

export interface ApproveRejectResponseDto {
  message: string;
  archived: boolean;
}

export interface GetClockInStatusResponseDto {
  activeTimesheet: TimesheetResponseDto | null;
}

export interface GetManagerReportsResponseDto {
  items: TimesheetResponseItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface TimesheetResponseDto {
  id: string;
  employee: {
    firstName: string;
    lastName: string;
  };
  startTime: string;
  endTime?: string | null;
  reportText?: string;
  status: TimesheetStatus;
}

export interface TimesheetResponseItem {
    _id: string;
    employee: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    manager: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    startTime: string;
    endTime?: string | null;
    reportText?: string;
    status: TimesheetStatus;
    isActive: boolean;
  }