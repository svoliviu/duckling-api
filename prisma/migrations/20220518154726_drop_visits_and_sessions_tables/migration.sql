/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_websiteId_fkey";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "visits";
