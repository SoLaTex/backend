import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { FunctionsService } from "./functions.service";
import { AuthGuard } from "../../guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('functions')
export class FunctionsController {
  constructor (private readonly functionsService: FunctionsService) {}

  @Get('validate')
  validateFunction (@Body('fn') fn: string) {
    return this.functionsService.validateFunction(fn);
  }

  @Get('fetch-symbols')
  fetchSymbols (@Body('fn') fn: string) {
    return this.functionsService.fetchSymbols(fn);
  }
}
