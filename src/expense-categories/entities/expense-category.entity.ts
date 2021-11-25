import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExpenseCategory {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
