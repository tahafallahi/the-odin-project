/*
  Warnings:

  - A unique constraint covering the columns `[folder_id,name]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parent_id,name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_folder_id_name_key" ON "File"("folder_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_parent_id_name_key" ON "Folder"("parent_id", "name");
