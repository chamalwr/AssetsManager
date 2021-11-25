import { Injectable } from '@nestjs/common';
import { CreateExpenseCategoryInput } from './dto/create-expense-category.input';
import { UpdateExpenseCategoryInput } from './dto/update-expense-category.input';

@Injectable()
export class ExpenseCategoriesService {
  create(createExpenseCategoryInput: CreateExpenseCategoryInput) {
    return 'This action adds a new expenseCategory';
  }

  findAll() {
    return `This action returns all expenseCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseCategory`;
  }

  update(id: number, updateExpenseCategoryInput: UpdateExpenseCategoryInput) {
    return `This action updates a #${id} expenseCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCategory`;
  }
}
