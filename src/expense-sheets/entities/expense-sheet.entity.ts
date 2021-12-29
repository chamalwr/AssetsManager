import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExpenseRecord } from './expense-record.entity';

export type ExpenseSheetDocument = ExpenseSheet & Document; 

@ObjectType()
@Schema()
export class ExpenseSheet {
  @Field(() => ID, { description: 'Expense Sheet ID' })
  _id: string;

  @Field(() => Int, {description: 'Month Expense Sheet belongs to'})
  @Prop()
  month: number;

  @Field(() => Int, {description: 'Year Expense Sheet belongs to'})
  @Prop()
  year: number;

  @Field({ description: 'Curreny Code' })
  @Prop()
  currency: string;

  @Field(() => [ExpenseRecord], { description: 'Monthly Expense List' })
  @Prop()
  expenseRecords: ExpenseRecord[];

  @Field({description: 'Owner ID which expense sheet belongs to'})
  @Prop()
  userId: string;
}

export const ExpenseSheetSchema = SchemaFactory.createForClass(ExpenseSheet);
