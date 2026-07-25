import { ExpenditureSummary } from './expenditure-summary.model';
import { MonthlySpend } from './monthly-spend.model';
import { DepartmentSpend } from './department-spend.model';
import { VendorSpend } from './vendor-spend.model';
import { CategorySpend } from './category-spend.model';

export interface ExpenditureDashboard {

  summary: ExpenditureSummary;

  monthlySpend: MonthlySpend[];

  departmentSpend: DepartmentSpend[];

  vendorSpend: VendorSpend[];

  categorySpend: CategorySpend[];

}