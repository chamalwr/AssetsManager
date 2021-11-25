import { CreateIncomeCategoryInput } from './create-income-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeCategoryInput extends PartialType(CreateIncomeCategoryInput) {
  @Field(() => Int)
  id: number;
}
