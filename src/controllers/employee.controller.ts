import { Request, Response, NextFunction } from 'express';
import * as employeeService from '../services/employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../types';
import { sendSuccess, sendError } from '../utils/responseHelper';
import HTTP_STATUS from '../constants/httpStatusCodes';
import MESSAGES from '../constants/messages';

// TODO: Implement controller methods via TDD

export async function createEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { full_name, job_title, country, salary } = req.body as CreateEmployeeDto;

    if (!full_name || !job_title || !country || salary === undefined) {
      sendError(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.VALIDATION_ERROR);
      return;
    }

    const employee = await employeeService.createEmployee({ full_name, job_title, country, salary });
    sendSuccess(res, HTTP_STATUS.CREATED, employee, MESSAGES.EMPLOYEE_CREATED);
  } catch (error) {
    next(error);
  }
}

export async function getEmployeeById(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}

export async function getAllEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}

export async function updateEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}

export async function deleteEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}

export async function calculateSalary(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}

export async function getSalaryMetricsByCountry(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}

export async function getAvgSalaryByJobTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implement
}
