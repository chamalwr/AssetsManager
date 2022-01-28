import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateExpenseRecordInput } from "./dto/create-expense-record.input";
import { UpdateExpenseRecordInput } from "./dto/update-expense-record.input";
import { ExpenseRecord } from "./entities/expense-record.entity";
import { ExpenseSheet } from "./entities/expense-sheet.entity";
import { ExpenseRecordService } from "./expense-records.service";

@Resolver(() => ExpenseRecord)
export class ExpenseRecordResolver {
    constructor(private readonly expenseRecordService: ExpenseRecordService){}

    @Mutation(() => ExpenseRecord)
    createExpenseRecord(@Args('expenseSheetId') expenseSheetId: string, @Args('createExpenseRecordInput') createExpenseRecordInput: CreateExpenseRecordInput){
        return this.expenseRecordService.create(expenseSheetId, createExpenseRecordInput);
    }

    @Query(() => [ExpenseRecord], {name: 'expenseRecords'})
    findAll(@Args('expenseSheetId') expenseSheetId: string){
        return this.expenseRecordService.findAll(expenseSheetId);
    }

    @Query(() => ExpenseRecord, {name: 'expenseRecord'})
    findOne(@Args('expenseSheetId') expenseSheetId: string, @Args('id') id: string){
        return this.expenseRecordService.findOne(expenseSheetId, id);
    }

    @Mutation(() => ExpenseSheet)
    updateExpenseRecord(@Args('expenseSheetId') expenseSheetId: string, 
                        @Args('expenseRecordId') id: string,
                        @Args('updateExpenseRecordInput') updateExpenseRecordInput: UpdateExpenseRecordInput){
        return this.expenseRecordService.update(expenseSheetId, id, updateExpenseRecordInput);
    }

    @Mutation(() => ExpenseSheet)
    removeExpenseRecord(@Args('expenseSheetId') expenseSheetId: string, @Args('id') id: string){
        return this.expenseRecordService.remove(expenseSheetId, id);
    }
}