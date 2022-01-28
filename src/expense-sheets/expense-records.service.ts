import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateExpenseRecordInput } from "./dto/create-expense-record.input";
import { UpdateExpenseRecordInput } from "./dto/update-expense-record.input";
import { ExpenseSheet, ExpenseSheetDocument } from "./entities/expense-sheet.entity";
import * as mongoose from 'mongoose';
import { ExpenseRecord, ExpenseRecordDocument } from "./entities/expense-record.entity";


@Injectable()
export class ExpenseRecordService {
    private readonly logger = new Logger(ExpenseRecordService.name);
    constructor(@InjectModel(ExpenseSheet.name) private readonly expenseSheetModel: Model<ExpenseSheetDocument>,
                @InjectModel(ExpenseRecord.name) private readonly expenseRecordModel: Model<ExpenseRecordDocument>){}

    async create(expenseSheetId: string, createExpenseRecordInput: CreateExpenseRecordInput){
        try {
            const expenseSheet = await this.expenseSheetModel.findById(expenseSheetId);
            if(expenseSheet){
                const newExpenseRecord = new this.expenseRecordModel(createExpenseRecordInput);
                expenseSheet.expenseRecords.push(newExpenseRecord);
                await expenseSheet.save();
                return newExpenseRecord.populate('expenseCategory');
            }
            this.logger.warn(`Cannot find expense records since there is no expense sheet on ID : ${expenseSheetId}`);
        }catch(error){
            this.logger.error(error.message);
        }
    }

    async findAll(expenseSheetId: string){
        const isExpenseSheetExists = await this.expenseSheetModel.exists({ '_id' : expenseSheetId});
        if(isExpenseSheetExists){
            const expenseSheet = await this.expenseSheetModel.findById(expenseSheetId).populate('expenseRecords.expenseCategory');
            if(expenseSheet){
                return expenseSheet.expenseRecords;
            }
            this.logger.warn(`No expense records available on this expense sheet`);
        }
        this.logger.warn(`Cannot find expense records since there are none on Expense Sheet on ID : ${expenseSheetId}`);
    }

    async findOne(expenseSheetId: string, id: string){
       try {
            const expenseSheet = await this.expenseSheetModel.findById(expenseSheetId).populate('expenseRecords.expenseCategory');
            if(expenseSheet){
                const expenseRecord = expenseSheet.expenseRecords.find(record => new mongoose.Types.ObjectId(id).equals(record._id));
                if(expenseRecord){
                    return expenseRecord;
                }
                this.logger.warn(`Expense record not found on ID : ${id}`);
            }
            this.logger.warn(`Cannot find expense record since there is none on Expense Sheet on ID : ${expenseSheetId}`);
       }catch(error){
           this.logger.error(error.message);
       }
    }

    async update(expenseSheetId: string,  id: string, updateExpenseRecordInput: UpdateExpenseRecordInput){
        try{
            const expenseSheet = await this.expenseSheetModel.findById(expenseSheetId);
            if(expenseSheet){
                const expenseRecord = await this.expenseSheetModel.findOne({ 'expenseRecords._id': id })
                if(expenseRecord){
                    const updatedSheetRecord = await this.expenseSheetModel.findOneAndUpdate(
                        { 'expenseRecords._id': id }, 
                        { '$set': {'expenseRecords.$' : updateExpenseRecordInput} }, 
                        { new: true, upsert: false }
                    );
                  return updatedSheetRecord.populate('expenseRecords.expenseCategory');
                }
                this.logger.warn(`Expense Record does not exists`);
            }
            this.logger.warn(`Cannot find expense record since there is none on Expense Sheet on ID : ${expenseSheetId}`);
        }catch(error){
            this.logger.error(error.message);
        }
    }

    async remove(expenseSheetId: string, id: string){
       try {
            const isExpenseSheetExists = await this.expenseSheetModel.exists({ '_id' : expenseSheetId});
            if(isExpenseSheetExists){
                const expenseRecord = await this.expenseSheetModel.findOne({ 'expenseRecords._id': id })
                if(expenseRecord){
                    const deletedRecord = await this.expenseSheetModel.findOneAndUpdate(
                        {'_id': expenseSheetId}, 
                        {'$pull': {'expenseRecords' : { '_id': id }}},
                        { new: true }
                    );
                   
                    if(deletedRecord){
                        return deletedRecord.populate('expenseRecords.expenseCategory');
                    }
                    this.logger.warn(`Cannot Delete, Error Occured`)
                }
                this.logger.warn(`Expense Record does not exists`);
            }
            this.logger.warn(`Expense Sheet Does not exists`);
       }catch(error){
           this.logger.error(error.message);
       }
    }
}