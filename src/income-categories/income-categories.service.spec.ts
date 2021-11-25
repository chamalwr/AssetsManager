import { Test, TestingModule } from '@nestjs/testing';
import { IncomeCategoriesService } from './income-categories.service';

describe('IncomeCategoriesService', () => {
  let service: IncomeCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeCategoriesService],
    }).compile();

    service = module.get<IncomeCategoriesService>(IncomeCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
