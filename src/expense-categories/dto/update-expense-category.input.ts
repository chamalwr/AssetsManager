import { CreateExpenseCategoryInput } from './create-expense-category.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseCategoryInput extends OmitType(
  CreateExpenseCategoryInput,
  ['userId'] as const,
) {}
