import { Module } from "@nestjs/common";
import { AuthModule } from "./routes/auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from "./tasks.service";
import { ParametersModule } from './routes/parameters/parameters.module';

@Module({
  imports: [
    AuthModule,
    ScheduleModule.forRoot(),
    ParametersModule
  ],
  providers: [
    TasksService,
    PrismaService,
  ],
})
export class AppModule {
}
