import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";

@ObjectType()
@Schema()
export class ExpenseRecord {
    @Field(() => ID, { description: 'Expense Record ID' })
    _id: string;

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