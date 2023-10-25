/*
  Warnings:

  - You are about to drop the `Variable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variable" DROP CONSTRAINT "Variable_formulaId_fkey";

-- DropTable
DROP TABLE "Variable";

-- CreateTable
CREATE TABLE "Symbol" (
    "id" TEXT NOT NULL,
    "formulaId" TEXT,
    "symbol" TEXT NOT NULL,
    "type" "SymbolType" NOT NULL DEFAULT 'VARIABLE',
    "value" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "Formula"("id") ON DELETE SET NULL ON UPDATE CASCADE;
