import { Currency } from "./currency.enum";
import { PaymentMethod } from "./payment-method.enum";

export interface CreateVendor {
  vendorName: string;
  companyName: string;
  gstNumber: string;
  panNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
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