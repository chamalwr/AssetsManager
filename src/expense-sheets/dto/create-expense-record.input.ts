import { Field, InputType } from "@nestjs/graphql";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";

@InputType()
export class CreateExpenseRecordInput {
    @Field(() => String, { description : 'Expense Category' })
    expenseCategory: string;

    @Field({description: 'Expense Note'})
    notes: string;

    @Field({ description : 'Amount' })
    amount: string;
}