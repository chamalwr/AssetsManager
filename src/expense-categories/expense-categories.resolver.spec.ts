import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseCategoriesResolver } from './expense-categories.resolver';
import { ExpenseCategoriesService } from './expense-categories.service';

describe('ExpenseCategoriesResolver', () => {
  let resolver: ExpenseCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseCategoriesResolver, ExpenseCategoriesService],
    }).compile();

    resolver = module.get<ExpenseCategoriesResolver>(ExpenseCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
