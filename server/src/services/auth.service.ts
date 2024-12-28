import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail, getUserByEmailWithPassword, getUserById } from "../dal/user.dal";
import { ApiError } from "../errors/api-error";
import { TokenPayloadDto } from "../dto/token-payload.dto";
import { UserModel } from "../models/user.model";

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  manager?: string
) {
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new ApiError(400, "Email already in use");
  }

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
    role,
    manager: manager || null,
  });

  const userObject = user.toObject();

  const { password: _pw, ...sanitizedUser } = userObject;

  return sanitizedUser;
}

export async function loginUser(email: string, password: string) {
  const user = await getUserByEmailWithPassword(email);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT
  const secretKey = process.env.JWT_SECRET || "secret";
  const tokenPayload: TokenPayloadDto = {
    userId: user.id,
    role: user.role,
  };
  const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1d" });

  return { token, userId: user.id, role: user.role };
}

export async function validateUsersManagerExists(managerId:string) {
    const manager = await getUserById(managerId)
    if(!manager){
        throw new ApiError(404, "Manager does not exist")
    }
}
