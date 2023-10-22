import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { formatResultForResponseInterceptor } from "../../helpers/functions";
import { UpdateUserDto } from "./dtos/UpdateUser.dto";

@Injectable()
export class AuthService {
  constructor (private prisma: PrismaService) {}

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

    const res = await this.prisma.user.create({ data });

    return formatResultForResponseInterceptor(res, "User was created successfully!");
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) {
      const res = formatResultForResponseInterceptor(null, "User not found!");
      throw new BadRequestException(res);
    }

    return formatResultForResponseInterceptor(user, "User Details");
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) {
      const res = formatResultForResponseInterceptor(null, "User not found!");
      throw new BadRequestException(res);
    }

    const res = await this.prisma.user.update({ where: { id }, data });
    return formatResultForResponseInterceptor(res, "User Updated Successfully!");
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) {
      const res = formatResultForResponseInterceptor(null, "User not found!");
      throw new BadRequestException(res);
    }

    const res = await this.prisma.user.delete({ where: { id } });
    return formatResultForResponseInterceptor(res, "User Deleted Successfully!");
  }
}
