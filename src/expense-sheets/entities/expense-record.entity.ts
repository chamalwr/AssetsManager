import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";
import * as mongoose from 'mongoose';

export type ExpenseRecordDocument = ExpenseRecord & Document; 

@ObjectType()
@Schema()
export class ExpenseRecord {
    @Field(() => ID, {nullable: true, description: 'Expense Record ID' })
    _id: string;

    @Field(() => Int, {nullable: true, description: 'Date that expense occured'})
    @Prop()
    date: number;

    @Field(() => ExpenseCategory, {nullable: true, description : 'Expense Category' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory' })
    expenseCategory: ExpenseCategory;

    @Field({nullable: true, description: 'Expense Note'})
    @Prop()
    notes: string;

    @Field({nullable: true, description : 'Amount' })
    @Prop()
    amount: string;
}

export const ExpenseRecordSchema = SchemaFactory.createForClass(ExpenseRecord);