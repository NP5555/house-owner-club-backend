import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from "./entities/transaction.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { TradeEntity } from '../trade/entities/trade.entity';
import { RentEntity } from '../rent/entities/rent.entity';
import { RentService } from '../rent/rent.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, TransactionEntity, TradeEntity, RentEntity]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
