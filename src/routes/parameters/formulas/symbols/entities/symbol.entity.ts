import { Expose } from "class-transformer";
import { SymbolType } from "../../../../../types";

export class SymbolEntity {
  @Expose()
  readonly id: string;

  @Expose()
  readonly symbol: string;

  @Expose()
  readonly type: SymbolType;

  @Expose()
  readonly value?: number;

  @Expose()
  readonly description: string;

  @Expose()
  readonly createdAt: string;

  @Expose()
  readonly updatedAt: string;
}
