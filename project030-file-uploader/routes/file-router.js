import { Router } from "express";
import { deleteFile, uploadFile } from "../controllers/file-controllers.js";

const router = Router();

router.post("/upload", uploadFile);
router.post("/delete", deleteFile);

export default router;
