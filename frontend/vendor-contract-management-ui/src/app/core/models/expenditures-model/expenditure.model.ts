import { Currency } from "../currency.enum";
import { PaymentMethod } from "../payment-method.enum";
import { CostCenter } from "./expenditure-enum/cost-center.enum";
import { Department } from "./expenditure-enum/department.enum";
import { ExpenditureStatus } from "./expenditure-enum/expenditure-status.enum";
import { ExpenseCategory } from "./expenditure-enum/expense-category.enum";
import { ExpenseType } from "./expenditure-enum/expense-type.enum";
import { PaymentStatus } from "./expenditure-enum/payment-status.enum";

export interface Expenditure {

  id: number;

  expenseNumber: string;

  title: string;

  vendorId: number;

  vendorName: string;

  contractId?: number;

  contractNumber?: string;

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

  taxAmount: number;

  totalAmount: number;

  paymentStatus: PaymentStatus;

  paymentMethod: PaymentMethod;

  status: ExpenditureStatus;

  description: string;

  remarks?: string;

  isRecurring: boolean;

  recurringMonths?: number;

  isForecasted: boolean;

  createdOn: string;

}