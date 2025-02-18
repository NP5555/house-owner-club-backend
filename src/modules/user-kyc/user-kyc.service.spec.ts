import { Test, TestingModule } from '@nestjs/testing';
import { UserKYCService } from './user-kyc.service';

describe('UserKYCService', () => {
  let service: UserKYCService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserKYCService],
    }).compile();

    service = module.get<UserKYCService>(UserKYCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
