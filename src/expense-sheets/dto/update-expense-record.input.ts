import { ObjectType, Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";
import { CreateExpenseRecordInput } from "./create-expense-record.input";

@InputType()
export class UpdateExpenseRecordInput extends PartialType(CreateExpenseRecordInput) {

}