import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';
import { ApiError } from '../errors/api-error';
import { Roles } from '../constants/roles.constant';

export async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, password, role, manager } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      throw new ApiError(400, 'Missing required fields');
    }

    if (!Object.values(Roles).includes(role)) {
      throw new ApiError(400, 'Invalid role provided');
    }
    if(role === Roles.EMPLOYEE){
        await AuthService.validateUsersManagerExists(manager);
    }

    const user = await AuthService.registerUser(
      firstName,
      lastName,
      email,
      password,
      role,
      manager
    );
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, 'Missing email or password');
    }

    const result = await AuthService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
