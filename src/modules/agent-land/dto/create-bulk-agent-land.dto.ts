import { NumberField } from "../../../decorators";
import { IsArray, IsString } from "class-validator";

export class CreateBulkAgentLandDto {
  @NumberField()
  startTokenId: number;

  @NumberField()
  count: number;

  @IsString()
  typeId: string;

  @IsString()
  developerId: string;

  @IsString()
  projectId: string;

  @IsArray()
  youtubeLinks: string[];

  @IsArray()
  landImage: string[];

  @IsString()
  agentId: string;
}
