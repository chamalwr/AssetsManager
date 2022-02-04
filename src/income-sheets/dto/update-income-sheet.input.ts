import { CreateIncomeSheetInput } from './create-income-sheet.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeSheetInput extends OmitType(CreateIncomeSheetInput, ['userId', 'incomeRecords'] as const) {
}
