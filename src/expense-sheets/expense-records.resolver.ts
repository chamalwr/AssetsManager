import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateExpenseRecordInput } from "./dto/create-expense-record.input";
import { UpdateExpenseRecordInput } from "./dto/update-expense-record.input";
import { ExpenseRecord } from "./entities/expense-record.entity";
import { ExpenseSheet } from "./entities/expense-sheet.entity";
import { ExpenseRecordService } from "./expense-records.service";
import { ExpenseRecordResult } from "./union/expense-record-results.union";

@Resolver(() => ExpenseRecord)
export class ExpenseRecordResolver {
    constructor(private readonly expenseRecordService: ExpenseRecordService){}

    @Mutation(() => ExpenseRecordResult)
    createExpenseRecord(@Args('expenseSheetId') expenseSheetId: string, @Args('createExpenseRecordInput') createExpenseRecordInput: CreateExpenseRecordInput){
        return this.expenseRecordService.create(expenseSheetId, createExpenseRecordInput);
    }

    @Query(() => [ExpenseRecordResult], {name: 'expenseRecords'})
    findAll(@Args('expenseSheetId') expenseSheetId: string){
        return this.expenseRecordService.findAll(expenseSheetId);
    }

    @Query(() => ExpenseRecordResult, {name: 'expenseRecord'})
    findOne(@Args('expenseSheetId') expenseSheetId: string, @Args('id') id: string){
        return this.expenseRecordService.findOne(expenseSheetId, id);
    }

    @Mutation(() => ExpenseRecordResult)
    updateExpenseRecord(@Args('expenseSheetId') expenseSheetId: string, 
                        @Args('expenseRecordId') id: string,
                        @Args('updateExpenseRecordInput') updateExpenseRecordInput: UpdateExpenseRecordInput){
        return this.expenseRecordService.update(expenseSheetId, id, updateExpenseRecordInput);
    }

    @Mutation(() => ExpenseRecordResult)
    removeExpenseRecord(@Args('expenseSheetId') expenseSheetId: string, @Args('id') id: string){
        return this.expenseRecordService.remove(expenseSheetId, id);
    }
}