import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeSheetInput } from './dto/create-income-sheet.input';
import { UpdateIncomeSheetInput } from './dto/update-income-sheet.input';
import { IncomeSheet, IncomeSheetDocument } from './entities/income-sheet.entity';

@Injectable()
export class IncomeSheetsService {
  private readonly logger = new Logger(IncomeSheetsService.name);
  constructor(@InjectModel(IncomeSheet.name) private readonly incomeSheetModel: Model<IncomeSheetDocument>){}
  
  async create(createIncomeSheetInput: CreateIncomeSheetInput) {
    try {
      const createdIncomeSheet =  await this.incomeSheetModel.create(createIncomeSheetInput);
      createdIncomeSheet.save();
      if(createIncomeSheetInput){
        return createdIncomeSheet.populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`Unable to create expense sheet : ${createIncomeSheetInput}`);
    }catch(error){
      this.logger.error(error.message);
    }
  }

  async findAll(userId: string) {
    try {
      const isIncomeSheetsExsist = await this.incomeSheetModel.exists({ 'userId': userId });
      if(isIncomeSheetsExsist){
        return await this.incomeSheetModel.find({ 'userId': userId }).populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`No Income Sheets found for user id ${userId}`);
    }catch(error){
      this.logger.error(error.message);
    }
  }

  async findOne(id: string) {
   try{
      const isIncomeSheetExsists = await this.incomeSheetModel.exists({ '_id': id });
      if(isIncomeSheetExsists){
        return await this.incomeSheetModel.findById(id).populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`No income sheet found on ID ${id}`);
      return null;
   }catch(error){
     this.logger.error(error.message);
   }
  }

  async update(id: string, updateIncomeSheetInput: UpdateIncomeSheetInput) {
    try {
      const isSheetExsists = await this.incomeSheetModel.exists({ '_id' : id});
      if(isSheetExsists){
        const updatedSheetRecord = await this.incomeSheetModel.findByIdAndUpdate(id, updateIncomeSheetInput, { returnOriginal: false});
        return updatedSheetRecord.populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`Update failed, No income sheet found on ID ${id}`);
      return null;
    }catch(error){
      this.logger.error(error.message);
    }
  }

  async remove(id: string) {
    try {
      const isSheetExsists = await this.incomeSheetModel.exists({ '_id' : id});
      if(isSheetExsists){
        return await this.incomeSheetModel.findByIdAndDelete(id).populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`Delete failed, No income sheet found on ID ${id}`);
      return null;
    }catch(error){
      this.logger.error(error.message);
    }
  }
}
