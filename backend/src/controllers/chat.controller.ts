import type { Request, Response } from 'express';

import * as chatService from "../services/chat.service.js";

import { chatSchema } from '../schemas/chat.schema.js';

export async function chat(
  req: Request,
  res: Response
) {
  const { prompt } = chatSchema.parse(req.body);

  const response =
    await chatService.chat(prompt);

  res.json({
    message: response,
  });
}
