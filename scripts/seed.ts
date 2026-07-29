import { getDb } from '../src/db/connection';

const sampleEmployees = [
  { full_name: 'Rahul Sharma', job_title: 'Software Engineer', country: 'India', salary: 60000 },
  { full_name: 'Amit Patel', job_title: 'Software Engineer', country: 'India', salary: 80000 },
  { full_name: 'John Miller', job_title: 'Manager', country: 'United States', salary: 120000 },
  { full_name: 'Sarah Connor', job_title: 'DevOps Engineer', country: 'United States', salary: 95000 },
  { full_name: 'Pierre Dupont', job_title: 'Designer', country: 'France', salary: 70000 },
];

async function seed(): Promise<void> {
  try {
    const db = await getDb();
    
    // Clear existing records
    db.run('DELETE FROM employees');
    
    console.log('Seeding database with sample employee records...');
    
    for (const emp of sampleEmployees) {
      db.run(
        'INSERT INTO employees (full_name, job_title, country, salary) VALUES (?, ?, ?, ?)',
        [emp.full_name, emp.job_title, emp.country, emp.salary]
      );
    }
    
    const countResult = db.exec('SELECT COUNT(*) as count FROM employees');
    const count = countResult[0].values[0][0];
    console.log(`Successfully seeded ${count} employee records!`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
