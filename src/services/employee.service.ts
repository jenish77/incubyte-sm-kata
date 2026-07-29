import * as employeeRepository from '../repositories/employee.repository';
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  SalaryBreakdown,
  SalaryMetricsByCountry,
  SalaryMetricsByJobTitle,
} from '../types';

import { getTdsRate } from '../enums/countries';

// TODO: Implement service methods via TDD

export async function createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
  return employeeRepository.create(employeeData);
}

export async function getEmployeeById(id: number): Promise<Employee | null> {
  return employeeRepository.findById(id);
}

export async function getAllEmployees(): Promise<Employee[]> {
  return employeeRepository.findAll();
}

export async function updateEmployee(id: number, employeeData: UpdateEmployeeDto): Promise<Employee | null> {
  return employeeRepository.update(id, employeeData);
}

export async function deleteEmployee(id: number): Promise<boolean> {
  return employeeRepository.remove(id);
}

export async function calculateSalary(employeeId: number): Promise<SalaryBreakdown | null> {
  const employee = await getEmployeeById(employeeId);
  if (!employee) {
    return null;
  }

  const tds_rate = getTdsRate(employee.country);
  const tds_deduction = employee.salary * tds_rate;
  const net_salary = employee.salary - tds_deduction;

  return {
    employee_id: employee.id,
    full_name: employee.full_name,
    country: employee.country,
    gross_salary: employee.salary,
    tds_rate,
    tds_deduction,
    net_salary,
  };
}

export async function getSalaryMetricsByCountry(country: string): Promise<SalaryMetricsByCountry | null> {
  return employeeRepository.getStatsByCountry(country);
}

export async function getAvgSalaryByJobTitle(jobTitle: string): Promise<SalaryMetricsByJobTitle | null> {
  return employeeRepository.getAvgSalaryByJobTitle(jobTitle);
}
