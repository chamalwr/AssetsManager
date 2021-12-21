import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncomeCategoriesService } from './income-categories.service';
import { IncomeCategory } from './entities/income-category.entity';
import { CreateIncomeCategoryInput } from './dto/create-income-category.input';
import { UpdateIncomeCategoryInput } from './dto/update-income-category.input';
import { IncomeCategoryResult } from './union/income-category-result.union';

@Resolver(() => IncomeCategory)
export class IncomeCategoriesResolver {
  constructor(
    private readonly incomeCategoriesService: IncomeCategoriesService,
  ) {}

  @Mutation(() => IncomeCategoryResult)
  createIncomeCategory(
    @Args('createIncomeCategoryInput')
    createIncomeCategoryInput: CreateIncomeCategoryInput,
  ) {
    return this.incomeCategoriesService.create(createIncomeCategoryInput);
  }

  @Query(() => [IncomeCategoryResult], { name: 'incomeCategories' })
  findAll(@Args('userId') userId: string) {
    return this.incomeCategoriesService.findAll(userId);
  }

  @Query(() => IncomeCategoryResult, { name: 'incomeCategory' })
  findOne(@Args('id') id: string) {
    return this.incomeCategoriesService.findOne(id);
  }

  @Mutation(() => IncomeCategoryResult)
  updateIncomeCategory(
    @Args('id') id: string,
    @Args('updateIncomeCategoryInput')
    updateIncomeCategoryInput: UpdateIncomeCategoryInput,
  ) {
    return this.incomeCategoriesService.update(id, updateIncomeCategoryInput);
  }

  @Mutation(() => IncomeCategoryResult)
  removeIncomeCategory(@Args('id') id: string) {
    return this.incomeCategoriesService.remove(id);
  }
}
