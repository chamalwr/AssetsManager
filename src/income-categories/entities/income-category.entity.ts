import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IncomeCategoryDocument = IncomeCategory & Document;

@ObjectType()
@Schema()
export class IncomeCategory {
  @Field(() => ID, { description: 'Income Category ID' })
  _id: number;

  @Field(() => String, { description: 'Income Category Name' })
  @Prop()
  name: string;

  @Field(() => String, { description: 'Income Category Description' })
  @Prop()
  description: string;

  @Field(() => String, { description: 'Income Category Owner Id' })
  @Prop()
  userId: string;
}

export const IncomeCategorySchema =
  SchemaFactory.createForClass(IncomeCategory);
