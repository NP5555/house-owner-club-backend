import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import { UserDashboardService } from "./dashboards.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("dashboard")
@ApiTags("dashboard")
export class UserDashboardController {
  constructor(readonly service: UserDashboardService) {}

  @Get("/")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User Dashboard",
    isArray: true,
  })
  async findByUserId(
    @Query("userId") userId: Uuid,
    @Res() res: any
  ): Promise<any> {
    const ownLands = await this.service.getUserDashboard(userId);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: ownLands,
    });
    return ownLands;
  }

  @Get("/admin")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Admin Dashboard",
    isArray: true,
  })
  async adminDashboard(@Res() res: any): Promise<any> {
    const adminDashboard = await this.service.getAdminDashboard();
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: adminDashboard,
    });
    return adminDashboard;
  }

  @Get("/agent")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Agent Dashboard",
    isArray: true,
  })
  async findByAgentId(
    @Query("userId") userId: Uuid,
    @Res() res: any
  ): Promise<any> {
    const landsData = await this.service.getAgentDashboard(userId);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: landsData,
    });
    return landsData;
  }

  @Get("/developer")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Agent Dashboard",
    isArray: true,
  })
  async findAll(
    @Res() res: any,
    @Query("developerId") developerId: Uuid
  ): Promise<any> {
    const landsData = await this.service.getDeveloperDashboard(developerId);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: landsData,
    });
    return landsData;
  }
}
