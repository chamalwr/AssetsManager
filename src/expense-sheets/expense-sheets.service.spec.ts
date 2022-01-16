import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseSheetsService } from './expense-sheets.service';

describe('ExpenseSheetsService', () => {
  let service: ExpenseSheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseSheetsService],
    }).compile();

    service = module.get<ExpenseSheetsService>(ExpenseSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
