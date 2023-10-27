import {
  IsArray, IsNotEmpty, IsString, MaxLength, ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateFormulaDto } from "../formulas/dto/create-formula.dto";

export class CreateParameterDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly outputUnit: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormulaDto)
  readonly formulas: CreateFormulaDto[];
}
