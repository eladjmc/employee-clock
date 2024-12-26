import { Request, Response, NextFunction } from 'express';
import * as TimesheetService from '../services/timesheet.service';
import { CreateTimesheetDto } from '../dto/create-timesheet.dto';
import { TimesheetStatus } from '../constants/timesheet.constant';

export async function createTimesheetController(req: Request, res: Response, next: NextFunction) {
  try {
    const dto: CreateTimesheetDto = req.body;
    const timesheet = await TimesheetService.createNewTimesheet(dto);
    res.status(201).json(timesheet);
  } catch (error) {
    next(error);
  }
}

export async function getTimesheetsForManagerController(req: Request, res: Response, next: NextFunction) {
  try {
    const managerId = req.params.managerId;
    const timesheets = await TimesheetService.getManagerTimesheets(managerId);
    res.json(timesheets);
  } catch (error) {
    next(error);
  }
}

export async function approveRejectTimesheetController(req: Request, res: Response, next: NextFunction) {
  try {
    const { timesheetId } = req.params;
    const { status } = req.body; // 'APPROVED' or 'REJECTED'
    const updated = await TimesheetService.approveOrRejectTimesheet(timesheetId, status as TimesheetStatus);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}
