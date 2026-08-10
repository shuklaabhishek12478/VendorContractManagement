import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { ExpenditureService } from '../../../../core/services/expenditure.service';
import { ExpenditureForecastInner } from '../../../../core/models/expenditures-model/forecast-inner/expenditure-forecast-inner.model';
import { StatsCardComponent } from '../../../dashboard/components/stats-card/stats-card';
import { ExpenditureTrendChartComponent } from '../../../dashboard/components/expenditure-trend-chart/expenditure-trend-chart';
import { DepartmentSpendChartComponent } from '../../../dashboard/components/department-spend-chart/department-spend-chart';
import { VendorSpendChartComponent } from '../../../dashboard/components/vendor-spend-chart/vendor-spend-chart';
import { CategorySpendChartComponent } from '../../../expenditures/components/category-spend-chart/category-spend-chart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenditure-forecast',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    StatsCardComponent,
    ExpenditureTrendChartComponent,
    VendorSpendChartComponent,
    DepartmentSpendChartComponent,
   CategorySpendChartComponent,
    HasPermissionDirective
  ],
  templateUrl: './expenditure-forecast.html',
  styleUrls: ['./expenditure-forecast.scss']
})
export class ExpenditureForecastComponent implements OnInit {

     constructor(
  private cdr: ChangeDetectorRef,
 
) {
}

  private readonly service = inject(ExpenditureService);
  private readonly snackBar = inject(MatSnackBar);

  loading = true;

  selectedYear = new Date().getFullYear();

  forecast: ExpenditureForecastInner | null = null;
   forecastCards: any[] = [];
   monthlyLabels: string[] = [];
actualSpend: number[] = [];
forecastSpendData: number[] = [];
vendorLabels: string[] = [];
vendorAmounts: number[] = [];
departmentLabels: string[] = [];
departmentAmounts: number[] = [];
categoryLabels: string[] = [];
categoryAmounts: number[] = [];
years: number[] = [];


  ngOnInit(): void {

     this.generateYears();
    this.loadForecast();
  }

  loadForecast(): void {

    this.loading = true;

    this.service.getForecastInner(this.selectedYear)
      .subscribe({

        next: res => {
          console.log("API Success", res);
          this.forecast = res;
          this.buildForecastCards();
          this.buildMonthlyForecastChart();
          this.buildVendorForecastChart();
          this.buildDepartmentForecastChart();
          this.buildCategoryForecastChart();
          this.loading = false;
          this.cdr.detectChanges();
        },

        error: () => {

          this.loading = false;

          this.snackBar.open(
            'Unable to load forecast.',
            'Close',
            {
              duration: 3000
            });

        }

      });

  }

  private generateYears(): void {

  const currentYear = new Date().getFullYear();

  this.years = [];

  for (let year = currentYear - 5; year <= currentYear + 5; year++) {

    this.years.push(year);

  }

}

onYearChanged(): void {

  this.loadForecast();

}

  private buildForecastCards(): void {

  if (!this.forecast) {
    this.forecastCards = [];
    return;
  }

  const summary = this.forecast.summary;

  this.forecastCards = [

    {
      title: 'Current Spend',
      value: summary.currentSpend.toLocaleString(),
      icon: 'payments',
      color: '#2563eb',
      trend: ''
    },

    {
      title: 'Forecast Spend',
      value: summary.forecastSpend.toLocaleString(),
      icon: 'trending_up',
      color: '#7c3aed',
      trend: ''
    },

    {
      title: 'Budget',
      value: summary.budget.toLocaleString(),
      icon: 'account_balance_wallet',
      color: '#16a34a',
      trend: ''
    },

    {
      title: 'Remaining Budget',
      value: summary.remainingBudget.toLocaleString(),
      icon: 'savings',
      color: '#f59e0b',
      trend: ''
    },

    {
      title: 'Utilization',
      value: summary.budgetUtilizationPercentage.toFixed(2) + '%',
      icon: 'pie_chart',
      color: '#dc2626',
      trend: ''
    },

    {
      title: 'Monthly Burn Rate',
      value: summary.monthlyBurnRate.toLocaleString(),
      icon: 'local_fire_department',
      color: '#ea580c',
      trend: ''
    },

    {
      title: 'Estimated Year End',
      value: summary.estimatedYearEndSpend.toLocaleString(),
      icon: 'insights',
      color: '#0891b2',
      trend: ''
    }

  ];

}

private buildMonthlyForecastChart(): void {

  if (!this.forecast) {
    return;
  }

  this.monthlyLabels =
    this.forecast.monthlyForecast.map(x => x.month);

  this.actualSpend =
    this.forecast.monthlyForecast.map(x => x.actualSpend);

  this.forecastSpendData =
    this.forecast.monthlyForecast.map(x => x.forecastSpend);

}

private buildVendorForecastChart(): void {

  if (!this.forecast) {
    return;
  }

  this.vendorLabels =
    this.forecast.vendorForecast.map(x => x.vendorName);

  this.vendorAmounts =
    this.forecast.vendorForecast.map(x => x.forecastAmount);

}


private buildDepartmentForecastChart(): void {

  if (!this.forecast) {
    return;
  }

  this.departmentLabels =
    this.forecast.departmentForecast.map(x => x.department);

  this.departmentAmounts =
    this.forecast.departmentForecast.map(x => x.forecastAmount);

}

private buildCategoryForecastChart(): void {

  if (!this.forecast) {
    return;
  }

  this.categoryLabels =
    this.forecast.categoryForecast.map(x => x.category);

  this.categoryAmounts =
    this.forecast.categoryForecast.map(x => x.forecastAmount);

}

}