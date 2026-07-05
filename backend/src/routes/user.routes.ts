import { Router } from 'express';

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.get("/api/users", getUsers);

router.get("/api/user/:id", getUser);

router.post("/api/user", createUser);

router.put("/api/user/:id", updateUser);

router.delete("/api/user/:id", deleteUser);

export default router;