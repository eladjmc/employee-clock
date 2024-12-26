import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.middleware';
import { createUserController, getAllUsersController } from '../controllers/user.controller';
import { Roles } from '../constants/roles.constant';

const userRouter = Router();

// Only a MANAGER or an ADMIN (if you had admin) could create new users, for example
userRouter.post('/', authenticateJWT, authorizeRoles(Roles.MANAGER), createUserController);

// A manager might see a list of all users, or an admin could
userRouter.get('/', authenticateJWT, authorizeRoles(Roles.MANAGER), getAllUsersController);

export default userRouter;
