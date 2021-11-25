import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(IncomeCategoriesService.name);
  constructor(
    @InjectModel(IncomeCategory.name)
    private readonly incomeCategoryModel: Model<IncomeCategoryDocument>,
  ) {}

  async create(createIncomeCategoryInput: CreateIncomeCategoryInput) {
    const createdIncomeCategory = await this.incomeCategoryModel.create(
      createIncomeCategoryInput,
    );
    if(createdIncomeCategory){
      return createdIncomeCategory.save();
    }
    this.logger.warn(`Cannot Create Category ${createIncomeCategoryInput}`);
  }

  async findAll(userId: string) {
    const isRecordExists = await this.incomeCategoryModel.exists({ userId: userId });
    if (isRecordExists) {
      return await this.incomeCategoryModel.find({ userId: userId });
    } else {
      this.logger.warn(`User ID ${userId} has no Categories`);
    }
  }

  async findOne(id: string) {
    const isRecordExists = await this.incomeCategoryModel.exists({ _id: id });
    if (isRecordExists) {
      return await this.incomeCategoryModel.findById(id);
    } else {
      this.logger.warn(`No Category found on ID: ${id}`);
    }
  }

  async update(
    id: string,
    updateIncomeCategoryInput: UpdateIncomeCategoryInput,
  ) {
    const isRecordExists = await this.incomeCategoryModel.exists({ _id: id });
    if (isRecordExists) {
      this.logger.log(`Category Updated on ID: ${id}`);
      return await this.incomeCategoryModel.findByIdAndUpdate(
        id,
        updateIncomeCategoryInput,
        { returnOriginal: false },
      );
    } else {
      this.logger.warn(`Update Failed, No Category found on ID: ${id}`);
    }
  }

  async remove(id: string) {
    const isRecordExists = await this.incomeCategoryModel.exists({ _id: id });
    if (isRecordExists) {
      this.logger.log(`Category Deleted on ID ${id}`);
      return await this.incomeCategoryModel.findByIdAndDelete(id);
    } else {
      this.logger.warn(`Delete Failed, No Category found on ID: ${id}`);
    }
  }
}
