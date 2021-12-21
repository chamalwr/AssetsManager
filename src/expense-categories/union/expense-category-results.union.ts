import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { ExpenseCategory } from '../entities/expense-category.entity';

export const ExpenseCategoryResult = createUnionType({
  name: 'ExpenseCategoryResult',
  types: () => [ExpenseCategory, ExpenseCategoryResultError],
  resolveType(value) {
    if (value.name) {
      return ExpenseCategory;
    }
    if (value.reason) {
      return ExpenseCategoryResultError;
    }
    return null;
  },
});

@ObjectType()
export class ExpenseCategoryResultError {
  @Field(() => String, { description: 'Operation Performed' })
  operation: string;
  @Field(() => String, { description: 'Error Message' })
  message: string;
  @Field(() => String, { description: 'Error Description' })
  reason: string;
}
