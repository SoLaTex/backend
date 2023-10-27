import { Module } from '@nestjs/common';
import { FormulasService } from './formulas.service';
import { SymbolsModule } from './symbols/symbols.module';

@Module({
  providers: [FormulasService],
  imports: [SymbolsModule],
})
export class FormulasModule {}
