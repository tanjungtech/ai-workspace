import { Router } from "express";

import upload from "../documents/upload.js";
import * as controller from "../controllers/document.controller.js";

const router = Router();

router.post("/documents/upload", upload.single("file"), controller.upload);
router.get("/documents", controller.list);

export default router;