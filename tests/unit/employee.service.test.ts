import { getTdsRate } from '../../src/enums/countries';
import * as employeeService from '../../src/services/employee.service';
import * as employeeRepository from '../../src/repositories/employee.repository';

// Mock the repository to isolate service layer testing
jest.mock('../../src/repositories/employee.repository');

describe('Employee Service Unit Tests', () => {
  describe('getTdsRate', () => {
    it('should return 10% TDS for India', () => {
      expect(getTdsRate('India')).toBe(0.10);
      expect(getTdsRate('INDIA')).toBe(0.10);
    });

    it('should return 12% TDS for United States', () => {
      expect(getTdsRate('United States')).toBe(0.12);
      expect(getTdsRate('united states')).toBe(0.12);
    });

    it('should return 0% TDS for any other country', () => {
      expect(getTdsRate('Germany')).toBe(0);
      expect(getTdsRate('Canada')).toBe(0);
    });
  });

  describe('calculateSalary', () => {
    it('should return null if employee does not exist', async () => {
      jest.spyOn(employeeRepository, 'findById').mockResolvedValue(null);

      const result = await employeeService.calculateSalary(999);
      expect(result).toBeNull();
    });

    it('should correctly calculate salary breakdown for India employee', async () => {
      const mockEmployee = {
        id: 1,
        full_name: 'Rahul Sharma',
        job_title: 'Software Developer',
        country: 'India',
        salary: 50000,
      };

      jest.spyOn(employeeRepository, 'findById').mockResolvedValue(mockEmployee);

      const result = await employeeService.calculateSalary(1);

      expect(result).not.toBeNull();
      expect(result!.gross_salary).toBe(50000);
      expect(result!.net_salary).toBe(45000);
    });
  });
});
