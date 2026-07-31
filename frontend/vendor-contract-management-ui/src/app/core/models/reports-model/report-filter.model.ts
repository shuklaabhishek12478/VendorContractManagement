export interface ReportFilter {

  fromDate?: string;

  toDate?: string;

 vendorId?: number | null;

  contractId?: number | null;

  department?: number | null;

  category?: number | null;

  paymentStatus?: number | null;

  status?: number | null;

  exportExcel?: boolean;

  exportPdf?: boolean;

}