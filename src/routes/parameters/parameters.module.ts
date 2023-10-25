import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { FormulasModule } from './formulas/formulas.module';

@Module({
  controllers: [ParametersController],
  providers: [ParametersService, PrismaService],
  imports: [FormulasModule],
})
export class ParametersModule {}
