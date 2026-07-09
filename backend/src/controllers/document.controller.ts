import type { Request, Response } from "express";

import * as documentService from "../services/document.service.js";

export async function upload(
  req: Request,
  res: Response
) {
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({
        message: "File required"
      });
  }

  const document =
    await documentService.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filePath: file.path,
    });

  return res.status(201).json(document);
}

export async function list(
  req: Request,
  res: Response
) {
  const documents = await documentService.list();

  return res.json(documents);
}
