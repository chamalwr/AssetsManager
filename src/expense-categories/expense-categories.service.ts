import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseCategoryInput } from './dto/create-expense-category.input';
import { UpdateExpenseCategoryInput } from './dto/update-expense-category.input';
import {
  ExpenseCategory,
  ExpenseCategoryDocument,
} from './entities/expense-category.entity';

@Injectable()
export class ExpenseCategoriesService {
  private readonly logger = new Logger(ExpenseCategoriesService.name);
  constructor(
    @InjectModel(ExpenseCategory.name)
    private readonly expenseCategoryModel: Model<ExpenseCategoryDocument>,
  ) {}

  create(createExpenseCategoryInput: CreateExpenseCategoryInput) {
    return 'This action adds a new expenseCategory';
  }

  findAll(userId: string) {
    return `This action returns all expenseCategories`;
  }

  findOne(id: string) {
    return `This action returns a #${id} expenseCategory`;
  }

  update(id: string, updateExpenseCategoryInput: UpdateExpenseCategoryInput) {
    return `This action updates a #${id} expenseCategory`;
  }

  remove(id: string) {
    return `This action removes a #${id} expenseCategory`;
  }
}
