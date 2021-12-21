import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategory } from './entities/expense-category.entity';
import { CreateExpenseCategoryInput } from './dto/create-expense-category.input';
import { UpdateExpenseCategoryInput } from './dto/update-expense-category.input';
import { ExpenseCategoryResult } from './union/expense-category-results.union';

@Resolver(() => ExpenseCategory)
export class ExpenseCategoriesResolver {
  constructor(
    private readonly expenseCategoriesService: ExpenseCategoriesService,
  ) {}

  @Mutation(() => ExpenseCategoryResult)
  createExpenseCategory(
    @Args('createExpenseCategoryInput')
    createExpenseCategoryInput: CreateExpenseCategoryInput,
  ) {
    return this.expenseCategoriesService.create(createExpenseCategoryInput);
  }

  @Query(() => [ExpenseCategoryResult], { name: 'expenseCategories' })
  findAll(@Args('userId') userId: string) {
    return this.expenseCategoriesService.findAll(userId);
  }

  @Query(() => ExpenseCategoryResult, { name: 'expenseCategory' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.expenseCategoriesService.findOne(id);
  }

  @Mutation(() => ExpenseCategoryResult)
  updateExpenseCategory(
    @Args('id') id: string,
    @Args('updateExpenseCategoryInput')
    updateExpenseCategoryInput: UpdateExpenseCategoryInput,
  ) {
    return this.expenseCategoriesService.update(id, updateExpenseCategoryInput);
  }

  @Mutation(() => ExpenseCategoryResult)
  removeExpenseCategory(@Args('id') id: string) {
    return this.expenseCategoriesService.remove(id);
  }
}
