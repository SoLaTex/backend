import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from "@nestjs/common";
import { ParametersService } from './parameters.service';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { AuthGuard } from "../../guards/auth.guard";
import { Serialize } from "../../decorators/serialize.decorator";
import { ParameterEntity } from "./entities/parameter.entity";
import { CurrentUser } from "../../decorators/currentUser.decorator";

@UseGuards(AuthGuard)
@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Post()
  @Serialize(ParameterEntity)
  create(@Body() createParameterDto: CreateParameterDto, @CurrentUser('id') userID: string) {
    return this.parametersService.create(createParameterDto, userID);
  }

  @Patch(':id')
  @Serialize(ParameterEntity)
  update(@Param('id') id: string, @Body() updateParameterDto: UpdateParameterDto) {
    const handler = async () =>  this.parametersService.update(id, updateParameterDto);
    return this.parametersService.handleIfIdExists(id, handler);
  }

  @Delete(':id')
  @Serialize(ParameterEntity)
  remove(@Param('id') id: string) {
    // return this.parametersService.remove(id);
    const handler = async () =>  this.parametersService.remove(id);
    return this.parametersService.handleIfIdExists(id, handler);
  }
}
