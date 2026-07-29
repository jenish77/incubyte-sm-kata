import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';

const router: Router = Router();

// Employee CRUD
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

// Salary calculation
router.get('/:id/salary', employeeController.calculateSalary);

export default router;
