import { CreateUserDto } from '../dto/create-user.dto';
import { ApiError } from '../errors/api-error';
import { createUser, getAllUsers, getUserById } from '../dal/user.dal';
import { Roles } from '../constants/roles.constant';

export async function createNewUser(dto: CreateUserDto) {
  if (dto.role === Roles.EMPLOYEE && !dto.manager) {
    throw new ApiError(400, 'Employee must have a manager');
  }

  // Here you could also check if the provided manager actually exists and is a MANAGER
  // ...

  return createUser({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: dto.password,
    role: dto.role,
    manager: dto.manager
      ? (dto.manager as any) // cast to ObjectId if needed
      : null
  });
}

export async function findAllUsers() {
  return getAllUsers();
}

export async function findUserById(userId: string) {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, `User with ID ${userId} not found`);
  }
  return user;
}
