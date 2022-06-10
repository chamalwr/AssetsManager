import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IncomeCategory } from 'src/income-categories/entities/income-category.entity';
import * as mongoose from 'mongoose';

export type IncomeRecordDocument = IncomeRecord & Document;

@ObjectType()
@Schema()
export class IncomeRecord {
  @Field(() => ID, { nullable: true, description: 'Income Record ID' })
  _id: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Date that income occured',
  })
  @Prop()
  date: number;

  @Field(() => IncomeCategory, {
    nullable: true,
    description: 'Income Category',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'IncomeCategory' })
  incomeCategory: IncomeCategory;

  @Field({ nullable: true, description: 'Income Record Note' })
  @Prop()
  notes: string;

  @Field(() => Number, { nullable: true, description: 'Amount' })
  @Prop()
  amount: number;
}

export const IncomeRecordSchema = SchemaFactory.createForClass(IncomeRecord);
