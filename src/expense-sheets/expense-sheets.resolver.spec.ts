import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseSheetsResolver } from './expense-sheets.resolver';
import { ExpenseSheetsService } from './expense-sheets.service';

describe('ExpenseSheetsResolver', () => {
  let resolver: ExpenseSheetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseSheetsResolver, ExpenseSheetsService],
    }).compile();

    resolver = module.get<ExpenseSheetsResolver>(ExpenseSheetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
