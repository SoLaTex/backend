import {
   IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString,
} from "class-validator";
import { SymbolType } from "../../../../../types";

export class CreateSymbolDto {
  @IsNotEmpty()
  @IsString()
  readonly symbol: string;

  @IsNotEmpty()
  @IsEnum(SymbolType)
  readonly type: SymbolType;

  @IsOptional()
  @IsNumber()
  readonly value?: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly formulaId: string;
}
