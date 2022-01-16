import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { ExpenseSheet } from "../entities/expense-sheet.entity";

export const ExpenseSheetResult = createUnionType({
    name: 'ExpenseSheetResult',
    types: () => [ExpenseSheet, ExpenseSheetResultError],
    resolveType(value){
        if(value.month){
            return ExpenseSheet
        }
        if(value.reason){
            return ExpenseSheetResultError
        }
    }
})

@ObjectType()
export class ExpenseSheetResultError {
  @Field(() => String, { description: 'Operation Performed' })
  operation: string;
  @Field(() => String, { description: 'Error Message' })
  message: string;
  @Field(() => String, { description: 'Error Description' })
  reason: string;
}
