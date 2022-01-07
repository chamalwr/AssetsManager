import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseSheetInput } from './dto/create-expense-sheet.input';
import { UpdateExpenseSheetInput } from './dto/update-expense-sheet.input';
import { ExpenseSheet, ExpenseSheetDocument } from './entities/expense-sheet.entity';

@Injectable()
export class ExpenseSheetsService {
  private readonly logger = new Logger(ExpenseSheetsService.name);
  constructor(@InjectModel(ExpenseSheet.name) private readonly expenseSheetModel: Model<ExpenseSheetDocument>){}
  
  async create(createExpenseSheetInput: CreateExpenseSheetInput) {
    return await this.expenseSheetModel.create(createExpenseSheetInput);
  }

  findAll() {
    return `This action returns all expenseSheets`;
  }

  findOne(id: string) {
    return `This action returns a #${id} expenseSheet`;
  }

  update(id: string, updateExpenseSheetInput: UpdateExpenseSheetInput) {
    return `This action updates a #${id} expenseSheet`;
  }

  remove(id: string) {
    return `This action removes a #${id} expenseSheet`;
  }
}
