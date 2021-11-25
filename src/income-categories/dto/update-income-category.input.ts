import { CreateIncomeCategoryInput } from './create-income-category.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeCategoryInput extends PartialType(
  CreateIncomeCategoryInput,
) {
  @Field(() => String, { description: 'Income Category Name' })
  name: string;

  @Field(() => String, { description: 'Income Category Description' })
  description: string;
}
