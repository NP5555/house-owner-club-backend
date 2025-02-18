import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BuyEntity } from "../buy/entities/buy.entity";
import { AgentLandEntity } from "../agent-land/entities/agent-land.entity";
import { Repository } from "typeorm";
import { TradeEntity } from "../trade/entities/trade.entity";
import { LandStatus } from "../../constants/land-status";
import { ProjectEntity } from "../project/entities/project.entity";
import { UserEntity } from "../user/user.entity";
import { RoleType } from "../../constants";

@Injectable()
export class UserDashboardService {
  constructor(
    @InjectRepository(BuyEntity)
    private readonly buyRepository: Repository<BuyEntity>,
    @InjectRepository(TradeEntity)
    private readonly tradeRepository: Repository<TradeEntity>,
    @InjectRepository(AgentLandEntity)
    private readonly agentLandRepository: Repository<AgentLandEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserDashboard(userid: Uuid): Promise<any> {
    const totalOwnLands = await this.buyRepository.count({
      where: { userId: userid },
    });
    const totalSignedLands = await this.buyRepository.count({
      where: { userId: userid, isSigned: true },
    });

    const totalRequestedLands = await this.buyRepository.count({
      where: { userId: userid, isSigned: false },
    });

    const totalListedLands = await this.tradeRepository.count({
      where: { userId: userid, isListed: true },
    });

    const resultArray = [
      { label: "Total Own Lands", value: totalOwnLands },
      { label: "Total Signed Lands", value: totalSignedLands },
      { label: "Total Requested Lands", value: totalRequestedLands },
      { label: "Total Listed Lands", value: totalListedLands },
    ];

    return resultArray;
  }

  async getAgentDashboard(userId: string): Promise<any> {
    const totalLands = await this.agentLandRepository.count();
    const totalSoldLands = await this.agentLandRepository.count({
      where: { status: LandStatus.SOLD },
    });
    const totalInprocessLands = await this.agentLandRepository.count({
      where: { status: LandStatus.IN_PROCESS },
    });
    const totalUnSoldLands = await this.agentLandRepository.count({
      where: { status: LandStatus.UNSOLD },
    });

    const totalSignedLands = await this.buyRepository.count({
      where: { isSigned: true },
    });

    const totalRequestedLands = await this.buyRepository.count({
      where: { isSigned: false },
    });
    const resultArray = [
      { label: "Total Lands", value: totalLands },
      { label: "Unsold Lands", value: totalUnSoldLands },
      { label: "In Process Lands", value: totalInprocessLands },
      { label: "Sold Lands", value: totalSoldLands },
      { label: "Signed Lands", value: totalSignedLands },
      { label: "Request Buy", value: totalRequestedLands },
    ];

    return resultArray;
  }

  async getDeveloperDashboard(userid: Uuid): Promise<any> {
    const totalLands = await this.agentLandRepository.count({
      where: { agentId: userid },
    });
    const totalSoldLands = await this.agentLandRepository.count({
      where: { agentId: userid, status: LandStatus.SOLD },
    });

    const totalInprocessLands = await this.agentLandRepository.count({
      where: { agentId: userid, status: LandStatus.IN_PROCESS },
    });

    const totalUnSoldLands = await this.agentLandRepository.count({
      where: { agentId: userid, status: LandStatus.UNSOLD },
    });

    const resultArray = [
      { label: "Total Lands", value: totalLands },
      { label: "Unsold Lands", value: totalUnSoldLands },
      { label: "In Process Lands", value: totalInprocessLands },
      { label: "Sold Lands", value: totalSoldLands },
    ];

    return resultArray;
  }

  async getAdminDashboard(): Promise<any> {
    const totalLands = await this.agentLandRepository.count();
    const totalSoldLands = await this.agentLandRepository.count({
      where: { status: LandStatus.SOLD },
    });

    const totalInprocessLands = await this.agentLandRepository.count({
      where: { status: LandStatus.IN_PROCESS },
    });

    const totalUnSoldLands = await this.agentLandRepository.count({
      where: { status: LandStatus.UNSOLD },
    });

    const totalProjects = await this.projectRepository.count();

    const totalDevelopers = await this.userRepository.count({
      where: { role: RoleType.DEVELOPER },
    });

    const totalActiveDevelopers = await this.userRepository.count({
      where: { role: RoleType.DEVELOPER, isActive: true },
    });

    const resultArray = [
      { label: "Total Lands", value: totalLands },
      { label: "Unsold Lands", value: totalUnSoldLands },
      { label: "In Process Lands", value: totalInprocessLands },
      { label: "Sold Lands", value: totalSoldLands },
      { label: "Total Projects", value: totalProjects },
      { label: "Total Developers", value: totalDevelopers },
      { label: "Active Developers", value: totalActiveDevelopers },
    ];

    return resultArray;
  }
}
