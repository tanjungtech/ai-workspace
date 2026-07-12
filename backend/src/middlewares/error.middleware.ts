import type { Request, Response, NextFunction } from "express";

import { HttpError } from "../utils/http-error.js";
import { logError } from "../utils/logger.js";

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

  logError("Internal Server Error" ,err);

  res.status(500).json({
    message: "Internal Server Error",
  });
}