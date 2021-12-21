import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ExpenseCategoryDocument = ExpenseCategory & Document;

@ObjectType()
@Schema()
export class ExpenseCategory {
  @Field(() => ID, { description: 'Expense Category ID' })
  _id: string;

  @Field(() => String, { description: 'Expense Category Name' })
  @Prop()
  name: string;

  @Field(() => String, { description: 'Expense Category Description' })
  @Prop()
  description: string;

  @Field(() => String, { description: 'Expense Category Owner Id' })
  @Prop()
  userId: string;
}

export const ExpenseCategorySchema =
  SchemaFactory.createForClass(ExpenseCategory);
