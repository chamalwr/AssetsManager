import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncomeSheetsService } from './income-sheets.service';
import { IncomeSheet } from './entities/income-sheet.entity';
import { CreateIncomeSheetInput } from './dto/create-income-sheet.input';
import { UpdateIncomeSheetInput } from './dto/update-income-sheet.input';
import { IncomeSheetResult } from './union/income-sheets-results.union';

@Resolver(() => IncomeSheet)
export class IncomeSheetsResolver {
  constructor(private readonly incomeSheetsService: IncomeSheetsService) {}

  @Mutation(() => IncomeSheetResult)
  createIncomeSheet(
    @Args('createIncomeSheetInput')
    createIncomeSheetInput: CreateIncomeSheetInput,
  ) {
    return this.incomeSheetsService.create(createIncomeSheetInput);
  }

  @Query(() => [IncomeSheetResult], { name: 'incomeSheets' })
  findAll(@Args('userId') userId: string) {
    return this.incomeSheetsService.findAll(userId);
  }

  @Query(() => IncomeSheetResult, { name: 'incomeSheet' })
  findOne(@Args('id') id: string) {
    return this.incomeSheetsService.findOne(id);
  }

  @Mutation(() => IncomeSheetResult)
  updateIncomeSheet(
    @Args('id') id: string,
    @Args('updateIncomeSheetInput')
    updateIncomeSheetInput: UpdateIncomeSheetInput,
  ) {
    return this.incomeSheetsService.update(id, updateIncomeSheetInput);
  }

  @Mutation(() => IncomeSheetResult)
  removeIncomeSheet(@Args('id') id: string) {
    return this.incomeSheetsService.remove(id);
  }
}
