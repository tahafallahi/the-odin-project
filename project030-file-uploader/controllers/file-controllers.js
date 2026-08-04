import multer from "multer";
import supabase from "../utils/supabase.js";
import { prisma } from "../lib/prisma.js";
import { getCurrentFolderIdRecursive } from "../utils/helpers.js";

const upload = multer();

export const uploadFile = [
  upload.single("file"),
  async function (req, res, next) {
    const { buffer, mimetype, originalname } = req.file;

    const userId = req.user.id;
    req.storageKey = req.user.id + req.body.dir + "/" + originalname;
    req.storageKey = decodeURI(req.storageKey);

    const { data, error } = await supabase.storage
      .from("files")
      .upload(req.storageKey, buffer, { contentType: mimetype });

    if (error) {
      res.send("Something went wrong, please try again."); // replace with rendered page
    } else {
      next();
    }
  },

  async function (req, res) {
    const { buffer, size, mimetype, originalname } = req.file;
    const folderId = await getCurrentFolderIdRecursive(
      req.user.id,
      null,
      req.body.dir.split("/").slice(2),
    );

    const result = await prisma.file.create({
      data: {
        name: originalname,
        owner_id: req.user.id,
        storageKey: req.storageKey,
        size,
        mimetype,
        folder_id: folderId,
      },
    });

    res.redirect(req.body.dir);
  },
];

export async function getFile(req, res) {
  const storageKey = decodeURI(req.user.id + req.url);

  const file = await prisma.file.findFirst({ where: { storageKey } });

  const signedUrl = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .createSignedUrl(storageKey, 3600);

  const downloadSignedUrl = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .createSignedUrl(storageKey, 3600, {
      download: file.name,
    });

  res.render("file", {
    user: req.user,
    selected: null,
    error1: signedUrl.error,
    error2: downloadSignedUrl.error,
    file,
    fileSignedUrl: !signedUrl.error ? signedUrl.data.signedUrl : null,
    downloadSignedUrl: !downloadSignedUrl.error
      ? downloadSignedUrl.data.signedUrl
      : null,
  });
}

export async function deleteFile(req, res) {
  const file = await prisma.file.findFirst({
    where: { id: Number(req.body.fileId), owner_id: req.user.id },
  });

  if (!file) {
    return res.status(404).send("File not found!");
  }

  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .remove([file.storageKey]);

  const result = await prisma.file.delete({
    where: { id: Number(req.body.fileId) },
  });

  res.redirect(req.body.dir);
}
