import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateIncomeRecordInput } from './create-income-record.input';

@InputType()
export class CreateIncomeSheetInput {
  @Field(() => Int, { description: 'Month Income Sheet belongs to' })
  month: number;

  @Field(() => Int, { description: 'Year Income Sheet belongs to' })
  year: number;

  @Field({ description: 'Curreny Code' })
  currency: string;

  @Field(() => [CreateIncomeRecordInput], {
    nullable: true,
    description: 'Monthly Income List',
  })
  incomeRecords: CreateIncomeRecordInput[];

  @Field({ description: 'Owner ID which Income sheet belongs to' })
  userId: string;
}
