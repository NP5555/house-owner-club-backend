import { IsArray, IsString } from "class-validator";

export class CreateAgentLandDto {
  @IsString()
  tokenId: string;

  @IsString()
  typeId: string;

  @IsString()
  projectId: string;

  @IsString()
  developerId: string;

  @IsArray()
  youtubeLinks: string[];

  @IsArray()
  landImage: string[];

  @IsString()
  agentId: string;
}
