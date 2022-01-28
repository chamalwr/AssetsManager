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
    try {
      const createdExpenseSheet = await this.expenseSheetModel.create(createExpenseSheetInput);
      if(createdExpenseSheet){
        return createdExpenseSheet.save();
      }
    }catch(error){
      this.logger.error(error);
      return {
        operation: 'CREATE',
        message: 'Could not create expense Sheet!',
        reason: error.message,
      };
    }
  }

  async findAll(userId: string) {
    try {
      const isRecordsExists = await this.expenseSheetModel.exists({'userId' : userId});
      if(isRecordsExists){
        return this.expenseSheetModel.find({'userId' : userId}).populate('expenseRecords.expenseCategory');
      }else{
        this.logger.warn(`No Expense Sheets found for user id ${userId}`);
        return [{
          operation: 'FIND_ALL',
          message: 'No Expense Sheets Available!',
          reason: `Could not found any expense sheets on User ID : ${userId}`,
        }];
      }
    }catch(error){
      this.logger.error(error);
      return {
        operation: 'FIND_ALL',
        message: 'No Expense Sheets Available!',
        reason: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const isRecordsExists = await this.expenseSheetModel.exists({ '_id' : id });
      if(isRecordsExists){
        return await this.expenseSheetModel.findById(id).populate('expenseRecords.expenseCategory');
      }
      this.logger.warn(`No expense Sheets found on ID ${id}`);
      return {
        operation: 'FIND_ALL',
        message: 'No Expense Sheet Available!',
        reason: `No expense sheet found on ID : ${id}`,
      };
    }catch(error){
      this.logger.error(error);
      return {
        operation: 'FIND_BY_ID',
        message: 'No Expense Sheet Available!',
        reason: error.message,
      };
    }
  }

  async update(id: string, updateExpenseSheetInput: UpdateExpenseSheetInput) {
    try {
      const isRecordsExists = await this.expenseSheetModel.exists({ '_id' : id });
      if(isRecordsExists){
        return await this.expenseSheetModel.findByIdAndUpdate(
          id,
          updateExpenseSheetInput,
          { returnOriginal: false },
        );
      }
      this.logger.warn(`Update failed, No expense Sheets found on ID ${id}`);
      return {
        operation: 'UPDATE',
        message: 'Could Not Update Expense Sheet',
        reason: `Update failed, No expense Sheets found on ID ${id}`,
      };
    }catch(error){
      this.logger.error(error);
      return {
        operation: 'UPDATE',
        message: 'Could Not Update Expense Sheet',
        reason: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      const isRecordsExists = await this.expenseSheetModel.exists({ '_id' : id });
      if(isRecordsExists){
        this.logger.log(`Income Sheet ID ${id}. is deleted`);
        return await this.expenseSheetModel.findByIdAndDelete(id);
      }
      this.logger.warn(`Delete failed, No expense Sheets found on ID ${id}`);
      return {
        operation: 'REMOVE',
        message: 'Could Not Update Expense Sheet',
        reason: `Delete failed, No expense Sheets found on ID ${id}`,
      };
    }catch(error){
      this.logger.error(error);
      return {
        operation: 'REMOVE',
        message: 'Could Not Remove Expense Sheet',
        reason: error.message,
      };
    }
  }
}
