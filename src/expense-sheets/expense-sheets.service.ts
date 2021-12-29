import { Injectable } from '@nestjs/common';
import { CreateExpenseSheetInput } from './dto/create-expense-sheet.input';
import { UpdateExpenseSheetInput } from './dto/update-expense-sheet.input';

@Injectable()
export class ExpenseSheetsService {
  create(createExpenseSheetInput: CreateExpenseSheetInput) {
    return 'This action adds a new expenseSheet';
  }

  findAll() {
    return `This action returns all expenseSheets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseSheet`;
  }

  update(id: number, updateExpenseSheetInput: UpdateExpenseSheetInput) {
    return `This action updates a #${id} expenseSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseSheet`;
  }
}
