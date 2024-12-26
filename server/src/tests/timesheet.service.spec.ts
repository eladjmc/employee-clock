import * as TimesheetService from '../services/timesheet.service';
import * as TimesheetDal from '../dal/timesheet.dal';
import * as UserService from '../services/user.service';
import { Roles } from '../constants/roles.constant';
import { ApiError } from '../errors/api-error';
import { TimesheetStatus } from '../constants/timesheet.constant';

jest.mock('../dal/timesheet.dal');
jest.mock('../services/user.service');

describe('TimesheetService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new timesheet if user is EMPLOYEE and manager is MANAGER', async () => {
    (UserService.findUserById as jest.Mock)
      .mockResolvedValueOnce({ _id: 'empId', role: Roles.EMPLOYEE })
      .mockResolvedValueOnce({ _id: 'mgrId', role: Roles.MANAGER });

    (TimesheetDal.createTimesheet as jest.Mock).mockResolvedValueOnce({
      _id: 'timesheet-id',
      employee: 'empId',
      manager: 'mgrId',
      date: '2024-12-31',
      startTime: '09:00',
      endTime: '17:00',
      status: TimesheetStatus.PENDING
    });

    const result = await TimesheetService.createNewTimesheet({
      employee: 'empId',
      manager: 'mgrId',
      date: '2024-12-31',
      startTime: '09:00',
      endTime: '17:00'
    });

    expect(result).toHaveProperty('_id', 'timesheet-id');
    expect(result).toHaveProperty('status', TimesheetStatus.PENDING);
  });

  it('should throw error if employee role is not EMPLOYEE', async () => {
    (UserService.findUserById as jest.Mock)
      .mockResolvedValueOnce({ _id: 'empId', role: Roles.MANAGER }); // invalid role

    await expect(
      TimesheetService.createNewTimesheet({
        employee: 'empId',
        manager: 'mgrId',
        date: '2024-12-31',
        startTime: '09:00',
        endTime: '17:00'
      })
    ).rejects.toThrow(ApiError);
  });
});
