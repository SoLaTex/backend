import { Body, Controller, Get, NotFoundException, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get()
  async login() {
    throw new NotFoundException('Not implemented');
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  // async logout() {
  // }
  //
  // async refresh() {
  // }
  //
  // async forgotPassword() {
  // }
  //
  // async resetPassword() {
  // }
  //
  // async verifyEmail() {
  // }
  //
  // async resendVerificationEmail() {
  // }
}
