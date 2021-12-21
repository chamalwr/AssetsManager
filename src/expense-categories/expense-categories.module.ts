import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategoriesResolver } from './expense-categories.resolver';
import {
  ExpenseCategory,
  ExpenseCategorySchema,
} from './entities/expense-category.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExpenseCategory.name, schema: ExpenseCategorySchema },
    ]),
  ],
  providers: [ExpenseCategoriesResolver, ExpenseCategoriesService],
})
export class ExpenseCategoriesModule {}
