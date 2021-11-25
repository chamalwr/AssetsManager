import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeCategoryInput } from './dto/create-income-category.input';
import { UpdateIncomeCategoryInput } from './dto/update-income-category.input';
import {
  IncomeCategory,
  IncomeCategoryDocument,
} from './entities/income-category.entity';

@Injectable()
export class IncomeCategoriesService {
  constructor(
    @InjectModel(IncomeCategory.name)
    private readonly incomeCategoryModel: Model<IncomeCategoryDocument>,
  ) {}

  async create(createIncomeCategoryInput: CreateIncomeCategoryInput) {
    const createdIncomeCategory = await this.incomeCategoryModel.create(
      createIncomeCategoryInput,
    );
    return createdIncomeCategory.save();
  }

  async findAll(userId: string) {
    return await this.incomeCategoryModel.find({'userId': userId});
  }

  async findOne(id: string) {
    return await this.incomeCategoryModel.findById(id);
  }

  async update(
    id: string,
    updateIncomeCategoryInput: UpdateIncomeCategoryInput,
  ) {
    return await this.incomeCategoryModel.findByIdAndUpdate(
      id,
      updateIncomeCategoryInput,
    );
  }

  async remove(id: string) {
    return await this.incomeCategoryModel.findByIdAndDelete(id)
  }
}
