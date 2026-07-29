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
  const db = await getDb();

  db.run(
    'INSERT INTO employees (full_name, job_title, country, salary) VALUES (?, ?, ?, ?)',
    [employeeData.full_name, employeeData.job_title, employeeData.country, employeeData.salary]
  );

  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result[0].values[0][0] as number;

  return { id, ...employeeData };
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
