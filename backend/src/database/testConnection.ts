import { pool } from '../config/database.js';
import { logError, logInfo } from '../utils/logger.js';

export async function testDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()');

    logInfo('PostgreSQL connected');
  } catch (error) {
    logError('DB connection failed', error);
  }
}