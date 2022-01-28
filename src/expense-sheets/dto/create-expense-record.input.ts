import { Field, InputType, Int } from "@nestjs/graphql";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";

@InputType()
export class CreateExpenseRecordInput {

    @Field(() => Int, {description: 'Date that expense occured'})
    date: number;

    @Field(() => String, { description : 'Expense Category' })
    expenseCategory: string;

    @Field({description: 'Expense Note'})
    notes: string;

    @Field({ description : 'Amount' })
    amount: string;
}