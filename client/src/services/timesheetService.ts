import api from './api';
import {
  ClockInRequestDto,
  ClockInResponseDto,
  ClockOutRequestDto,
  ClockOutResponseDto,
  ApproveRejectRequestDto,
  ApproveRejectResponseDto,
  GetClockInStatusResponseDto,
  GetManagerReportsResponseDto,
} from '../dto/timesheet.dto';

export const clockIn = async (data: ClockInRequestDto): Promise<ClockInResponseDto> => {
  const response = await api.post<ClockInResponseDto>('/timesheets/clockin', data);
  return response.data;
};

export const clockOut = async (data: ClockOutRequestDto): Promise<ClockOutResponseDto> => {
  const response = await api.put<ClockOutResponseDto>('/timesheets/clockout', data);
  return response.data;
};

export const getClockInStatus = async (): Promise<GetClockInStatusResponseDto> => {
  const response = await api.get<GetClockInStatusResponseDto>('/timesheets/status');
  return response.data;
};

export const getManagerReports = async (page: number, limit: number): Promise<GetManagerReportsResponseDto> => {
  const response = await api.get<GetManagerReportsResponseDto>('/timesheets/manager/reports', {
    params: { page, limit },
  });
  return response.data;
};

export const approveRejectTimesheet = async (
  timesheetId: string,
  data: ApproveRejectRequestDto
): Promise<ApproveRejectResponseDto> => {
  const response = await api.put<ApproveRejectResponseDto>(`/timesheets/${timesheetId}/status`, data);
  return response.data;
};
