import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIncomeSheetInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
