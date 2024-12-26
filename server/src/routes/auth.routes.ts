import { Router } from 'express';
import { registerController, loginController } from '../controllers/auth.controller';

const authRouter = Router();

// Register new user (Employee or Manager)
authRouter.post('/register', registerController);

// Login existing user
authRouter.post('/login', loginController);

export default authRouter;
