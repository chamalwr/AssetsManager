import { CreateExpenseSheetInput } from './create-expense-sheet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseSheetInput extends PartialType(CreateExpenseSheetInput) {
  @Field(() => Int)
  id: number;
}
