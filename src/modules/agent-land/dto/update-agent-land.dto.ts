import { LandStatus } from "../../../constants/land-status";
import { StringFieldOptional } from "../../../decorators";

export class UpdateAgentLandDto {
  @StringFieldOptional()
  tokenId: string;

  @StringFieldOptional()
  status: LandStatus;

  @StringFieldOptional()
  agentId: string;

  @StringFieldOptional()
  projectId: string;

  @StringFieldOptional()
  developerId: string;
}
