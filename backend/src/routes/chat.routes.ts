import { Router } from "express";

import * as chatController from "../controllers/chat.controller.js";

const router = Router();

router.post("/chat", chatController.chat);
router.post("/chat/stream", chatController.stream);

export default router;
