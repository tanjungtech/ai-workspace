import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const DEMO_USER = {
  id: 1,
  email: 'admin@example.com',
  passwordHash: bcrypt.hashSync('Password123!', 10),
  name: 'Administrator',
};

export async function login(email: string, password: string) {
  if (email !== DEMO_USER.email) {
    throw new Error('Invalid credentials!');
  }

  const validPassword = await bcrypt.compare(
    password,
    DEMO_USER.passwordHash
  );

  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any,
    }
  );

  return {
    accessToken: token,
    user: {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
    },
  };
}