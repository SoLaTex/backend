import {
  BadRequestException, Injectable, UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { formatResultForResponseInterceptor } from "../../helpers/functions";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import config from "../../config";
import { LoginUserDto } from "./dtos/login-user.dto";
import dayjs from "dayjs";

@Injectable()
export class AuthService {
  constructor (private prisma: PrismaService, private jwtService: JwtService) {}

  // private _handlePrismaError (error: Prisma.PrismaClientKnownRequestError) {
  //   switch (error.code) {
  //     case "P2002": {
  //       const target = error.meta.target as string[];
  //       if (target.includes("email")) {
  //         const res = formatResultForResponseInterceptor(null, "User with this email already exists!");
  //         throw new BadRequestException(res);
  //       } else if (target.includes("username")) {
  //         const res = formatResultForResponseInterceptor(null, "User with this username already exists!");
  //         throw new BadRequestException(res);
  //       }
  //       break;
  //     }
  //     default: {
  //       const res = formatResultForResponseInterceptor(null, "Something went wrong!");
  //       throw new BadRequestException(res);
  //     }
  //   }
  // }

  private async _checkIfEmailExists (email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return !!user;
  }

  private async _checkIfUsernameExists (username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return !!user;
  }

  private async _createToken(userId: string) {
    const token = this.jwtService.sign({ id: userId });
    await this.prisma.token.create({ data: { token, userId, expiresAt: dayjs().add(30, 'days').toDate() } });
    return token;
  }

  async createUser (data: CreateUserDto) {
    const emailExists = await this._checkIfEmailExists(data.email);
    if (emailExists) {
      const res = formatResultForResponseInterceptor(null,
        "User with this email already exists!");
      throw new BadRequestException(res);
    }

    const usernameExists = await this._checkIfUsernameExists(data.username);
    if (usernameExists) {
      const res = formatResultForResponseInterceptor(null,
        "User with this username already exists!");
      throw new BadRequestException(res);
    }

    const password = data.password;
    const hash = await bcrypt.hash(password, config.bcryptSaltRounds);

    const res = await this.prisma.user.create(
      { data: { ...data, password: hash } },
    );

    const token = await this._createToken(res.id);

    return formatResultForResponseInterceptor({ token }, "User Created Successfully!")
  }

  async getUser (id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      const res = formatResultForResponseInterceptor(null, "User not found!");
      throw new BadRequestException(res);
    }

    return formatResultForResponseInterceptor(user, "User Details");
  }

  async signInUser ({ username, password }: LoginUserDto) {
    const ERR_MSG = "Invalid username or password!";

    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      const res = formatResultForResponseInterceptor(null, ERR_MSG);
      throw new UnauthorizedException(res);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      const res = formatResultForResponseInterceptor(null, ERR_MSG);
      throw new UnauthorizedException(res);
    }

    const token = await this._createToken(user.id);

    return formatResultForResponseInterceptor({ token }, "User Logged In Successfully!")
  }

  async updateUser (id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      const res = formatResultForResponseInterceptor(null, "User not found!");
      throw new BadRequestException(res);
    }

    const res = await this.prisma.user.update({ where: { id }, data });
    return formatResultForResponseInterceptor(res,
      "User Updated Successfully!");
  }

  async deleteUser (id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      const res = formatResultForResponseInterceptor(null, "User not found!");
      throw new BadRequestException(res);
    }

    const res = await this.prisma.user.delete({ where: { id } });
    return formatResultForResponseInterceptor(res,
      "User Deleted Successfully!");
  }
}
