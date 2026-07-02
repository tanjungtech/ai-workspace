import type { Request, Response } from 'express';

import { getVersionInfo } from '../services/version.service.js';

export function getVersion(
  _req: Request,
  res: Response
) {
  const version = getVersionInfo();

  res.status(200).json(version);
}
