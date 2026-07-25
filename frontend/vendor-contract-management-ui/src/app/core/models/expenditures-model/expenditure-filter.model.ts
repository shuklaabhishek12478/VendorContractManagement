import { CostCenter } from "./expenditure-enum/cost-center.enum";
import { Department } from "./expenditure-enum/department.enum";
import { ExpenditureStatus } from "./expenditure-enum/expenditure-status.enum";
import { ExpenseCategory } from "./expenditure-enum/expense-category.enum";
import { ExpenseType } from "./expenditure-enum/expense-type.enum";
import { PaymentStatus } from "./expenditure-enum/payment-status.enum";

export interface ExpenditureFilter {

  keyword?: string;

  vendorId?: number;

  contractId?: number;

  department?: Department;

  costCenter?: CostCenter;

  category?: ExpenseCategory;

  expenseType?: ExpenseType;

  paymentStatus?: PaymentStatus;

  status?: ExpenditureStatus;

  fromDate?: string;

  toDate?: string;

  minAmount?: number;

  maxAmount?: number;

  page: number;

  pageSize: number;

  sortBy: string;

  descending: boolean;

}