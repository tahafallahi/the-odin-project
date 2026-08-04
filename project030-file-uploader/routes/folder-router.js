import { Router } from "express";
import { getFile } from "../controllers/file-controllers.js";
import {
  createFolder,
  deleteFolder,
  getFolderContent,
  updateFolder,
} from "../controllers/folder-controllers.js";

const router = Router();

router.get("/root{*dir}.{*ext}", getFile);
router.get("/root{/}{*dir}{/}", getFolderContent);
router.post("/folder/create", createFolder);
router.post("/folder/delete", deleteFolder);
router.post("/folder/update", updateFolder);

export default router;
