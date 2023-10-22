import {OmitType} from '@nestjs/mapped-types';
import { CreateUserDto } from "./CreateUser.dto";

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {}
