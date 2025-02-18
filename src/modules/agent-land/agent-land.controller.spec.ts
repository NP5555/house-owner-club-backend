import { Test, TestingModule } from '@nestjs/testing';
import { AgentLandController } from './agent-land.controller';
import { AgentLandService } from './agent-land.service';

describe('AgentLandController', () => {
  let controller: AgentLandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentLandController],
      providers: [AgentLandService],
    }).compile();

    controller = module.get<AgentLandController>(AgentLandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
