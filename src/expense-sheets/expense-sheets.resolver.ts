import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpenseSheetsService } from './expense-sheets.service';
import { ExpenseSheet } from './entities/expense-sheet.entity';
import { CreateExpenseSheetInput } from './dto/create-expense-sheet.input';
import { UpdateExpenseSheetInput } from './dto/update-expense-sheet.input';

@Resolver(() => ExpenseSheet)
export class ExpenseSheetsResolver {
  constructor(private readonly expenseSheetsService: ExpenseSheetsService) {}

  @Mutation(() => ExpenseSheet)
  createExpenseSheet(@Args('createExpenseSheetInput') createExpenseSheetInput: CreateExpenseSheetInput) {
    return this.expenseSheetsService.create(createExpenseSheetInput);
  }

  @Query(() => [ExpenseSheet], { name: 'expenseSheets' })
  findAll() {
    return this.expenseSheetsService.findAll();
  }

  @Query(() => ExpenseSheet, { name: 'expenseSheet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.expenseSheetsService.findOne(id);
  }

  @Mutation(() => ExpenseSheet)
  updateExpenseSheet(@Args('updateExpenseSheetInput') updateExpenseSheetInput: UpdateExpenseSheetInput) {
    return this.expenseSheetsService.update(updateExpenseSheetInput.id, updateExpenseSheetInput);
  }

  @Mutation(() => ExpenseSheet)
  removeExpenseSheet(@Args('id', { type: () => Int }) id: number) {
    return this.expenseSheetsService.remove(id);
  }
}
