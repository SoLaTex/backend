import { Body, Controller, Get } from "@nestjs/common";
import { FunctionsService } from "./functions.service";

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
