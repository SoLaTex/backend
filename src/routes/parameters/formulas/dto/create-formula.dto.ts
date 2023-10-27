import {
  IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateSymbolDto } from "../symbols/dto/create-symbol.dto";

export class CreateFormulaDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly formula: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isFinalFormula: boolean;

  @IsNotEmpty()
  @IsString()
  readonly parameterId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSymbolDto)
  readonly symbols: CreateSymbolDto[];
}
