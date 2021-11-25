import { Injectable } from '@nestjs/common';
import { CreateIncomeCategoryInput } from './dto/create-income-category.input';
import { UpdateIncomeCategoryInput } from './dto/update-income-category.input';

@Injectable()
export class IncomeCategoriesService {
  create(createIncomeCategoryInput: CreateIncomeCategoryInput) {
    return 'This action adds a new incomeCategory';
  }

  findAll() {
    return `This action returns all incomeCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incomeCategory`;
  }

  update(id: number, updateIncomeCategoryInput: UpdateIncomeCategoryInput) {
    return `This action updates a #${id} incomeCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomeCategory`;
  }
}
