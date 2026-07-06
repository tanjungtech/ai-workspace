import type { Request, Response } from 'express';

import * as chatService from "../services/chat.service.js";

import { chatSchema } from '../schemas/chat.schema.js';

export async function chat(
  req: Request,
  res: Response
) {
  try {
    const {
      conversationId,
      prompt
    } = req.body;

    const result =
      await chatService.chat({
        conversationId,
        prompt
      });

    return res.status(200).json({
      success: true,
      conversation: result.conversation,
      message: result.assistantMessage
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
