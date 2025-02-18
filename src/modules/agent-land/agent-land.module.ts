import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgentLandService } from "./agent-land.service";
import { AgentLandController } from "./agent-land.controller";
import { AgentLandEntity } from "./entities/agent-land.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, AgentLandEntity, UserEntity]),
  ],
  controllers: [AgentLandController],
  providers: [AgentLandService],
})
export class AgentLandModule {}
