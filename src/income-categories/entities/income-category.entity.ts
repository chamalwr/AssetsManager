import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IncomeCategoryDocument = IncomeCategory & Document;

@ObjectType()
@Schema()
export class IncomeCategory {
  @Field(() => ID, { nullable: true, description: 'Income Category ID' })
  _id: string;

  @Field(() => String, { nullable: true, description: 'Income Category Name' })
  @Prop()
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Income Category Description',
  })
  @Prop()
  description: string;

  @Field(() => String, {
    nullable: true,
    description: 'Income Category Owner Id',
  })
  @Prop()
  userId: string;
}

export const IncomeCategorySchema =
  SchemaFactory.createForClass(IncomeCategory);
