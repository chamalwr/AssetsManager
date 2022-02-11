import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExpenseSheetsService } from './expense-sheets.service';
import { ExpenseSheet } from './entities/expense-sheet.entity';
import { CreateExpenseSheetInput } from './dto/create-expense-sheet.input';
import { UpdateExpenseSheetInput } from './dto/update-expense-sheet.input';
import { ExpenseSheetResult } from './union/expense-sheets-results.union';

@Resolver(() => ExpenseSheet)
export class ExpenseSheetsResolver {
  constructor(private readonly expenseSheetsService: ExpenseSheetsService) {}

  @Mutation(() => ExpenseSheetResult)
  createExpenseSheet(
    @Args('createExpenseSheetInput')
    createExpenseSheetInput: CreateExpenseSheetInput,
  ) {
    return this.expenseSheetsService.create(createExpenseSheetInput);
  }

  @Query(() => [ExpenseSheetResult], { name: 'expenseSheets' })
  findAll(@Args('userId') userId: string) {
    return this.expenseSheetsService.findAll(userId);
  }

  @Query(() => ExpenseSheetResult, { name: 'expenseSheet' })
  findOne(@Args('id') id: string) {
    return this.expenseSheetsService.findOne(id);
  }

  @Query(() => ExpenseSheetResult, { name: 'expeseSheetByMonthAndYear' })
  getExpenseSheetByMonthAndYear(
    @Args('userId') userId: string,
    @Args('month') month: number,
    @Args('year') year: number,
  ) {
    return this.expenseSheetsService.findByMonthAndYear(userId, month, year);
  }

  @Query(() => [ExpenseSheetResult], { name: 'expeseSheetsByYear' })
  getExpenseSheetByYear(
    @Args('userId') userId: string,
    @Args('year') year: number,
  ) {
    return this.expenseSheetsService.findByYear(userId, year);
  }

  @Mutation(() => ExpenseSheetResult)
  updateExpenseSheet(
    @Args('id') id: string,
    @Args('updateExpenseSheetInput')
    updateExpenseSheetInput: UpdateExpenseSheetInput,
  ) {
    return this.expenseSheetsService.update(id, updateExpenseSheetInput);
  }

  @Mutation(() => ExpenseSheetResult)
  removeExpenseSheet(@Args('id') id: string) {
    return this.expenseSheetsService.remove(id);
  }
}
