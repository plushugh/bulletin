/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Bulletin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Bulletin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bulletin" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bulletin_code_key" ON "Bulletin"("code");
