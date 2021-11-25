import { Module } from '@nestjs/common';
import { IncomeCategoriesModule } from './income-categories/income-categories.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';

@Module({
  imports: [IncomeCategoriesModule, ExpenseCategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
