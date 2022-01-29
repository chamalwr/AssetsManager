import { CreateExpenseSheetInput } from './create-expense-sheet.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseSheetInput extends OmitType(CreateExpenseSheetInput, [
  'userId',
  'expenseRecords',
] as const) {}
