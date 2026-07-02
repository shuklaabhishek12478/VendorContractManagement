export interface ContractQuery {

  pageNumber: number;

  pageSize: number;

  search?: string;

  sortBy?: string;

  sortDirection?: string;

  status?: number | null;

  vendorId?: number | null;

  startDate?: string;

  endDate?: string;

  minValue?: number | null;

  maxValue?: number | null;

}