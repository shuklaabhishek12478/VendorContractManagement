export interface Contracts {

  id: number;

  startDate: string;

  endDate: string;

  contractValue: number;

  description: string;

  status: number;

  vendorId: number;

  approvedBy?: string;

  approvedOn?: string;

  rejectionReason?: string;

  terminationReason?: string;

  terminatedOn?: string;

  terminatedBy?: string;

}