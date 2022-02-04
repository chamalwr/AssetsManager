import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { IncomeSheet } from '../entities/income-sheet.entity';

export const IncomeSheetResult = createUnionType({
  name: 'IncomeSheetResult',
  types: () => [IncomeSheet, IncomeSheetResultError],
  resolveType(value) {
    if (value.month || value.year) {
      return IncomeSheet;
    }

    if (value.message) {
      return IncomeSheetResultError;
    }
  },
});

@ObjectType()
export class IncomeSheetResultError {
  @Field(() => String, { description: 'Operation Performed' })
  operation: string;
  @Field(() => String, { description: 'Error Message' })
  message: string;
  @Field(() => String, { description: 'Error Description' })
  reason: string;
}
