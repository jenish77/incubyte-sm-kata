import initSqlJs, { Database } from 'sql.js';
import { up } from './migrations/001_create_employees';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    const SQL = await initSqlJs();
    db = new SQL.Database();
    // Run migrations
    up(db);
  }
  return db;
}

export function resetDb(): void {
  db = null;
}
