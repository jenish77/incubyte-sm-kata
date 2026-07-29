import { Database } from 'sql.js';

/**
 * Creates the employees table.
 */
export function up(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      job_title TEXT NOT NULL,
      country TEXT NOT NULL,
      salary REAL NOT NULL
    )
  `);
}
