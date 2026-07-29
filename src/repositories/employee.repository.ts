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
  const db = await getDb();
  const result = db.exec('SELECT id, full_name, job_title, country, salary FROM employees WHERE id = ?', [id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0].values[0];
  return {
    id: row[0] as number,
    full_name: row[1] as string,
    job_title: row[2] as string,
    country: row[3] as string,
    salary: row[4] as number,
  };
}

export async function findAll(): Promise<Employee[]> {
  const db = await getDb();
  const result = db.exec('SELECT id, full_name, job_title, country, salary FROM employees');

  if (result.length === 0) {
    return [];
  }

  return result[0].values.map((row) => ({
    id: row[0] as number,
    full_name: row[1] as string,
    job_title: row[2] as string,
    country: row[3] as string,
    salary: row[4] as number,
  }));
}

export async function update(id: number, employeeData: UpdateEmployeeDto): Promise<Employee | null> {
  const existing = await findById(id);
  if (!existing) {
    return null;
  }

  const updated = {
    full_name: employeeData.full_name !== undefined ? employeeData.full_name : existing.full_name,
    job_title: employeeData.job_title !== undefined ? employeeData.job_title : existing.job_title,
    country: employeeData.country !== undefined ? employeeData.country : existing.country,
    salary: employeeData.salary !== undefined ? employeeData.salary : existing.salary,
  };

  const db = await getDb();
  db.run(
    'UPDATE employees SET full_name = ?, job_title = ?, country = ?, salary = ? WHERE id = ?',
    [updated.full_name, updated.job_title, updated.country, updated.salary, id]
  );

  return { id, ...updated };
}

export async function remove(id: number): Promise<boolean> {
  const existing = await findById(id);
  if (!existing) {
    return false;
  }

  const db = await getDb();
  db.run('DELETE FROM employees WHERE id = ?', [id]);
  return true;
}

export async function getStatsByCountry(country: string): Promise<SalaryMetricsByCountry | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function getAvgSalaryByJobTitle(jobTitle: string): Promise<SalaryMetricsByJobTitle | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}
