import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIncomeCategoryInput {
  @Field(() => String, { description: 'Income Category Name' })
  name: string;

  @Field(() => String, { description: 'Income Category Description' })
  description: string;

  @Field(() => String, { description: 'Income Category Description' })
  userId: string;
}
