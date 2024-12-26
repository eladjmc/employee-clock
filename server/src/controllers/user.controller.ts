import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

export async function createUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const dto: CreateUserDto = req.body;
    const user = await UserService.createNewUser(dto);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getAllUsersController(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.findAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}
