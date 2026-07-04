import { ContractStatus } from "./contract-status.enum";

export interface Contract {

  id: number;

  contractNumber: string;

  title: string;

  startDate: string;

  endDate: string;

  contractValue: number;

  description: string;

  status: ContractStatus;

  vendorId: number;

  approvedBy?: string;

  approvedOn?: string;

  rejectionReason?: string;

  terminationReason?: string;

  terminatedOn?: string;

  terminatedBy?: string;

  submittedOn?: string;

  isActive: boolean;

isDeleted: boolean;

}