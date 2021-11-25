import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncomeCategoriesService } from './income-categories.service';
import { IncomeCategory } from './entities/income-category.entity';
import { CreateIncomeCategoryInput } from './dto/create-income-category.input';
import { UpdateIncomeCategoryInput } from './dto/update-income-category.input';

@Resolver(() => IncomeCategory)
export class IncomeCategoriesResolver {
  constructor(
    private readonly incomeCategoriesService: IncomeCategoriesService,
  ) {}

  @Mutation(() => IncomeCategory)
  createIncomeCategory(
    @Args('createIncomeCategoryInput')
    createIncomeCategoryInput: CreateIncomeCategoryInput,
  ) {
    return this.incomeCategoriesService.create(createIncomeCategoryInput);
  }

  @Query(() => [IncomeCategory], { name: 'incomeCategories' })
  findAll() {
    return this.incomeCategoriesService.findAll();
  }

  @Query(() => IncomeCategory, { name: 'incomeCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.incomeCategoriesService.findOne(id);
  }

  @Mutation(() => IncomeCategory)
  updateIncomeCategory(
    @Args('updateIncomeCategoryInput')
    updateIncomeCategoryInput: UpdateIncomeCategoryInput,
  ) {
    return this.incomeCategoriesService.update(
      updateIncomeCategoryInput.id,
      updateIncomeCategoryInput,
    );
  }

  @Mutation(() => IncomeCategory)
  removeIncomeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.incomeCategoriesService.remove(id);
  }
}
