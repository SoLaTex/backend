import { CreateSymbolDto } from './create-symbol.dto';
import { IsOptional, IsString } from "class-validator";

export class UpdateSymbolDto extends CreateSymbolDto {
  @IsOptional()
  @IsString()
  readonly id?: string;
}
