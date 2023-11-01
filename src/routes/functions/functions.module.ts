import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { FunctionsController } from './functions.controller';
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  providers: [FunctionsService, PrismaService],
  controllers: [FunctionsController]
})
export class FunctionsModule {}
