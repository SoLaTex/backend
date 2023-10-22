import { Module } from "@nestjs/common";
import { AuthModule } from "./routes/auth/auth.module";
import { UsersModule } from "./routes/users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from "./tasks.service";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot()
  ],
  providers: [PrismaService, TasksService],
})
export class AppModule {
}
