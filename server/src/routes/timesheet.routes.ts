import { Router } from 'express';
import {
  clockInController,
  clockOutController,
  getClockInStatusController,
  managerPendingReportsController,
  approveRejectController
} from '../controllers/timesheet.controller';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.middleware';
import { Roles } from '../constants/roles.constant';

const timesheetRouter = Router();


 // Employee or Manager can clock in. 
timesheetRouter.post(
  '/clockin',
  authenticateJWT,
  // No strict role check here. Because you might be a manager who is also an employee under a bigger manager. 
  clockInController
);


// Clock out route.
timesheetRouter.put(
  '/clockout/:timesheetId',
  authenticateJWT,
  clockOutController
);

// Get the clock-in status of the logged in user:
// returns the active timesheet or null(null means he didn't clock in)
timesheetRouter.get(
  '/status',
  authenticateJWT,
  getClockInStatusController
);

// Get all the pending clocks of the employees for a manager
timesheetRouter.get(
  '/manager/pending',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  managerPendingReportsController
);

// Approve / Reject timesheet
timesheetRouter.put(
  '/:timesheetId/status',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  approveRejectController
);

export default timesheetRouter;
