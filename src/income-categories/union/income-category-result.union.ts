import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { IncomeCategory } from '../entities/income-category.entity';

export const IncomeCategoryResult = createUnionType({
  name: 'IncomeCategoryResult',
  types: () => [IncomeCategory, IncomeCategoryResultError],
  resolveType(value) {
    if (value.name) {
      return IncomeCategory;
    }
    if (value.reason) {
      return IncomeCategoryResultError;
    }
    return null;
  },
});

@ObjectType()
export class IncomeCategoryResultError {
  @Field(() => String, { description: 'Operation Performed' })
  operation: string;
  @Field(() => String, { description: 'Error Message' })
  message: string;
  @Field(() => String, { description: 'Error Description' })
  reason: string;
}
