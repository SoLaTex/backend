import { IsNotEmpty } from "class-validator";

export class CreateParameterDto {
  @IsNotEmpty()
  userId: string;
}
