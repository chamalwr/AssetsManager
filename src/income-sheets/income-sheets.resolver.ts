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

  @Query(() => IncomeSheetResult, { name: 'incomeSheetByMonthAndYear' })
  getIncomeSheetByMonthAndYear(
    @Args('userId') userId: string,
    @Args('month') month: number,
    @Args('year') year: number,
  ) {
    return this.incomeSheetsService.findByMonthAndYear(userId, month, year);
  }

  @Query(() => [IncomeSheetResult], { name: 'incomeSheetsByYear' })
  getIncomeSheetByYear(
    @Args('userId') userId: string,
    @Args('year') year: number,
  ) {
    return this.incomeSheetsService.findByYear(userId, year);
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
