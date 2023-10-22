import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../../decorators/serialize.decorator";
import { UserEntity } from "./entities/UserEntity";
import { LoginUserDto } from "./dtos/LoginUser.dto";

@Controller("auth")
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post("login")
  @Serialize(UserEntity)
  async login (@Body() body: LoginUserDto) {
    return body;
  }

  @Post("register")
  @Serialize(UserEntity)
  async register (@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }
}
