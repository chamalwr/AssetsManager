import { Field, InputType, OmitType } from '@nestjs/graphql';
import { ExpenseCategory } from '../entities/expense-category.entity';

@InputType()
export class CreateExpenseCategoryInput extends OmitType(ExpenseCategory, [
  '_id',
] as const) {
  @Field(() => String, { description: 'Expense Category Name' })
  name: string;

  @Field(() => String, { description: 'Expense Category Description' })
  description: string;

  @Field(() => String, { description: 'Expense Category Owner Id' })
  userId: string;
}
