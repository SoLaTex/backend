import { Prisma } from "@prisma/client";
import { Expose, Type } from "class-transformer";
import { FormulaEntity } from "./formula.entity";

export class ParameterEntity {
  @Expose()
  @Type(() => FormulaEntity)
  formulas: Prisma.FormulaCreateInput[];
}
