import { Module } from "@nestjs/common";
import { AuthModule } from "./routes/auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from "./tasks.service";
import { ParametersModule } from './routes/parameters/parameters.module';
import { FunctionsModule } from './routes/functions/functions.module';

@Module({
  imports: [
    AuthModule,
    ScheduleModule.forRoot(),
    ParametersModule,
    FunctionsModule
  ],
  providers: [
    TasksService,
    PrismaService,
  ],
})
export class AppModule {
}
