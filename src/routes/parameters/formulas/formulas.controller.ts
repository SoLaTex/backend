import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormulasService } from './formulas.service';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';

@Controller('formulas')
export class FormulasController {
  constructor(private readonly formulasService: FormulasService) {}

  @Post()
  create(@Body() createFormulaDto: CreateFormulaDto) {
    return this.formulasService.create(createFormulaDto);
  }

  @Get()
  findAll() {
    return this.formulasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormulaDto: UpdateFormulaDto) {
    return this.formulasService.update(+id, updateFormulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulasService.remove(+id);
  }
}
