import { Module } from '@nestjs/common';
import { IncomeCategoriesService } from './income-categories.service';
import { IncomeCategoriesResolver } from './income-categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  IncomeCategory,
  IncomeCategorySchema,
} from './entities/income-category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IncomeCategory.name, schema: IncomeCategorySchema },
    ]),
  ],
  providers: [IncomeCategoriesResolver, IncomeCategoriesService, IncomeCategoriesResolver],
})
export class IncomeCategoriesModule {}
