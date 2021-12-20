import { CreateIncomeCategoryInput } from './create-income-category.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeCategoryInput extends OmitType(
  CreateIncomeCategoryInput, ["userId"] as const
) {
  @Field(() => String, { description: 'Income Category Name' })
  name: string;

  @Field(() => String, { description: 'Income Category Description' })
  description: string;
}
