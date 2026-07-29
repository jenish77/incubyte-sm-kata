# Incubyte Salary Management API

A robust, production-ready Node.js API built using Express, TypeScript, and SQLite (`sql.js`). The application provides comprehensive employee salary management, tax deductions calculation, and salary metrics reporting.

---

## 🏗️ Architecture

The project is structured following clean, layered design principles to achieve strict separation of concerns, high testability, and modularity.

```
Request ──> Routes ──> Controllers ──> Services ──> Repositories ──> Database (SQLite)
```

- **Routes**: Directs HTTP requests to the appropriate controllers.
- **Controllers**: Handles request validation, HTTP status codes, and formats API responses.
- **Services**: Contains the core business logic (e.g., TDS tax deductions, salary metrics aggregation).
- **Repositories**: Houses all database-related data access operations and SQL queries.
- **Database**: Connection singleton management and schema migration runner.
- **Middlewares**: Global exception handler, request logging.
- **Enums/Constants/Types**: Centralized configuration, error messages, and TypeScript definitions.

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)

### ⚙️ Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repo-url>
   cd incubator-sm-kata
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file from the template:
   ```bash
   cp .env.example .env
   ```

---

## 🏃 Running the Application

### Development Mode

Start the server using `ts-node` for real-time TypeScript execution:
```bash
npm start
```

### Production Build

Compile the TypeScript code to JavaScript and run the optimized build:
```bash
npm run build
npm start
```

---

## 🛢️ Database Seeding

Populate your local SQLite database with mock employee records for testing or local development:
```bash
npm run seed
```

---

## 🧪 Running Tests

This codebase was developed following a strict **Test-Driven Development (TDD)** approach.

Run the entire test suite (both unit and integration tests):
```bash
npm test
```

### Unit Tests
Test business logic, TDS calculations, and country rules in isolation:
```bash
npm run test:unit
```

### Integration Tests
Verify endpoints end-to-end against a mock database:
```bash
npm run test:integration
```

---

## 🔌 API Endpoints

### Employee CRUD

#### Create Employee
- **URL**: `POST /api/employees`
- **Body**:
  ```json
  {
    "full_name": "John Doe",
    "job_title": "Software Engineer",
    "country": "India",
    "salary": 50000
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Employee created successfully",
    "data": {
      "id": 1,
      "full_name": "John Doe",
      "job_title": "Software Engineer",
      "country": "India",
      "salary": 50000
    }
  }
  ```

#### Get All Employees
- **URL**: `GET /api/employees`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Employees fetched successfully",
    "data": [ ... ]
  }
  ```

#### Get Employee by ID
- **URL**: `GET /api/employees/:id`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Employee fetched successfully",
    "data": { ... }
  }
  ```

#### Update Employee
- **URL**: `PUT /api/employees/:id`
- **Body** (all fields optional):
  ```json
  {
    "salary": 55000
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Employee updated successfully",
    "data": { ... }
  }
  ```

#### Delete Employee
- **URL**: `DELETE /api/employees/:id`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Employee deleted successfully",
    "data": null
  }
  ```

---

### Salary Calculation

Calculates TDS deductions and net salary based on the country rules:
- **India**: 10% TDS deduction
- **United States**: 12% TDS deduction
- **All other countries**: 0% TDS (net = gross)

#### Calculate Net Salary
- **URL**: `GET /api/employees/:id/salary`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Salary calculated successfully",
    "data": {
      "employee_id": 1,
      "full_name": "John Doe",
      "country": "India",
      "gross_salary": 50000,
      "tds_rate": 0.10,
      "tds_deduction": 5000,
      "net_salary": 45000
    }
  }
  ```

---

### Salary Metrics

#### Get Metrics by Country
Retrieve minimum, maximum, and average salary for a specific country.
- **URL**: `GET /api/salary-metrics/country/:country`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Salary metrics fetched successfully",
    "data": {
      "country": "India",
      "min_salary": 30000,
      "max_salary": 70000,
      "avg_salary": 50000
    }
  }
  ```

#### Get Average Salary by Job Title
Retrieve average salary for all employees with the given job title.
- **URL**: `GET /api/salary-metrics/job-title/:jobTitle`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Salary metrics fetched successfully",
    "data": {
      "job_title": "Software Engineer",
      "avg_salary": 70000
    }
  }
  ```

---

## 🧠 Implementation Details (AI Usage)

This codebase was developed collaboratively between a senior engineer and an AI pairing assistant. Transparency of tools, rationale, and methods used are documented below:

### Rationale & Design
1. **TypeScript Refactoring**: Migrated the existing prototype javascript workspace to typescript strictly utilizing `@swc/jest` to guarantee speed and full type-safety.
2. **Layered Architecture**: Transitioned the database schema from being embedded in `db.js` into standalone migrations and a clean Repository pattern, which keeps all raw SQL completely isolated from controllers and services.
3. **Standardized Responses**: Employed a unified `ApiResponse<T>` envelope for all endpoints to guarantee client-side ease of integration.

### Test-Driven Development (TDD) Loop
The project was constructed in incremental git commits, strictly adhering to TDD cycles:
- **Red Phase**: Written a failing integration/unit test asserting endpoint expectations before changing code.
- **Green Phase**: Written the minimal service, repository, and controller logic to resolve the test cleanly.
- **Refactor Phase**: Cleaned up duplicated types, refined SQL queries, and unified response payloads.
