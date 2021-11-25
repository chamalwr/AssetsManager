import { Test, TestingModule } from '@nestjs/testing';
import { IncomeCategoriesResolver } from './income-categories.resolver';
import { IncomeCategoriesService } from './income-categories.service';

describe('IncomeCategoriesResolver', () => {
  let resolver: IncomeCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeCategoriesResolver, IncomeCategoriesService],
    }).compile();

    resolver = module.get<IncomeCategoriesResolver>(IncomeCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
