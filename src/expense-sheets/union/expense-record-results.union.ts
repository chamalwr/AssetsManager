import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { ExpenseRecord } from '../entities/expense-record.entity';
import { ExpenseSheet } from '../entities/expense-sheet.entity';

export const ExpenseRecordResult = createUnionType({
  name: 'ExpenseRecordResult',
  types: () => [ExpenseRecord, ExpenseSheet, ExpenseRecordResultError],
  resolveType(value) {
    if (value.date || value.notes) {
      return 'ExpenseRecord';
    }

    if (value.month || value.year) {
      return 'ExpenseSheet';
    }

    if (value.reason) {
      return 'ExpenseRecordResultError';
    }
  },
});

@ObjectType()
export class ExpenseRecordResultError {
  @Field(() => String, { description: 'Operation Performed' })
  operation: string;
  @Field(() => String, { description: 'Error Message' })
  message: string;
  @Field(() => String, { description: 'Error Description' })
  reason: string;
}
