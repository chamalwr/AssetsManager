import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";
import * as mongoose from 'mongoose';

export type ExpenseRecordDocument = ExpenseRecord & Document; 

@ObjectType()
@Schema()
export class ExpenseRecord {
    @Field(() => ID, { description: 'Expense Record ID' })
    _id: string;

    @Field(() => ExpenseCategory, { description : 'Expense Category' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory' })
    expenseCategory: ExpenseCategory;

    @Field({description: 'Expense Note'})
    @Prop()
    notes: string;

    @Field({ description : 'Amount' })
    @Prop()
    amount: string;
}

export const ExpenseRecordSchema = SchemaFactory.createForClass(ExpenseRecord);