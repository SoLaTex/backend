import { Module } from "@nestjs/common";
import { AuthModule } from "./routes/auth/auth.module";
import { UsersModule } from "./routes/users/users.module";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [AuthModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule {
}
