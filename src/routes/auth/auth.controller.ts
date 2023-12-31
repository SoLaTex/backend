import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../../decorators/serialize.decorator";
import { UserEntity } from "./entities/user.entity";
import { LoginUserDto } from "./dtos/login-user.dto";
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
