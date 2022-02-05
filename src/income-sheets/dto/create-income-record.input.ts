import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateIncomeRecordInput {
  @Field(() => Int, { description: 'Date that income record occured' })
  date: number;

  @Field(() => String, { description: 'Income Category' })
  incomeCategory: string;

  @Field({ description: 'Income Record Note' })
  notes: string;

  @Field({ description: 'Amount' })
  amount: string;
}
