import { prisma } from "../lib/prisma.js";
import supabase from "../utils/supabase.js";

export async function getCurrentFolderIdRecursive(userId, parentId, dir) {
  if (dir.length <= 0) return null;
  const currentDir = decodeURI(dir.shift());
  const folder = await prisma.folder.findFirst({
    where: {
      owner_id: userId,
      parent_id: parentId,
      name: currentDir,
    },
  });

  if (dir.length <= 0) return folder.id;
  return getCurrentFolderIdRecursive(userId, folder.id, dir);
}

export async function getFolderContentRecusrive(user, parentId, dir) {
  if (dir.length <= 0) {
    const folders = await prisma.folder.findMany({
      where: { owner: user, parent_id: parentId },
      orderBy: { name: "asc" },
    });
    const files = await prisma.file.findMany({
      where: { owner: user, folder_id: parentId },
      orderBy: { name: "asc" },
    });

    folders.forEach((f) => (f.type = "folder"));
    files.forEach((f) => (f.type = "file"));
    return [...folders, ...files];
  }

  const currentDir = dir.shift();
  let folder;
  if (!parentId) {
    folder = await prisma.folder.findFirst({
      where: {
        owner: user,
        parent_id: parentId,
        name: currentDir,
      },
    });
  } else {
    folder = await prisma.folder.findUnique({
      where: {
        owner: user,
        parent_id_name: { parent_id: parentId, name: currentDir },
      },
    });
  }
  const newParentId = folder.id;
  return getFolderContentRecusrive(user, newParentId, dir);
}

export async function deleteFolderContentRecursive(userId, folderId) {
  const files = await prisma.file.findMany({
    where: { folder_id: folderId, owner_id: userId },
  });
  const folders = await prisma.folder.findMany({
    where: { parent_id: folderId, owner_id: userId },
  });

  if (folders.length > 0) {
    for (const folder of folders) {
      await deleteFolderContentRecursive(userId, folder.id);
    }
  }

  for (const file of files) {
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .remove([file.storageKey]);
  }

  await prisma.file.deleteMany({
    where: { folder_id: folderId, owner_id: userId },
  });
  await prisma.folder.delete({
    where: { id: folderId, owner_id: userId },
  });
}
