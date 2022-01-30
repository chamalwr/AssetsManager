import { CreateIncomeSheetInput } from './create-income-sheet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeSheetInput extends PartialType(
  CreateIncomeSheetInput,
) {
  @Field(() => Int)
  id: number;
}
