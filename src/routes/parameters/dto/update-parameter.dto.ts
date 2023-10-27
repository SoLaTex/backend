import { OmitType } from "@nestjs/mapped-types";
import { CreateParameterDto } from './create-parameter.dto';
import { IsArray } from "class-validator";
import { UpdateFormulaDto } from "../formulas/dto/update-formula.dto";
import { Type } from "class-transformer";

export class UpdateParameterDto extends OmitType(CreateParameterDto, ['formulas']) {
  @IsArray()
  @Type(() => UpdateFormulaDto)
  readonly formulas: UpdateFormulaDto[];
}
