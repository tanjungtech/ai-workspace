import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

// const DEMO_USER = {
//   id: 1,
//   email: 'admin@example.com',
//   passwordHash: bcrypt.hashSync('Password123!', 10),
//   name: 'Administrator',
// };

export async function login(email: string, password: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  console.log('result', result.rows[0]);

  if (email !== result.rows[0].email) {
    throw new Error('Invalid credentials!');
  }

  const validPassword = await bcrypt.compare(
    password,
    result.rows[0].password_hash
  );

  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: result.rows[0].id,
      email: result.rows[0].email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any,
    }
  );

  return {
    accessToken: token,
    user: {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
    },
  };
}