import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";

@ObjectType()
@Schema()
export class ExpenseRecord {
    @Field(() => ExpenseCategory, { description : 'Expense Category' })
    @Prop()
    expenseCategory: ExpenseCategory;

    @Field({description: 'Expense Note'})
    @Prop()
    notes: string;

    @Field({ description : 'Amount' })
    @Prop()
    amount: string;
}