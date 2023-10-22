import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from "../../prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import config from "../../config";
import * as process from "process";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
  ],
})
export class AuthModule {}
