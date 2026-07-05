import type { Request, Response } from 'express';

import {
  createUserSchema,
  updateUserSchema
} from "../schemas/user.schema.js";

import * as userService from "../services/user.service.js";

export async function getUsers(
  req: Request,
  res: Response
) {
  const users = await userService.getUser();

  res.json(users);
}

export async function getUser(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const user = await userService.getUserById(id);

  res.json(user);
}

export async function createUser(
  req: Request,
  res: Response
) {
  const body = createUserSchema.parse(req.body);

  const user = await userService.createUser(body);

  res.status(201).json(user);
}

export async function updateUser(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const body = updateUserSchema.parse(req.body);

  const user = await userService.updateUser({
    id,
    ...body,
  });

  res.json(user);
}

export async function deleteUser(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  await userService.deleteUser(id);

  res.sendStatus(204);
}
