import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";

export class FormulaEntity {
  @Expose()
  name: string;

  @Expose()
  formula: string;

  @Expose()
  isFinalFormula: boolean;

  @Expose()
  parameterId: string;

  @Expose()
  symbols: Prisma.SymbolCreateInput[];
}
