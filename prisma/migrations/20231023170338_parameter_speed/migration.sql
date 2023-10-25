/*
  Warnings:

  - You are about to drop the column `symbol` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Parameter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "symbol",
DROP COLUMN "value",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "outputUnit" TEXT;
