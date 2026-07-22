export interface UserQuery {

  pageNumber: number;

  pageSize: number;

  search?: string;

  sortBy?: string;

  sortDirection?: string;

  isActive?: boolean;

}