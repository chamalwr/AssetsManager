import { CreateIncomeSheetInput } from './create-income-sheet.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeSheetInput extends OmitType(CreateIncomeSheetInput, [
  'userId',
  'incomeRecords',
] as const) {}
