import type { Request, Response, NextFunction } from "express";

import { HttpError } from "../utils/http-error.js";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
}