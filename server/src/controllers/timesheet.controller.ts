import { Request, Response, NextFunction } from 'express';
import * as TimesheetService  from '../services/timesheet.service';
import { TimesheetStatus } from '../constants/timesheet.constant';

export async function clockInController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user;       // from JWT
    const { managerId, reportText } = req.body; // managerId is needed

    const newTimesheet = await TimesheetService.clockIn(userId, managerId, reportText);
     res.status(201).json(newTimesheet);
  } catch (error) {
    next(error);
  }
}

export async function clockOutController(req: Request, res: Response, next: NextFunction) {
  try {
    const { timesheetId } = req.params;
    const { reportText } = req.body;

    const updatedTimesheet = await TimesheetService.clockOut(timesheetId, reportText);
     res.json(updatedTimesheet);
  } catch (error) {
    next(error);
  }
}

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

export async function managerPendingReportsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as any).user; // manager
    const pendingList = await TimesheetService.getManagerPendingReports(userId);
     res.json(pendingList);
  } catch (error) {
    next(error);
  }
}

export async function approveRejectController(req: Request, res: Response, next: NextFunction) {
  try {
    const { timesheetId } = req.params;
    const { status } = req.body;  // "APPROVED" or "REJECTED"

    const updated = await TimesheetService.approveOrRejectTimesheet(timesheetId, status as TimesheetStatus);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}
