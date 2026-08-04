-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parent_id_fkey";

-- DropIndex
DROP INDEX "File_name_key";

-- DropIndex
DROP INDEX "Folder_name_key";

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "parent_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
