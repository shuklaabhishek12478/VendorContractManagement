import { Currency } from "../currency.enum";
import { PaymentMethod } from "../payment-method.enum";
import { CostCenter } from "./expenditure-enum/cost-center.enum";
import { Department } from "./expenditure-enum/department.enum";
import { ExpenseCategory } from "./expenditure-enum/expense-category.enum";
import { ExpenseType } from "./expenditure-enum/expense-type.enum";
import { PaymentStatus } from "./expenditure-enum/payment-status.enum";

export interface CreateExpenditure {

  title: string;

  vendorId: number;

  contractId?: number;

  department: Department;

  costCenter: CostCenter;

  category: ExpenseCategory;

  expenseType: ExpenseType;

  expenseDate: string;

  invoiceNumber: string;

  purchaseOrderNumber?: string;

  invoiceDate?: string;

  dueDate?: string;

  currency: Currency;

  amount: number;

  taxPercentage: number;

  paymentMethod: PaymentMethod;

  paymentStatus: PaymentStatus;

  description: string;

  remarks?: string;

  isRecurring: boolean;

  recurringMonths?: number;

  isForecasted: boolean;

}