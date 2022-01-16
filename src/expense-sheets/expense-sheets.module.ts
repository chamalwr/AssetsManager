import { Module } from '@nestjs/common';
import { ExpenseSheetsService } from './expense-sheets.service';
import { ExpenseSheetsResolver } from './expense-sheets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSheet, ExpenseSheetSchema } from './entities/expense-sheet.entity';

@Module({
  imports: [MongooseModule.forFeature([{name : ExpenseSheet.name, schema: ExpenseSheetSchema}])],
  providers: [ExpenseSheetsResolver, ExpenseSheetsService]
})
export class ExpenseSheetsModule {}
