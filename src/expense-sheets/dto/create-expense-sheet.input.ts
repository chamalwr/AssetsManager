import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateExpenseRecordInput } from './create-expense-record.input';

@InputType()
export class CreateExpenseSheetInput {
  @Field(() => Int, { description: 'Month Expense Sheet belongs to' })
  month: number;

  @Field(() => Int, { description: 'Year Expense Sheet belongs to' })
  year: number;

  @Field({ description: 'Curreny Code' })
  currency: string;

  @Field(() => [CreateExpenseRecordInput], {
    nullable: true,
    description: 'Monthly Expense List',
  })
  expenseRecords: CreateExpenseRecordInput[];

  @Field({ description: 'Owner ID which expense sheet belongs to' })
  userId: string;
}
