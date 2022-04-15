/*
  Warnings:

  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `browser` to the `visits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device` to the `visits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `visits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_visitId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_websiteId_fkey";

-- AlterTable
ALTER TABLE "visits" ADD COLUMN     "browser" TEXT NOT NULL,
ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "os" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- DropTable
DROP TABLE "pages";
