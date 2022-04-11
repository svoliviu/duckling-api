/*
  Warnings:

  - Added the required column `userId` to the `websites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "websites" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "websites" ADD CONSTRAINT "websites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
