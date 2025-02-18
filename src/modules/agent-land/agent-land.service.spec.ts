import { Test, TestingModule } from '@nestjs/testing';
import { AgentLandService } from './agent-land.service';

describe('AgentLandService', () => {
  let service: AgentLandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentLandService],
    }).compile();

    service = module.get<AgentLandService>(AgentLandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
