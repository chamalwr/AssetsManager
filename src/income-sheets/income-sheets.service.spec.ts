import { Test, TestingModule } from '@nestjs/testing';
import { IncomeSheetsService } from './income-sheets.service';

describe('IncomeSheetsService', () => {
  let service: IncomeSheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeSheetsService],
    }).compile();

    service = module.get<IncomeSheetsService>(IncomeSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
