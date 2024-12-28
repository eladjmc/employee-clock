import { UserModel } from '../models/user.model';
import { IUser } from '../models/user.model';

export async function createUser(data: IUser) {
  return UserModel.create(data);
}

export async function getAllUsers() {
  return UserModel.find({});
}

export async function getUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
export async function getUserByEmailWithPassword(email: string) {
  return UserModel.findOne({ email }).select('+password');
}

export async function getUserById(userId: string) {
  return UserModel.findById(userId);
}

