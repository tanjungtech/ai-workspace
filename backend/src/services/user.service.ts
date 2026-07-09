import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import { HttpError } from "../utils/http-error.js";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserInput = {
  id: number;
  name: string;
  email: string;
};

export async function getUser() {
  return userRepository.findAll();
}

export async function getUserById(id: number) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new HttpError(
      404,
      "User not found"
    )
  }

  return user;
}

export async function createUser({
  name,
  email,
  password,
}: CreateUserInput) {
  // Business Rule #1
  // Email must be unique
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new HttpError(
      404,
      "Email already exists"
    )
  }

  // Business Rule #2
  // Never store plain passwords
  const passwordHash = await bcrypt.hash(password, 10);

  // Repository is responsible for SQL
  return userRepository.create(
    name,
    email,
    passwordHash
  );
}

export async function updateUser({
  id,
  name,
  email,
}: UpdateUserInput) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new HttpError(
      404,
      "User not found"
    )
  }

  const existingUser = await userRepository.findByEmail(email);

  if (
    existingUser &&
    existingUser.id !== id
  ) {
    throw new HttpError(
      404,
      "Email already exists"
    )
  }

  return userRepository.update(
    id,
    name,
    email
  );
}

export async function deleteUser(id: number) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new HttpError(
      404,
      "User not found"
    )
  }

  await userRepository.remove(id);
}
