import { ExpenditureForecastInnerSummary } from './expenditure-forecast-inner-summary.model';
import { ExpenditureForecastInnerMonthly } from './expenditure-forecast-inner-monthly.model';
import { ExpenditureForecastInnerVendor } from './expenditure-forecast-inner-vendor.model';
import { ExpenditureForecastInnerCategory } from './expenditure-forecast-inner-category.model';
import { ExpenditureForecastInnerDepartment } from './expenditure-forecast-inner-department.model';

export interface ExpenditureForecastInner {

  summary: ExpenditureForecastInnerSummary;

  monthlyForecast: ExpenditureForecastInnerMonthly[];

  vendorForecast: ExpenditureForecastInnerVendor[];

  categoryForecast: ExpenditureForecastInnerCategory[];

  departmentForecast: ExpenditureForecastInnerDepartment[];

}