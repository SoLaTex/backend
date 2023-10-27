-- CreateEnum
CREATE TYPE "SymbolType" AS ENUM ('VARIABLE', 'CONSTANT', 'FORMULA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "outputUnit" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formula" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "isFinalFormula" BOOLEAN NOT NULL DEFAULT false,
    "parameterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "Formula"("id") ON DELETE SET NULL ON UPDATE CASCADE;
