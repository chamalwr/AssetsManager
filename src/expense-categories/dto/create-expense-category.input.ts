import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExpenseCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
