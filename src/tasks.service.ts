import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { PrismaService } from "./prisma/prisma.service";
import dayjs from "dayjs";

@Injectable()
export class TasksService {
  constructor (private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(TasksService.name);

  // 30 minutes
  @Interval(30 * 60 * 1000)
  async deleteExpiredTokens () {
    this.logger.log("Running deleteExpiredTokens task!")
    const expiredTokens = await this.prisma.token.findMany({
      where: {
        expiresAt: {
          lte: dayjs().toDate(),
        },
      },
    });

    if (expiredTokens.length === 0) return;

    const tokenIds = expiredTokens.map(token => token.id);
    await this.prisma.token.deleteMany({
      where: { id: { in: tokenIds } },
    });
    this.logger.log(`Deleted ${expiredTokens.length} expired tokens!`)
  }
}
