/*
  Warnings:

  - You are about to alter the column `text` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10000)`.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `displayName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "text" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "displayName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);
