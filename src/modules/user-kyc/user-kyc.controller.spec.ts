import { Test, TestingModule } from '@nestjs/testing';
import { UserKYCController } from './user-kyc.controller';
import { UserKYCService } from './user-kyc.service';

describe('UserKYCController', () => {
  let controller: UserKYCController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserKYCController],
      providers: [UserKYCService],
    }).compile();

    controller = module.get<UserKYCController>(UserKYCController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
