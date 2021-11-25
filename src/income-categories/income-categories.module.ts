import { Module } from '@nestjs/common';
import { IncomeCategoriesService } from './income-categories.service';
import { IncomeCategoriesResolver } from './income-categories.resolver';

@Module({
  providers: [IncomeCategoriesResolver, IncomeCategoriesService],
})
export class IncomeCategoriesModule {}
