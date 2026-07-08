import { Router } from "express";

import * as controller from "../controllers/conversation.controller.js";

const router = Router();

router.get("/conversations", controller.list);
router.post("/conversations", controller.create);
router.patch("/conversations/:id", controller.rename);
router.delete("/conversations/:id", controller.remove);

export default router;
