import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategory } from './entities/expense-category.entity';
import { CreateExpenseCategoryInput } from './dto/create-expense-category.input';
import { UpdateExpenseCategoryInput } from './dto/update-expense-category.input';

@Resolver(() => ExpenseCategory)
export class ExpenseCategoriesResolver {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Mutation(() => ExpenseCategory)
  createExpenseCategory(@Args('createExpenseCategoryInput') createExpenseCategoryInput: CreateExpenseCategoryInput) {
    return this.expenseCategoriesService.create(createExpenseCategoryInput);
  }

  @Query(() => [ExpenseCategory], { name: 'expenseCategories' })
  findAll() {
    return this.expenseCategoriesService.findAll();
  }

  @Query(() => ExpenseCategory, { name: 'expenseCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.expenseCategoriesService.findOne(id);
  }

  @Mutation(() => ExpenseCategory)
  updateExpenseCategory(@Args('updateExpenseCategoryInput') updateExpenseCategoryInput: UpdateExpenseCategoryInput) {
    return this.expenseCategoriesService.update(updateExpenseCategoryInput.id, updateExpenseCategoryInput);
  }

  @Mutation(() => ExpenseCategory)
  removeExpenseCategory(@Args('id', { type: () => Int }) id: number) {
    return this.expenseCategoriesService.remove(id);
  }
}
