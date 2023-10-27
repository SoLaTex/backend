import { Expose, Type } from "class-transformer";
import { FormulaEntity } from "../formulas/entities/formula.entity";

// const formulasWithSymbols: Prisma.FormulaInclude = {
//   symbols: true,
// }

export class ParameterEntity {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly outputUnit: string;

  @Expose()
  @Type(() => FormulaEntity)
  readonly formulas: FormulaEntity[];

  @Expose()
  readonly createdAt: string;

  @Expose()
  readonly updatedAt: string;
}
