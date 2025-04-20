/*
  Warnings:

  - Added the required column `downloadableLink` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloadableLink` to the `PYP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloadableLink` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "downloadableLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PYP" ADD COLUMN     "downloadableLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "downloadableLink" TEXT NOT NULL;
