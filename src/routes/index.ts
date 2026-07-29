import { Router } from 'express';
import employeeRoutes from './employee.routes';
import * as employeeController from '../controllers/employee.controller';

const router: Router = Router();

// Mount employee routes
router.use('/employees', employeeRoutes);

// Salary metrics routes (separate from employee resource)
router.get('/salary-metrics/country/:country', employeeController.getSalaryMetricsByCountry);
router.get('/salary-metrics/job-title/:jobTitle', employeeController.getAvgSalaryByJobTitle);

export default router;
