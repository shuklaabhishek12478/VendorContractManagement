import { Currency } from "./currency.enum";
import { PaymentMethod } from "./payment-method.enum";

export interface Vendor {
  id: number;
  vendorName: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  isActive: boolean;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branchName?: string;
  swiftCode?: string;
  paymentTerms?: string;
  preferredCurrency?: Currency;
  paymentMethod?: PaymentMethod;
}