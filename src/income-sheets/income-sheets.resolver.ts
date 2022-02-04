import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncomeSheetsService } from './income-sheets.service';
import { IncomeSheet } from './entities/income-sheet.entity';
import { CreateIncomeSheetInput } from './dto/create-income-sheet.input';
import { UpdateIncomeSheetInput } from './dto/update-income-sheet.input';

@Resolver(() => IncomeSheet)
export class IncomeSheetsResolver {
  constructor(private readonly incomeSheetsService: IncomeSheetsService) {}

  @Mutation(() => IncomeSheet)
  createIncomeSheet(
    @Args('createIncomeSheetInput')
    createIncomeSheetInput: CreateIncomeSheetInput,
  ) {
    return this.incomeSheetsService.create(createIncomeSheetInput);
  }

  @Query(() => [IncomeSheet], { name: 'incomeSheets' })
  findAll(@Args('userId') userId: string) {
    return this.incomeSheetsService.findAll(userId);
  }

  @Query(() => IncomeSheet, { name: 'incomeSheet' })
  findOne(@Args('id') id: string) {
    return this.incomeSheetsService.findOne(id);
  }

  @Mutation(() => IncomeSheet)
  updateIncomeSheet(
    @Args('id') id: string,
    @Args('updateIncomeSheetInput')
    updateIncomeSheetInput: UpdateIncomeSheetInput,
  ) {
    return this.incomeSheetsService.update(
      id,
      updateIncomeSheetInput,
    );
  }

  @Mutation(() => IncomeSheet)
  removeIncomeSheet(@Args('id') id: string) {
    return this.incomeSheetsService.remove(id);
  }
}
