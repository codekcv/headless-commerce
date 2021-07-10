/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshToken` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "refreshToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin.refreshToken_unique" ON "Admin"("refreshToken");
