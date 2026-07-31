import { ReportSummary } from './report-summary.model';
import { VendorReport } from './vendor-report.model';
import { DepartmentReport } from './department-report.model';
import { CategoryReport } from './category-report.model';
import { MonthlyReport } from './monthly-report.model';

export interface ReportDashboard {

  summary: ReportSummary;

  monthlySpend: MonthlyReport[];

  vendorSpend: VendorReport[];

  departmentSpend: DepartmentReport[];

  categorySpend: CategoryReport[];

}