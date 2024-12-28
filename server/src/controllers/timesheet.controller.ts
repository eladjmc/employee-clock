import { Request, Response, NextFunction } from 'express';
import * as TimesheetService from '../services/timesheet.service';
import { TimesheetStatus } from '../constants/timesheet.constant';
import { findManagerByUserId } from '../services/user.service';
import { ApiError } from '../errors/api-error';

/**
 * Controller to handle clock-in requests.
 */
export async function clockInController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user;       // from JWT
    const { reportText } = req.body;
    const managerId = await findManagerByUserId(userId);

    const newTimesheet = await TimesheetService.clockIn(userId, managerId, reportText);
    res.status(201).json(newTimesheet);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to handle clock-out requests.
 */
export async function clockOutController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user;  // from JWT
    const { reportText } = req.body;

    const updatedTimesheet = await TimesheetService.clockOut(userId, reportText);
    res.json(updatedTimesheet);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to get the clock-in status of the logged-in user.
 */
export async function getClockInStatusController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user;
    const activeTimesheet = await TimesheetService.getClockInStatus(userId);
    /**
     * If activeTimesheet != null => user is clocked in,
     * else user is clocked out
     */
    res.json({ activeTimesheet });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to get paginated pending timesheets for a manager.
 */
export async function managerPendingReportsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user; // manager
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const pendingList = await TimesheetService.getManagerPendingReportsPaginated(userId, page, limit);
    res.json(pendingList);
  } catch (error) {
    next(error);
  }
}

// This is DRY but easier for me to understand the flow like this - sorry
export async function managerAllReportsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user; // manager
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const pendingList = await TimesheetService.getManagerAllReportsPaginated(userId, page, limit);
    res.json(pendingList);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to approve or reject a timesheet.
 */
export async function approveRejectController(req: Request, res: Response, next: NextFunction) {
  try {
    const { timesheetId } = req.params;
    const { status } = req.body;  // "APPROVED" or "REJECTED"

    if (!timesheetId) {
      throw new ApiError(400, 'Timesheet ID is required');
    }

    if (!status) {
      throw new ApiError(400, 'Status is required');
    }
    // Validate status
    if (![TimesheetStatus.APPROVED, TimesheetStatus.REJECTED].includes(status as TimesheetStatus)) {
      throw new ApiError(400, 'Status must be APPROVED or REJECTED');
    }

    const result = await TimesheetService.approveOrRejectTimesheet(timesheetId, status as TimesheetStatus);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
