import { InputType, PartialType } from "@nestjs/graphql";
import { CreateIncomeRecordInput } from "./create-income-record.input";

@InputType()
export class UpdateIncomeRecordInput extends PartialType(CreateIncomeRecordInput) {
}