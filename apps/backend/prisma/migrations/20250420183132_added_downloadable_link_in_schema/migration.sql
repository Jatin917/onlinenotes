-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "downloadableLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PYP" ALTER COLUMN "downloadableLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "downloadableLink" DROP NOT NULL;
