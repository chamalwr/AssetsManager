import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateIncomeRecordInput } from './dto/create-income-record.input';
import { UpdateIncomeRecordInput } from './dto/update-income-record.input';
import { IncomeRecord } from './entities/income-record.entity';
import { IncomeRecordService } from './income-records.service';
import { IncomeSheetResult } from './union/income-sheets-results.union';

@Resolver(() => IncomeRecord)
export class IncomeRecordResolver {
  constructor(private readonly incomeRecordService: IncomeRecordService) {}

  @Mutation(() => IncomeSheetResult)
  createIncomeRecord(
    @Args('incomeSheetId') incomeSheetId: string,
    @Args('createIncomeRecordInput')
    createIncomeRecordInput: CreateIncomeRecordInput,
  ) {
    return this.incomeRecordService.create(
      incomeSheetId,
      createIncomeRecordInput,
    );
  }

  @Query(() => [IncomeSheetResult], { name: 'incomeRecords' })
  findAll(@Args('incomeSheetId') incomeSheetId: string) {
    return this.incomeRecordService.findAll(incomeSheetId);
  }

  @Query(() => IncomeSheetResult, { name: 'incomeRecord' })
  findOne(
    @Args('incomeSheetId') incomeSheetId: string,
    @Args('id') id: string,
  ) {
    return this.incomeRecordService.findOne(incomeSheetId, id);
  }

  @Mutation(() => IncomeSheetResult)
  updateIncomeRecord(
    @Args('incomeSheetId') incomeSheetId: string,
    @Args('incomeRecordId') id: string,
    @Args('updateIncomeRecordInput')
    updateIncomeRecordInput: UpdateIncomeRecordInput,
  ) {
    return this.incomeRecordService.update(
      incomeSheetId,
      id,
      updateIncomeRecordInput,
    );
  }

  @Mutation(() => IncomeSheetResult)
  removeIncomeRecord(
    @Args('incomeSheetId') incomeSheetId: string,
    @Args('id') id: string,
  ) {
    return this.incomeRecordService.remove(incomeSheetId, id);
  }
}
