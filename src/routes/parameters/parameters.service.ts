import { Injectable } from "@nestjs/common";
import { CreateParameterDto } from "./dto/create-parameter.dto";
import { UpdateParameterDto } from "./dto/update-parameter.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { formatResultForResponseInterceptor } from "../../helpers/functions";

@Injectable()
export class ParametersService {
  constructor (private prisma: PrismaService) {}

  async create (createParameterDto: CreateParameterDto) {
    const userId = createParameterDto.userId;

    const res = await this.prisma.parameter.create({ data: { userId } });

    return formatResultForResponseInterceptor(
      res,
      "New parameter created successfully!"
    );
  }

  async update (id: string, updateParameterDto: UpdateParameterDto) {
    return formatResultForResponseInterceptor(
      `This action updates a #${id} parameter`,
      "This action adds a new parameter");
  }

  findAll () {
    return formatResultForResponseInterceptor(
      `This action returns all parameters`, "This action adds a new parameter");
  }

  findOne (id: string) {
    return formatResultForResponseInterceptor(
      `This action returns a #${id} parameter`,
      "This action adds a new parameter");
  }

  remove (id: string) {
    return formatResultForResponseInterceptor(
      `This action removes a #${id} parameter`,
      "This action adds a new parameter");
  }
}
