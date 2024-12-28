import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.middleware';
import { createUserController, getAllUsersController } from '../controllers/user.controller';
import { Roles } from '../constants/roles.constant';

// This entire file is basically not in the scope of the poc, but assuming the application is live it will be weird if anyone can register
// so I made sure for future work I can actually make an "Add employee" page in my client - you can skip it in the review for now...
const userRouter = Router();

// Only a MANAGER could create new users
userRouter.post('/', authenticateJWT, authorizeRoles(Roles.MANAGER), createUserController);

// A manager might see a list of all users, or an admin could
userRouter.get('/', authenticateJWT, authorizeRoles(Roles.MANAGER), getAllUsersController);

export default userRouter;
