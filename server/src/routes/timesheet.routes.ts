import { Router } from 'express';
import {
  createTimesheetController,
  getTimesheetsForManagerController,
  approveRejectTimesheetController
} from '../controllers/timesheet.controller';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.middleware';
import { Roles } from '../constants/roles.constant';

const timesheetRouter = Router();

// Employee creates timesheet (only an EMPLOYEE can do this)
timesheetRouter.post('/', authenticateJWT, authorizeRoles(Roles.EMPLOYEE), createTimesheetController);

// Manager gets timesheets of direct reports
timesheetRouter.get(
  '/manager/:managerId',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  getTimesheetsForManagerController
);

// Manager approves/rejects a timesheet
timesheetRouter.put(
  '/:timesheetId/status',
  authenticateJWT,
  authorizeRoles(Roles.MANAGER),
  approveRejectTimesheetController
);

export default timesheetRouter;
