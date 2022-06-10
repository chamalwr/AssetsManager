import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomeSheetUtil } from 'src/util/income-sheet.util';
import { CreateIncomeSheetInput } from './dto/create-income-sheet.input';
import { UpdateIncomeSheetInput } from './dto/update-income-sheet.input';
import {
  IncomeSheet,
  IncomeSheetDocument,
} from './entities/income-sheet.entity';

@Injectable()
export class IncomeSheetsService {
  private readonly logger = new Logger(IncomeSheetsService.name);
  constructor(
    @InjectModel(IncomeSheet.name)
    private readonly incomeSheetModel: Model<IncomeSheetDocument>,
  ) {}

  async create(createIncomeSheetInput: CreateIncomeSheetInput) {
    try {
      const isIncomeSheetExsists = await this.incomeSheetModel.findOne({
        $and: [
          { userId: createIncomeSheetInput.userId },
          { month: createIncomeSheetInput.month },
        ],
      });
      if (!isIncomeSheetExsists) {
        const createdIncomeSheet = await this.incomeSheetModel.create(
          createIncomeSheetInput,
        );
        if (createIncomeSheetInput) {
          createdIncomeSheet.totalAmount = IncomeSheetUtil.calculateTotalIncome(
            createdIncomeSheet.incomeRecords,
          );
          createdIncomeSheet.save();
          return createdIncomeSheet.populate('incomeRecords.incomeCategory');
        }
        this.logger.warn(
          `Unable to create income sheet : ${createIncomeSheetInput}`,
        );
        return {
          operation: 'CREATE',
          message: 'Could not create income sheet',
          reason: `Unable to create income sheet : ${createIncomeSheetInput}`,
        };
      }
      this.logger.warn(
        `Selected user already has an Income Sheet for ${createIncomeSheetInput.month}th month`,
      );
      return {
        operation: 'CREATE',
        message: 'Could not create income sheet',
        reason: `Selected user already has an Income Sheet for ${createIncomeSheetInput.month}th month, Cannot Create Duplicate Income Sheets`,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        operation: 'CREATE',
        message: 'Could not create income sheet!',
        reason: error.message,
      };
    }
  }

  async findAll(userId: string) {
    try {
      const isIncomeSheetsExsist = await this.incomeSheetModel.exists({
        userId: userId,
      });
      if (isIncomeSheetsExsist) {
        return await this.incomeSheetModel
          .find({ userId: userId })
          .populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`No Income Sheets found for user id ${userId}`);
      return [
        {
          operation: 'FIND_ALL',
          message: 'No Income Sheets Available!',
          reason: `Could not found any income sheets for User ID : ${userId}`,
        },
      ];
    } catch (error) {
      this.logger.error(error.message);
      return [
        {
          operation: 'FIND_ALL',
          message: 'There are no income sheets!',
          reason: error.message,
        },
      ];
    }
  }

  async findOne(id: string) {
    try {
      const isIncomeSheetExsists = await this.incomeSheetModel.exists({
        _id: id,
      });
      if (isIncomeSheetExsists) {
        return await this.incomeSheetModel
          .findById(id)
          .populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`No income sheet found on ID ${id}`);
      return {
        operation: 'FIND_BY_ID',
        message: 'No Income Sheet Available!',
        reason: `No income sheet found on ID ${id}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'FIND_BY_ID',
        message: 'No Income Sheet Available!',
        reason: error.message,
      };
    }
  }

  async findByYear(userId: string, year: number) {
    try {
      const incomeSheets = await this.incomeSheetModel
        .find({
          $and: [{ userId: userId }, { year: year }],
        })
        .populate('incomeRecords.incomeCategory');
      if (incomeSheets.length > 0) {
        return incomeSheets;
      }
      this.logger.warn(
        `User ID : ${userId} or Year of : ${year} has no any income sheets available`,
      );
      return [
        {
          operation: 'FIND_BY_YEAR',
          message: 'No Income Sheets Available',
          reason: `User ID : ${userId} or Year of : ${year} has no any income sheets available`,
        },
      ];
    } catch (error) {
      this.logger.error(error);
      return [
        {
          operation: 'FIND_BY_YEAR',
          message: 'No Income Sheets Available!',
          reason: error.message,
        },
      ];
    }
  }

  async findByMonthAndYear(userId: string, month: number, year: number) {
    try {
      const incomeSheet = await this.incomeSheetModel.findOne({
        $and: [{ userId: userId }, { month: month }, { year: year }],
      });
      if (incomeSheet) {
        return incomeSheet.populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(
        `User ID : ${userId} , Month: ${month}, Year: ${year} has no any income sheets available`,
      );
      return {
        operation: 'FIND_BY_MONTH_AND_YEAR',
        message: 'No Income Sheet Available',
        reason: `User ID : ${userId} , Month: ${month}, Year: ${year} has no any income sheets available`,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        operation: 'FIND_BY_MONTH_AND_YEAR',
        message: 'No Income Sheet Available!',
        reason: error.message,
      };
    }
  }

  async update(id: string, updateIncomeSheetInput: UpdateIncomeSheetInput) {
    try {
      const isSheetExsists = await this.incomeSheetModel.exists({ _id: id });
      if (isSheetExsists) {
        const updatedSheetRecord =
          await this.incomeSheetModel.findByIdAndUpdate(
            id,
            updateIncomeSheetInput,
            { returnOriginal: false },
          );
        return updatedSheetRecord.populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`Update failed, No income sheet found on ID ${id}`);
      return {
        operation: 'UPDATE',
        message: 'Could Not Update Income Sheet',
        reason: `Update failed, No Income Sheet found on ID ${id}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'UPDATE',
        message: 'Could Not Update Income Sheet',
        reason: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      const isSheetExsists = await this.incomeSheetModel.exists({ _id: id });
      if (isSheetExsists) {
        return await this.incomeSheetModel
          .findByIdAndDelete(id)
          .populate('incomeRecords.incomeCategory');
      }
      this.logger.warn(`Delete failed, No income sheet found on ID ${id}`);
      return {
        operation: 'REMOVE',
        message: 'Could Not Remove Income Sheet',
        reason: `Delete failed, No Income Sheet found on ID ${id}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        operation: 'REMOVE',
        message: 'Could Not Remove Income Sheet',
        reason: error.message,
      };
    }
  }
}
