import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentService } from "./rent.service";
import { RentController } from "./rent.controller";
import { RentEntity } from "./entities/rent.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { UserEntity } from "../user/user.entity";
import { TransactionEntity } from "../transactions/entities/transaction.entity";
import { TransactionService } from "../transactions/transaction.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, RentEntity, UserEntity, TransactionEntity])],
  controllers: [RentController],
  providers: [RentService, TransactionService],
  
})
export class RentModule {}
