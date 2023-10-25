import { SymbolType } from "../../../types";
import { Expose } from "class-transformer";
import {Prisma} from '@prisma/client';

export class SymbolEntity {
  @Expose()
  symbol: string;

  @Expose()
  type: SymbolType;

  @Expose()
  value: number;

  @Expose()
  description: string;

  @Expose()
  formulas: Prisma.FormulaCreateInput[];
}
