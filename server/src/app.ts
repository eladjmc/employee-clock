import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import userRouter from './routes/user.routes';
import timesheetRouter from './routes/timesheet.routes';
import authRouter from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/timesheets', timesheetRouter);

// Error Handling
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

export default app;
