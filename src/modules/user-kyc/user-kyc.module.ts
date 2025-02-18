import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKYCService } from './user-kyc.service';
import { UserKYCController } from './user-kyc.controller';
import { UserKYCEntity } from "./entities/user-kyc.entity";

import { UserEntity } from '../user/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserKYCEntity]),
  ],
  controllers: [UserKYCController],
  providers: [UserKYCService]
})
export class UserKYCModule {}
