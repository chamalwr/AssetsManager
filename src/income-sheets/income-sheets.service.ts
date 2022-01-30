import { Injectable } from '@nestjs/common';
import { CreateIncomeSheetInput } from './dto/create-income-sheet.input';
import { UpdateIncomeSheetInput } from './dto/update-income-sheet.input';

@Injectable()
export class IncomeSheetsService {
  create(createIncomeSheetInput: CreateIncomeSheetInput) {
    return 'This action adds a new incomeSheet';
  }

  findAll() {
    return `This action returns all incomeSheets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incomeSheet`;
  }

  update(id: number, updateIncomeSheetInput: UpdateIncomeSheetInput) {
    return `This action updates a #${id} incomeSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomeSheet`;
  }
}
