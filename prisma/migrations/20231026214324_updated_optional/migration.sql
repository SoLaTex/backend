/*
  Warnings:

  - Made the column `name` on table `Parameter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Parameter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `outputUnit` on table `Parameter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parameter" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "outputUnit" SET NOT NULL;
