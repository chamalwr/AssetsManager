import { ExpenseRecord } from 'src/expense-sheets/entities/expense-record.entity';

export class ExpenseSheetUtil {
  public static calculateTotalExpenses(
    expenseRecords: ExpenseRecord[],
  ): number {
    let totalAmount = 0.0;
    if (expenseRecords) {
      for (const expenseRecord of expenseRecords) {
        totalAmount += expenseRecord.amount;
      }
    }
    return totalAmount;
  }
}
