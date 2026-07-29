import { getDb } from '../db/connection';
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  SalaryMetricsByCountry,
  SalaryMetricsByJobTitle,
} from '../types';

// TODO: Implement repository methods via TDD

export async function create(employeeData: CreateEmployeeDto): Promise<Employee> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function findById(id: number): Promise<Employee | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function findAll(): Promise<Employee[]> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function update(id: number, employeeData: UpdateEmployeeDto): Promise<Employee | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function remove(id: number): Promise<boolean> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function getStatsByCountry(country: string): Promise<SalaryMetricsByCountry | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function getAvgSalaryByJobTitle(jobTitle: string): Promise<SalaryMetricsByJobTitle | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}
