import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterDto } from './create-parameter.dto';
import { IsOptional } from "class-validator";

export class UpdateParameterDto extends PartialType(CreateParameterDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  outputUnit: string;

  // formulas:
}
