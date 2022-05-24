/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionId` on the `visits` table. All the data in the column will be lost.
  - Added the required column `browser` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitorId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitorId` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_sessionId_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
ADD COLUMN     "browser" TEXT NOT NULL,
ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "os" TEXT NOT NULL,
ADD COLUMN     "visitorId" UUID NOT NULL,
ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "visits" DROP COLUMN "sessionId",
ADD COLUMN     "visitorId" UUID NOT NULL;
