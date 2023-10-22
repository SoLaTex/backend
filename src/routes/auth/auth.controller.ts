import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../../decorators/serialize.decorator";
import { UserEntity } from "./entities/UserEntity";
import { LoginUserDto } from "./dtos/LoginUser.dto";
import { AuthGuard } from "../../guards/auth.guard";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { formatResultForResponseInterceptor } from "../../helpers/functions";

@Controller("auth")
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post("/login")
  async login (@Body() body: LoginUserDto) {
    return this.authService.signInUser(body);
  }

  @Post("/register")
  @Serialize(UserEntity)
  async register (@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  @Serialize(UserEntity)
  async me(@CurrentUser() user: UserEntity) {
    return formatResultForResponseInterceptor(user, "User Details");
  }
}
