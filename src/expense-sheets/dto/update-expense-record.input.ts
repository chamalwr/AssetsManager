import { InputType, PartialType } from '@nestjs/graphql';
import { CreateExpenseRecordInput } from './create-expense-record.input';

@InputType()
export class UpdateExpenseRecordInput extends PartialType(
  CreateExpenseRecordInput,
) {}
