import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDashboardService } from "./dashboards.service";
import { UserDashboardController } from "./dashboards.controller";
import { BuyEntity } from "../buy/entities/buy.entity";
import { TradeEntity } from "../trade/entities/trade.entity";
import { AgentLandEntity } from "../agent-land/entities/agent-land.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyEntity, TradeEntity, AgentLandEntity, ProjectEntity, UserEntity]),
  ],
  controllers: [UserDashboardController],
  providers: [UserDashboardService],
})
export class UserDashboardModule {}
