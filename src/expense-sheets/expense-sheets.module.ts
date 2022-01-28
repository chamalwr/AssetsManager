import { Module } from '@nestjs/common';
import { ExpenseSheetsService } from './expense-sheets.service';
import { ExpenseSheetsResolver } from './expense-sheets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSheet, ExpenseSheetSchema } from './entities/expense-sheet.entity';
import { ExpenseRecordService } from './expense-records.service';
import { ExpenseRecordResolver } from './expense-records.resolver';
import { ExpenseRecord, ExpenseRecordSchema } from './entities/expense-record.entity';

@Module({
  imports: [MongooseModule.forFeature([{name : ExpenseSheet.name, schema: ExpenseSheetSchema}, 
    {name: ExpenseRecord.name, schema: ExpenseRecordSchema}])],
  providers: [ExpenseSheetsResolver, ExpenseSheetsService, ExpenseRecordResolver, ExpenseRecordService]
})
export class ExpenseSheetsModule {}
