import * as UserService from '../services/user.service';
import * as UserDal from '../dal/user.dal';
import { Roles } from '../constants/roles.constant';
import { ApiError } from '../errors/api-error';

jest.mock('../dal/user.dal.ts');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user if role=EMPLOYEE and manager is provided', async () => {
    const createUserSpy = jest.spyOn(UserDal, 'createUser').mockResolvedValueOnce({
      _id: 'user-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: Roles.EMPLOYEE,
      manager: 'manager-id'
    } as any);

    const result = await UserService.createNewUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      role: Roles.EMPLOYEE,
      manager: 'manager-id'
    });

    expect(createUserSpy).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('_id', 'user-id');
  });

  it('should throw error if role=EMPLOYEE and manager is not provided', async () => {
    await expect(
      UserService.createNewUser({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: Roles.EMPLOYEE
      })
    ).rejects.toThrow(ApiError);
  });
});
