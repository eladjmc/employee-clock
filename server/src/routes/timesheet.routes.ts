import { Router } from 'express';
import {
  clockInController,
  clockOutController,
  getClockInStatusController,
  managerPendingReportsController,
  approveRejectController,
  managerAllReportsController
} from '../controllers/timesheet.controller';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.middleware';
import { Roles } from '../constants/roles.constant';

const timesheetRouter = Router();

// Employee or Manager can clock in.
// No strict role check here because a manager might also be an employee under another manager.
timesheetRouter.post(
  '/clockin',
  authenticateJWT,
  clockInController
);

// Clock out route.
timesheetRouter.put('/clockout', authenticateJWT, clockOutController);

// Get the clock-in status of the logged-in user.
timesheetRouter.get(
  '/status',
  authenticateJWT,
  getClockInStatusController
);

// Get all the pending timesheets of the employees for a manager with pagination.
timesheetRouter.get(
  '/manager/pending',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  managerPendingReportsController
);

// Get all timesheets of the employees for a manager with pagination.
timesheetRouter.get(
  '/manager/reports',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  managerAllReportsController
);

// Approve / Reject timesheet.
timesheetRouter.put(
  '/:timesheetId/status',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  approveRejectController
);

export default timesheetRouter;
