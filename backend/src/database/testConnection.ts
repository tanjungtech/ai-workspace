import { pool } from '../config/database.js';

export async function testDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()');

    console.log('PostgreSQL connected');
  } catch (error) {
    console.error(error);
  }
}