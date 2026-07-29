import request from 'supertest';
import app from '../../src/app';
import { resetDb } from '../../src/db/connection';
import { ApiResponse, Employee } from '../../src/types';

afterEach(() => {
  resetDb();
});

describe('Employee CRUD', () => {
  describe('POST /api/employees', () => {
    it('should create a new employee and return 201', async () => {
      const newEmployee = {
        full_name: 'John Doe',
        job_title: 'Software Engineer',
        country: 'India',
        salary: 50000,
      };

      const response = await request(app)
        .post('/api/employees')
        .send(newEmployee)
        .timeout(2000);

      const body: ApiResponse<Employee> = response.body;

      expect(response.status).toBe(201);
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('id');
      expect(body.data!.full_name).toBe('John Doe');
    });
  });
});
