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

  async create(createExpenseCategoryInput: CreateExpenseCategoryInput) {
    try {
      const createdExpenseCategory = await this.expenseCategoryModel.create(
        createExpenseCategoryInput,
      );
      if (createdExpenseCategory) {
        return createdExpenseCategory.save();
      }
      this.logger.warn(`Cannot Create Category ${createdExpenseCategory}`);
      return {
        operation: 'CREATE',
        message: 'Could Not Create Expense Category',
        reason: `Could Not Create Expense Category`,
      };
    } catch (error) {
      this.logger.error(`Create : ${error}`);
      return {
        operation: 'CREATE',
        message: 'Could Not Create Expense Category',
        reason: error.message,
      };
    }
  }

  async findAll(userId: string) {
    try {
      const isRecordExists = await this.expenseCategoryModel.exists({
        userId: userId,
      });
      if (isRecordExists) {
        return await this.expenseCategoryModel.find({ userId: userId });
      } else {
        this.logger.warn(`User ID ${userId} has no Expense Categories`);
        return [
          {
            operation: 'FIND_ALL',
            message: 'Selected user id has no any expense categories',
            reason: `User ID ${userId} has no expense categories`,
          },
        ];
      }
    } catch (error) {
      this.logger.error(`Find All : ${error}`);
      return [
        {
          operation: 'FIND_ALL',
          message: 'Could not find any categories',
          reason: error.message,
        },
      ];
    }
  }

  async findOne(id: string) {
    try {
      const isRecordExists = await this.expenseCategoryModel.exists({
        _id: id,
      });
      if (isRecordExists) {
        return await this.expenseCategoryModel.findById(id);
      } else {
        this.logger.warn(`No category found on ID: ${id}`);
        return {
          operation: 'FIND_BY_ID',
          message: 'No any expenses category found on given ID',
          reason: `ID ${id} has no Categories`,
        };
      }
    } catch (error) {
      this.logger.error(`Find By Id : ${error}`);
      return {
        operation: 'FIND_BY_ID',
        message: 'Error on finding Expense Category',
        reason: error.message,
      };
    }
  }

  async update(
    id: string,
    updateExpenseCategoryInput: UpdateExpenseCategoryInput,
  ) {
    try {
      const isRecordExists = await this.expenseCategoryModel.exists({
        _id: id,
      });
      if (isRecordExists) {
        this.logger.log(`Expense category updated on ID: ${id}`);
        return await this.expenseCategoryModel.findByIdAndUpdate(
          id,
          updateExpenseCategoryInput,
          { returnOriginal: false },
        );
      } else {
        this.logger.warn(
          `Update Failed, No expense category found on ID: ${id}`,
        );
        return {
          operation: 'UPDATE',
          message: 'Update Failed',
          reason: `Update Failed, No expense category found on ID: ${id}`,
        };
      }
    } catch (error) {
      this.logger.error(`Update : ${error}`);
      return {
        operation: 'UPDATE',
        message: 'Update Failed',
        reason: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      const isRecordExists = await this.expenseCategoryModel.exists({
        _id: id,
      });
      if (isRecordExists) {
        this.logger.log(`Expense category deleted on ID ${id}`);
        return await this.expenseCategoryModel.findByIdAndDelete(id);
      } else {
        this.logger.warn(`Delete Failed, No Category found on ID: ${id}`);
        return {
          operation: 'DELETE',
          message: 'Could not delete expense category on given ID',
          reason: `Delete Failed, No expense category found on ID: ${id}`,
        };
      }
    } catch (error) {
      this.logger.error(`Remove : ${error}`);
      return {
        operation: 'DELETE',
        message: 'Could not delete selected expense category',
        reason: error.message,
      };
    }
  }
}
