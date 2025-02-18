import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TradeService } from "./trade.service";
import { TradeController } from "./trade.controller";
import { TradeEntity } from "./entities/trade.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { TransactionService } from "../transactions/transaction.service";
import { TransactionEntity } from "../transactions/entities/transaction.entity";


// import { ProjectEntity } from "../project/entities/project.entity";
// import { BuyManagePolicyProvider } from "./handlers/buy-manage-policy.provider";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, TradeEntity, TransactionEntity])],
  controllers: [TradeController],
  providers: [TradeService, TransactionService],
})
export class TradeModule {}
