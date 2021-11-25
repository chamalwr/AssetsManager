import { CreateExpenseCategoryInput } from './create-expense-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseCategoryInput extends PartialType(CreateExpenseCategoryInput) {
  @Field(() => Int)
  id: number;
}
