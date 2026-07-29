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

  describe('GET /api/employees/:id', () => {
    it('should retrieve an employee by id', async () => {
      // First, create an employee
      const createRes = await request(app)
        .post('/api/employees')
        .send({
          full_name: 'Jane Smith',
          job_title: 'Designer',
          country: 'United States',
          salary: 60000,
        });

      const employeeId: number = createRes.body.data.id;

      // Now, fetch by id
      const response = await request(app)
        .get(`/api/employees/${employeeId}`)
        .timeout(2000);

      const body: ApiResponse<Employee> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data!.id).toBe(employeeId);
      expect(body.data!.full_name).toBe('Jane Smith');
      expect(body.data!.country).toBe('United States');
    });

    it('should return 404 for non-existent employee', async () => {
      const response = await request(app)
        .get('/api/employees/999')
        .timeout(2000);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/employees', () => {
    it('should return all employees', async () => {
      await request(app).post('/api/employees').send({
        full_name: 'Alice Johnson',
        job_title: 'Engineer',
        country: 'India',
        salary: 55000,
      });

      await request(app).post('/api/employees').send({
        full_name: 'Bob Williams',
        job_title: 'Manager',
        country: 'United States',
        salary: 75000,
      });

      const response = await request(app)
        .get('/api/employees')
        .timeout(2000);

      const body: ApiResponse<Employee[]> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(2);
      expect(body.data![0].full_name).toBe('Alice Johnson');
      expect(body.data![1].full_name).toBe('Bob Williams');
    });

    it('should return empty array when no employees exist', async () => {
      const response = await request(app)
        .get('/api/employees')
        .timeout(2000);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('PUT /api/employees/:id', () => {
    it('should update an existing employee', async () => {
      const createRes = await request(app).post('/api/employees').send({
        full_name: 'Alice Johnson',
        job_title: 'Engineer',
        country: 'India',
        salary: 55000,
      });

      const employeeId: number = createRes.body.data.id;

      const response = await request(app)
        .put(`/api/employees/${employeeId}`)
        .send({ salary: 65000, job_title: 'Senior Engineer' })
        .timeout(2000);

      const body: ApiResponse<Employee> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data!.salary).toBe(65000);
      expect(body.data!.job_title).toBe('Senior Engineer');
      expect(body.data!.full_name).toBe('Alice Johnson');
    });

    it('should return 404 when updating non-existent employee', async () => {
      const response = await request(app)
        .put('/api/employees/999')
        .send({ salary: 70000 })
        .timeout(2000);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/employees/:id', () => {
    it('should delete an existing employee', async () => {
      const createRes = await request(app).post('/api/employees').send({
        full_name: 'Bob Ross',
        job_title: 'Painter',
        country: 'United States',
        salary: 45000,
      });

      const employeeId: number = createRes.body.data.id;

      const response = await request(app)
        .delete(`/api/employees/${employeeId}`)
        .timeout(2000);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify it's gone
      const getRes = await request(app)
        .get(`/api/employees/${employeeId}`)
        .timeout(2000);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 when deleting non-existent employee', async () => {
      const response = await request(app)
        .delete('/api/employees/999')
        .timeout(2000);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/employees/:id/salary', () => {
    it('should calculate salary for India employee (10% TDS)', async () => {
      const createRes = await request(app).post('/api/employees').send({
        full_name: 'Rahul Sharma',
        job_title: 'Software Developer',
        country: 'India',
        salary: 50000,
      });

      const employeeId: number = createRes.body.data.id;

      const response = await request(app)
        .get(`/api/employees/${employeeId}/salary`)
        .timeout(2000);

      const body: ApiResponse<SalaryBreakdown> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data!.employee_id).toBe(employeeId);
      expect(body.data!.gross_salary).toBe(50000);
      expect(body.data!.tds_rate).toBe(0.10);
      expect(body.data!.tds_deduction).toBe(5000);
      expect(body.data!.net_salary).toBe(45000);
    });

    it('should calculate salary for US employee (12% TDS)', async () => {
      const createRes = await request(app).post('/api/employees').send({
        full_name: 'John Miller',
        job_title: 'Manager',
        country: 'United States',
        salary: 100000,
      });

      const employeeId: number = createRes.body.data.id;

      const response = await request(app)
        .get(`/api/employees/${employeeId}/salary`)
        .timeout(2000);

      const body: ApiResponse<SalaryBreakdown> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data!.employee_id).toBe(employeeId);
      expect(body.data!.gross_salary).toBe(100000);
      expect(body.data!.tds_rate).toBe(0.12);
      expect(body.data!.tds_deduction).toBe(12000);
      expect(body.data!.net_salary).toBe(88000);
    });

    it('should calculate salary for other country employee (0% TDS)', async () => {
      const createRes = await request(app).post('/api/employees').send({
        full_name: 'Pierre Dupont',
        job_title: 'Chef',
        country: 'France',
        salary: 60000,
      });

      const employeeId: number = createRes.body.data.id;

      const response = await request(app)
        .get(`/api/employees/${employeeId}/salary`)
        .timeout(2000);

      const body: ApiResponse<SalaryBreakdown> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data!.employee_id).toBe(employeeId);
      expect(body.data!.gross_salary).toBe(60000);
      expect(body.data!.tds_rate).toBe(0);
      expect(body.data!.tds_deduction).toBe(0);
      expect(body.data!.net_salary).toBe(60000);
    });

    it('should return 404 for salary calculation of non-existent employee', async () => {
      const response = await request(app)
        .get('/api/employees/999/salary')
        .timeout(2000);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
