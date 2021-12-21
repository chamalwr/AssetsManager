import { InputType, OmitType } from '@nestjs/graphql';
import { ExpenseCategory } from '../entities/expense-category.entity';

@InputType()
export class CreateExpenseCategoryInput extends OmitType(ExpenseCategory, [
  '_id',
] as const) {}
