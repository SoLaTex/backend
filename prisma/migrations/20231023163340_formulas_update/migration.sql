/*
  Warnings:

  - Added the required column `description` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variable" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION;
