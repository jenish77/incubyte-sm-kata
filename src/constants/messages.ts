const MESSAGES = {
  EMPLOYEE_CREATED: 'Employee created successfully',
  EMPLOYEE_FETCHED: 'Employee fetched successfully',
  EMPLOYEES_FETCHED: 'Employees fetched successfully',
  EMPLOYEE_UPDATED: 'Employee updated successfully',
  EMPLOYEE_DELETED: 'Employee deleted successfully',
  EMPLOYEE_NOT_FOUND: 'Employee not found',
  VALIDATION_ERROR: 'Validation error: missing required fields',
  INTERNAL_ERROR: 'Internal server error',
  SALARY_CALCULATED: 'Salary calculated successfully',
  METRICS_FETCHED: 'Salary metrics fetched successfully',
} as const;

export type MessageKey = keyof typeof MESSAGES;

export default MESSAGES;
