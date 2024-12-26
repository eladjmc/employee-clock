import { CreateUserDto } from "../dto/create-user.dto";
import { ApiError } from "../errors/api-error";
import { createUser, getAllUsers, getUserById } from "../dal/user.dal";
import { Roles } from "../constants/roles.constant";
import { Types } from "mongoose";
import { IUser } from "../models/user.model";

export async function createNewUser(dto: CreateUserDto) {
  if (dto.role === Roles.EMPLOYEE) {
    if (!dto.manager) {
      throw new ApiError(400, "Employee must have a manager");
    }
    const manager = await getUserById(dto.manager);
    if (!manager || manager.role !== Roles.MANAGER) {
      throw new ApiError(400, "The manager you provided is invalid");
    }
  }

  return createUser({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: dto.password,
    role: dto.role,
    manager: dto.manager
      ? new Types.ObjectId(dto.manager)
      : null,
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

export async function findManagerByUserId(userId:string) {
  const user = await findUserById(userId);
  if(!user.manager){
    throw new ApiError(404, `User with ID ${userId} does not have a manager`);
  }
  return user.manager.toString()
}