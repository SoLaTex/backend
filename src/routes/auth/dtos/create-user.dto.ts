import {
  IsAlpha, IsEmail, IsNotEmpty, IsString, MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(1)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

}
