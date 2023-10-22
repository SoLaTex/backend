import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import * as process from "process";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);

    if (!token) {
      console.log({token});
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET,
        },
      );

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      const user = await this.prisma.user.findUnique(
        {
          where: { id: payload.id },
          include: {
            tokens: true,
          }
        },
      );

      // console.log({tokens: user.tokens});

      if (!user) {
        throw new UnauthorizedException();
      }

      request["user"] = { ...user, token };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private _extractTokenFromHeader (request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
