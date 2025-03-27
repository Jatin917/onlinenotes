/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "PYP" DROP CONSTRAINT "PYP_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_uploadedById_fkey";

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PYP" ADD CONSTRAINT "PYP_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
