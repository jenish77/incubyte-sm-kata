import * as employeeRepository from '../repositories/employee.repository';
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  SalaryBreakdown,
  SalaryMetricsByCountry,
  SalaryMetricsByJobTitle,
} from '../types';

// TODO: Implement service methods via TDD

export async function createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
  return employeeRepository.create(employeeData);
}

export async function getEmployeeById(id: number): Promise<Employee | null> {
  return employeeRepository.findById(id);
}

export async function getAllEmployees(): Promise<Employee[]> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function updateEmployee(id: number, employeeData: UpdateEmployeeDto): Promise<Employee | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function deleteEmployee(id: number): Promise<boolean> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function calculateSalary(employeeId: number): Promise<SalaryBreakdown | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function getSalaryMetricsByCountry(country: string): Promise<SalaryMetricsByCountry | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}

export async function getAvgSalaryByJobTitle(jobTitle: string): Promise<SalaryMetricsByJobTitle | null> {
  // TODO: Implement
  throw new Error('Not implemented');
}
