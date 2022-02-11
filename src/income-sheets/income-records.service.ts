import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeRecordInput } from './dto/create-income-record.input';
import { UpdateIncomeRecordInput } from './dto/update-income-record.input';
import {
  IncomeRecord,
  IncomeRecordDocument,
} from './entities/income-record.entity';
import {
  IncomeSheet,
  IncomeSheetDocument,
} from './entities/income-sheet.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class IncomeRecordService {
  private readonly logger = new Logger(IncomeRecordService.name);
  constructor(
    @InjectModel(IncomeRecord.name)
    private readonly incomeRecordModel: Model<IncomeRecordDocument>,
    @InjectModel(IncomeSheet.name)
    private readonly incomeSheetModel: Model<IncomeSheetDocument>,
  ) {}

  async create(
    incomeSheetId: string,
    createIncomeRecordInput: CreateIncomeRecordInput,
  ) {
    try {
      const incomeSheet = await this.incomeSheetModel.findById(incomeSheetId);
      if (incomeSheet) {
        const incomeRecord = new this.incomeRecordModel(
          createIncomeRecordInput,
        );
        incomeSheet.incomeRecords.push(incomeRecord);
        incomeSheet.totalAmount += incomeRecord.amount;
        await incomeSheet.save();
        return incomeSheet.populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`No Income Sheet Available on ID : ${incomeSheetId}`);
      return {
        operation: 'CREATE',
        message: 'Could not create income record!',
        reason: `Cannot create income records since there is no income sheet on ID : ${incomeSheetId}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'CREATE',
        message: 'Could not create income record!',
        reason: error.message,
      };
    }
  }

  async findAll(incomeSheetId: string) {
    try {
      const isIncomeSheetsExsists = await this.incomeSheetModel.exists({
        _id: incomeSheetId,
      });
      if (isIncomeSheetsExsists) {
        const incomeSheet = await this.incomeSheetModel
          .findById(incomeSheetId)
          .populate('incomeRecords.incomeCategory');
        if (incomeSheet.incomeRecords) {
          return incomeSheet.incomeRecords;
        }
        this.logger.warn(
          `No Income Records available on selected Income Sheet`,
        );
      }
      this.logger.warn(`No income sheet available on ID ${incomeSheetId}`);
    } catch (error) {
      this.logger.error(error.message);
      return [
        {
          operation: 'FIND_ALL',
          message: 'Cannot get Income Records',
          reason: error.message,
        },
      ];
    }
  }

  async findOne(incomeSheetId: string, id: string) {
    try {
      const incomeSheet = await this.incomeSheetModel
        .findById(incomeSheetId)
        .populate('incomeRecords.incomeCategory');
      if (incomeSheet) {
        const incomeRecord = incomeSheet.incomeRecords.find((record) =>
          new mongoose.Types.ObjectId(id).equals(record._id),
        );
        if (incomeRecord) {
          return incomeRecord;
        }
        this.logger.warn(`No income record found on ID : ${id}`);
        return {
          operation: 'FIND_BY_ID',
          message: 'Income record could not be found!',
          reason: `No income record found on ID : ${id}`,
        };
      }
      this.logger.warn(
        `Cannot find income record, There is none on Income Sheet ID : ${incomeSheetId}`,
      );
      return {
        operation: 'FIND_BY_ID',
        message: 'Income record could not be found!',
        reason: `Cannot find income record, There is no Income Sheet available ID : ${incomeSheetId}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'FIND_BY_ID',
        message: 'Could not create income record!',
        reason: error.message,
      };
    }
  }

  async update(
    incomeSheetId: string,
    id: string,
    updateIncomeRecordInput: UpdateIncomeRecordInput,
  ) {
    try {
      const incomeSheet = await this.incomeSheetModel.findById(incomeSheetId);
      if (incomeSheet) {
        const incomeRecord = await this.incomeSheetModel.findOne({
          'incomeRecords._id': id,
        });
        if (incomeRecord) {
          const selectedIncomeRecord: any = await this.findOne(
            incomeSheetId,
            id,
          );
          incomeSheet.totalAmount -= selectedIncomeRecord.amount;
          await incomeSheet.save();
          const updatedSheetRecord =
            await this.incomeSheetModel.findOneAndUpdate(
              { 'incomeRecords._id': id },
              { $set: { 'incomeRecords.$': updateIncomeRecordInput } },
              { new: true, upsert: false },
            );
          incomeSheet.totalAmount += updateIncomeRecordInput.amount;
          await incomeSheet.save();
          return updatedSheetRecord.populate('incomeRecords.incomeCategory');
        }
        this.logger.warn(
          `Update Failed, Income record is not found on ID ${id}`,
        );
        return {
          operation: 'UPDATE',
          message: 'Could not update income record!',
          reason: `Update Failed, Income record is not found on ID ${id}`,
        };
      }
      this.logger.warn(
        `Cannot find income record since there is none on Income Sheet on ID : ${incomeSheetId}`,
      );
      return {
        operation: 'UPDATE',
        message: 'Could not create income record!',
        reason: `Update Failed, Could not found Income Sheet on ID ${incomeSheetId}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'UPDATE',
        message: 'Could not update income record!',
        reason: error.message,
      };
    }
  }

  async remove(incomeSheetId: string, id: string) {
    try {
      const incomeSheet = await this.incomeSheetModel.findById({
        _id: incomeSheetId,
      });
      if (incomeSheet) {
        const incomeRecord = await this.incomeSheetModel.findOne({
          'incomeRecords._id': id,
        });
        if (incomeRecord) {
          const selectedIncomeRecord: any = await this.findOne(
            incomeSheetId,
            id,
          );
          incomeSheet.totalAmount -= selectedIncomeRecord.amount;
          const deletedRecord = await this.incomeSheetModel.findOneAndUpdate(
            { _id: incomeSheetId },
            { $pull: { incomeRecords: { _id: id } } },
            { new: true },
          );

          if (deletedRecord) {
            await incomeSheet.save();
            return incomeSheet.populate('incomeRecords.incomeCategory');
          }
          this.logger.warn(`Cannot Delete, Error Occured`);
          return {
            operation: 'DELETE',
            message: 'Could not remove income record!',
            reason: `Delete Failed on income record ID ${id}`,
          };
        }
        this.logger.warn(`Income Record does not exists on ID ${id}`);
        return {
          operation: 'DELETE',
          message: 'Could not remove income record!',
          reason: `Delete failed, Could not find income record on ID ${id}`,
        };
      }
      this.logger.warn(`Income Sheet Does not exists on ID ${incomeSheetId}`);
      return {
        operation: 'DELETE',
        message: 'Could not remove income record!',
        reason: `Delete Failed, Could not find income sheet on ID ${incomeSheetId}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'DELETE',
        message: 'Could not remove income record!',
        reason: error.message,
      };
    }
  }
}
