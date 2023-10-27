import { Prisma } from "@prisma/client";import { Expose, Type } from "class-transformer";
import { SymbolEntity } from "../symbols/entities/symbol.entity";

export class FormulaEntity {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly formula: string;

  @Expose()
  readonly isFinalFormula: boolean;

  // @Expose()
  // readonly parameterId: string;

  @Expose()
  @Type(() => SymbolEntity)
  readonly symbols: SymbolEntity[];

  @Expose()
  readonly createdAt: string;

  @Expose()
  readonly updatedAt: string;
}
