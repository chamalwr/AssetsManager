import { Test, TestingModule } from '@nestjs/testing';
import { IncomeSheetsResolver } from './income-sheets.resolver';
import { IncomeSheetsService } from './income-sheets.service';

describe('IncomeSheetsResolver', () => {
  let resolver: IncomeSheetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeSheetsResolver, IncomeSheetsService],
    }).compile();

    resolver = module.get<IncomeSheetsResolver>(IncomeSheetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
