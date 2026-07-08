import type { Request, Response } from 'express';

import * as service from "../services/conversation.service.js";

export async function list(
  req: Request,
  res: Response
) {
  const page = Number(req.query.page ?? 1);

  const limit = Number(req.query.limit ?? 20);

  res.json(
    await service.list(page, limit)
  );
}

export async function create(
  req: Request,
  res: Response
) {
  res.json( await service.create() );
}

export async function rename(
  req: Request,
  res: Response
) {
  const paramsId = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id || '');

  res.json(
    await service.rename(String(paramsId), req.body.title)
  );
}

export async function remove(
  req: Request,
  res: Response
) {
  const paramsId = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id || '');
  res.json(
    await service.remove(String(paramsId))
  );
}
