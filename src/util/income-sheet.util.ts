import { IncomeRecord } from 'src/income-sheets/entities/income-record.entity';

export class IncomeSheetUtil {
  public static calculateTotalIncome(incomeRecords: IncomeRecord[]): number {
    let totalAmount = 0.0;
    if (incomeRecords) {
      for (const incomeRecord of incomeRecords) {
        totalAmount += incomeRecord.amount;
      }
    }
    return totalAmount;
  }
}
