import { Request, Response, NextFunction } from 'express';

// ─── Employee ───────────────────────────────────────────────

export interface Employee {
  id: number;
  full_name: string;
  job_title: string;
  country: string;
  salary: number;
}

export interface CreateEmployeeDto {
  full_name: string;
  job_title: string;
  country: string;
  salary: number;
}

export interface UpdateEmployeeDto {
  full_name?: string;
  job_title?: string;
  country?: string;
  salary?: number;
}

// ─── Salary ─────────────────────────────────────────────────

export interface SalaryBreakdown {
  employee_id: number;
  full_name: string;
  country: string;
  gross_salary: number;
  tds_rate: number;
  tds_deduction: number;
  net_salary: number;
}

export interface SalaryMetricsByCountry {
  country: string;
  min_salary: number;
  max_salary: number;
  avg_salary: number;
}

export interface SalaryMetricsByJobTitle {
  job_title: string;
  avg_salary: number;
}

// ─── Country ────────────────────────────────────────────────

export interface CountryConfig {
  name: string;
  tdsRate: number;
}

export interface CountriesMap {
  [key: string]: CountryConfig;
}

// ─── API Response ───────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
}

// ─── Config ─────────────────────────────────────────────────

export interface AppConfig {
  PORT: number;
  NODE_ENV: string;
}

// ─── Express Middleware ─────────────────────────────────────

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
