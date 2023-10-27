import { OmitType } from "@nestjs/mapped-types";
import { CreateFormulaDto } from './create-formula.dto';
import { UpdateSymbolDto } from "../symbols/dto/update-symbol.dto";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateFormulaDto extends OmitType(CreateFormulaDto, ['symbols']) {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsArray()
  @Type(() => UpdateSymbolDto)
  readonly symbols: UpdateSymbolDto[];
}
