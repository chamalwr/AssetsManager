import { Module } from '@nestjs/common';
import { IncomeSheetsService } from './income-sheets.service';
import { IncomeSheetsResolver } from './income-sheets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeRecord } from './entities/income-record.entity';
import { IncomeSheet, IncomeSheetSchema } from './entities/income-sheet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IncomeRecord.name, schema: 'IncomeRecordSchema' },
      { name: IncomeSheet.name, schema: 'IncomeSheetSchema' },
    ]),
  ],
  providers: [IncomeSheetsResolver, IncomeSheetsService],
})
export class IncomeSheetsModule {}
