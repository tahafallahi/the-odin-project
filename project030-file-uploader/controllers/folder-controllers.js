import { prisma } from "../lib/prisma.js";
import {
  deleteFolderContentRecursive,
  getCurrentFolderIdRecursive,
  getFolderContentRecusrive,
} from "../utils/helpers.js";
import supabase from "../utils/supabase.js";

export async function getFolderContent(req, res) {
  if (req.user) {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    const dir = req.params.dir ? req.params.dir : [];
    const folderContent = await getFolderContentRecusrive(user, null, dir);

    res.render("folder-content", {
      user: req.user,
      selected: null,
      path: req.url,
      folderContent,
    });
  } else {
    res.redirect("/login");
  }
}

export async function createFolder(req, res) {
  const folderId = await getCurrentFolderIdRecursive(
    req.user.id,
    null,
    req.body.dir.split("/").slice(2),
  );

  const result = await prisma.folder.create({
    data: {
      name: req.body.name,
      owner_id: req.user.id,
      parent_id: folderId,
    },
  });

  res.redirect(req.body.dir);
}

export async function deleteFolder(req, res) {
  const folder = await prisma.folder.findFirst({
    where: { id: Number(req.body.folderId), owner_id: req.user.id },
  });

  if (!folder) {
    return res.status(404).send("Folder not found!");
  }

  await deleteFolderContentRecursive(req.user.id, folder.id);

  res.redirect(req.body.dir);
}

export async function updateFolder(req, res) {
  const folder = await prisma.folder.findFirst({
    where: { id: Number(req.body.folderId), owner_id: req.user.id },
  });

  if (!folder) {
    return res.status(404).send("Folder not found!");
  }

  await prisma.folder.update({
    where: { id: folder.id, owner_id: req.user.id },
    data: { name: req.body.name },
  });

  res.redirect(req.body.dir);
}
