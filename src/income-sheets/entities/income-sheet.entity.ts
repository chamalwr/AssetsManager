import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IncomeRecord } from './income-record.entity';

export type IncomeSheetDocument = IncomeSheet & Document;

@ObjectType()
@Schema()
export class IncomeSheet {
  @Field(() => ID, { description: 'Income Sheet ID' })
  _id: string;

  @Field(() => Int, { description: 'Month Income Sheet belongs to' })
  @Prop()
  month: number;

  @Field(() => Int, { description: 'Year Income Sheet belongs to' })
  @Prop()
  year: number;

  @Field({ description: 'Curreny Code' })
  @Prop()
  currency: string;

  @Field(() => [IncomeRecord], {
    nullable: true,
    description: 'Monthly Income Record List',
  })
  @Prop([IncomeRecord])
  incomeRecords: IncomeRecord[];

  @Field(() => Number, { defaultValue: 0.0,  description: 'Total Monthly Income' })
  @Prop()
  totalAmount: number;

  @Field({ description: 'Owner ID which Income sheet belongs to' })
  @Prop()
  userId: string;
}

export const IncomeSheetSchema = SchemaFactory.createForClass(IncomeSheet);
