import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { formatResultForResponseInterceptor } from "../../helpers/functions";

@Injectable()
export class AuthService {
  constructor (private prisma: PrismaService) {}

  async createUser (data: CreateUserDto) {
    const res = formatResultForResponseInterceptor(data, 'User was created successfully!');
    return new Promise(resolve => setTimeout(() => resolve(res), 1000));
  }
}
