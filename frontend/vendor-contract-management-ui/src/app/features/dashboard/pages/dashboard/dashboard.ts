import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { StatsCardComponent } from '../../components/stats-card/stats-card';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header';
import { CommonModule } from '@angular/common';
import { ContractOverviewChartComponent } from '../../components/charts/contract-overview-chart/contract-overview-chart';
import { VendorDistributionChartComponent } from '../../components/charts/vendor-distribution-chart/vendor-distribution-chart';
import { RecentActivityService } from '../../../../core/services/recent-activity.service';
import { RecentActivity } from '../../../../core/models/recent-activity.model';
import { RecentActivityComponent }from '../../components/recent-activity/recent-activity';
import {DashboardService} from '../../../../core/services/dashboard.service';
import { ExpiringContractsComponent } from '../../components/expiring-contracts/expiring-contracts';
import { ExpenditureSummaryComponent } from '../../components/expenditure-summary/expenditure-summary';
import { ExpenditureTrendChartComponent } from '../../components/expenditure-trend-chart/expenditure-trend-chart';
import { VendorSpendChartComponent } from '../../components/vendor-spend-chart/vendor-spend-chart';
import { DepartmentSpendChartComponent } from '../../components/department-spend-chart/department-spend-chart';
import { BudgetHealthCardComponent } from '../../components/budget-health-card/budget-health-card';
import {  NotificationsComponent } from '../../components/notifications/notifications';
import { ContractStatusChartComponent } from '../../components/contract-status-chart/contract-status-chart';
import { BudgetForecastCardComponent } from '../../components/budget-forecast-card/budget-forecast-card';
import { AuthService } from '../../../../core/services/auth.service';
import { forkJoin } from 'rxjs';
import { ExpiringContract } from '../../../../core/models/dashboard-model/expiring-contract.model';
import { AppNotification } from '../../../../core/models/notifications-model/notification.model';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PermissionService } from '../../../../core/services/permission';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [
    CommonModule,
    StatsCardComponent,
    DashboardHeaderComponent,
    ContractOverviewChartComponent,
    VendorDistributionChartComponent,
    RecentActivityComponent,
   NotificationsComponent,
    ExpiringContractsComponent,
    ExpenditureSummaryComponent,
    ExpenditureTrendChartComponent,
    VendorSpendChartComponent,
    DepartmentSpendChartComponent,
    BudgetHealthCardComponent,
    ContractStatusChartComponent,
    BudgetForecastCardComponent,
    NgApexchartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
   private recentActivityService = inject(RecentActivityService);
    private authService = inject(AuthService);
    private dashboardService = inject(DashboardService);
constructor(
  private cdr: ChangeDetectorRef,
   private permissionService: PermissionService
) {
  console.log('Dashboard Constructor');
}


 @Input()
labels:string[]=[]
   activities: RecentActivity[] = [];

   dashboardTitle = 'Enterprise Dashboard';

dashboardSubtitle = 'Vendor Contract Management System';
userName = ''; 
contractMonths: string[] = [];
contractValues: number[] = [];
vendorDistributionLabels: string[] = [];
vendorDistributionValues: number[] = [];
expiringContracts: ExpiringContract[] = [];
notifications: AppNotification[] = [];
currentSpend = 0;
forecastSpend = 0;
budget = 0;
spent = 0;
remainingBudget = 0;
budgetUtilization = 0;
monthlySpendLabels: string[] = [];
actualSpend: number[] = [];
forecastSpendData: number[] = [];
vendorNames: string[] = [];
vendorSpendAmounts: number[] = [];
departmentLabels: string[] = [];
departmentValues: number[] = [];
statusLabels: string[] = [];
statusValues: number[] = [];
forecastBudget = 0;
forecastCurrentSpend = 0;
forecastSpendAmount = 0;
cards: any[] = [];
  router: any;

  get canViewFinancials(): boolean {
  return this.permissionService.hasPermission(
    'Dashboard.ViewFinancials'
  );
}

ngOnInit(): void {
     console.log('Dashboard ngOnInit');
  this.loadCurrentUser();

  this.loadActivities();
  this.loadStatsCards();
  this.loadMonthlyTrend();
  this.loadTopVendors();
  this.loadExpiringContracts();
  this.loadNotifications();
  this.loadExpenditureSummary();
  this.loadMonthlySpend();
  this.loadVendorSpend();
  this.loadDepartmentSpend();
  this.loadExpenditureDashboard();
  this.loadStatusDistribution();
  this.loadBudgetForecast();

}

private loadCurrentUser(): void {

  this.authService.getCurrentUser().subscribe({

    next: (user) => {

      this.userName = user.fullName;
this.cdr.detectChanges();
    },

    error: (err) => {

      console.error('Unable to load current user', err);

      this.userName = '';

    }

  });

}

private loadStatsCards(): void {

  forkJoin({

    vendors: this.dashboardService.getVendors(),

    activeContracts: this.dashboardService.getActiveContracts(),

    expiredContracts: this.dashboardService.getExpiredContracts(),

    expiringContracts: this.dashboardService.getExpiringContracts()

  }).subscribe({

    next: (result) => {

      this.cards = [

        {

          title: 'Total Vendors',

          value: result.vendors.length.toString(),

          icon: 'business',

          color: '#2563eb',

          trend: ''

        },

        {

          title: 'Active Contracts',

          value: result.activeContracts.length.toString(),

          icon: 'description',

          color: '#16a34a',

          trend: ''

        },

        {

          title: 'Expiring Soon',

          value: result.expiringContracts.length.toString(),

          icon: 'schedule',

          color: '#f59e0b',

          trend: ''

        },

        {

          title: 'Expired',

          value: result.expiredContracts.length.toString(),

          icon: 'warning',

          color: '#ef4444',

          trend: ''

        }

      ];
      this.cdr.detectChanges();

    }

  });

}

private loadActivities(): void {

  this.dashboardService
    .getRecentActivities()
    .subscribe({
      next: (data) => {
        this.activities = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load recent activities', err);
      }
    });

}

private loadMonthlyTrend(): void {

  this.dashboardService
      .getMonthlyTrend()
      .subscribe({

        next: res => {

          console.log("Monthly Trend", res);

          this.contractMonths =
            res.map(x => x.month);

          this.contractValues =
            res.map(x => x.totalContracts);

            console.log(this.contractMonths);
  console.log(this.contractValues);

  this.cdr.detectChanges();
        },

        error: err => {

          console.error(err);

        }

      });

}





approve(id:number){

console.log(id);

}

reject(id:number){

console.log(id);

}



renewContract(id:number){

console.log(id);

}

openContract(id:number){

console.log(id);

}


private loadTopVendors(): void {

  this.dashboardService
      .getTopVendors()
      .subscribe({

        next: res => {

          this.vendorDistributionLabels =
            res.map(x => x.vendorName);

          this.vendorDistributionValues =
            res.map(x => Number(x.totalContractValue));
this.cdr.detectChanges();
        },

        error: err => console.error(err)

      });

}

private loadExpiringContracts(): void {

  this.dashboardService
      .getExpiringContracts()
      .subscribe({

        next: data => {

          this.expiringContracts = data;
this.cdr.detectChanges();
        }

      });

}

private loadNotifications(): void {

  this.dashboardService
      .getNotifications()
      .subscribe({

        next: data => {

          this.notifications = data;
this.cdr.detectChanges();
        }

      });

}

private loadExpenditureSummary(): void {

  this.dashboardService
    .getExpenditureDashboard()
    .subscribe({

      next: (data) => {

        this.currentSpend =
          data.summary.totalSpend;

        this.budget =
          data.summary.budget;
this.cdr.detectChanges();
      }

    });

  this.dashboardService
    .getForecast(new Date().getFullYear())
    .subscribe({

      next: (data) => {

        this.forecastSpend =
          data.forecastSpend;
this.cdr.detectChanges();
      }

    });

}

private loadMonthlySpend(): void {

  this.dashboardService
    .getExpenditureDashboard()
    .subscribe({

      next: res => {

        this.monthlySpendLabels =
          res.monthlySpend.map(x => x.month);

        this.actualSpend =
          res.monthlySpend.map(x => x.actual);

        this.forecastSpendData =
          res.monthlySpend.map(x => x.forecast);
this.cdr.detectChanges();
      }

    });

}

private loadVendorSpend(): void {

  this.dashboardService
    .getExpenditureDashboard()
    .subscribe({

      next: res => {

        this.vendorNames =
          res.vendorSpend.map(x => x.vendorName);

        this.vendorSpendAmounts =
          res.vendorSpend.map(x => x.amount);
this.cdr.detectChanges();
      }

    });

}

private loadDepartmentSpend(): void {

  this.dashboardService
    .getExpenditureDashboard()
    .subscribe({

      next: res => {

        this.departmentLabels =
          res.departmentSpend.map(x => x.department);

        this.departmentValues =
          res.departmentSpend.map(x => Number(x.amount));
this.cdr.detectChanges();
      }

    });

}

private loadExpenditureDashboard(): void {

  this.dashboardService
    .getExpenditureDashboard()
    .subscribe({

      next: res => {

        // Summary
        this.currentSpend = Number(res.summary.totalSpend);
        this.forecastSpend = Number(res.summary.forecastAmount);
        this.budget = Number(res.summary.budget);
        this.spent = Number(res.summary.totalSpend);

        this.remainingBudget =
          Number(res.summary.remainingBudget);

        this.budgetUtilization =
          Math.round(
            Number(res.summary.totalSpend) /
            Number(res.summary.budget) * 100
          );

        // Monthly Trend
        this.monthlySpendLabels =
          res.monthlySpend.map(x => x.month);

        this.actualSpend =
          res.monthlySpend.map(x => Number(x.actual));

        this.forecastSpendData =
          res.monthlySpend.map(x => Number(x.forecast));

        // Vendor Spend
        this.vendorNames =
          res.vendorSpend.map(x => x.vendorName);

        this.vendorSpendAmounts =
          res.vendorSpend.map(x => Number(x.amount));

        // Department Spend
        this.departmentLabels =
          res.departmentSpend.map(x => x.department);

        this.departmentValues =
          res.departmentSpend.map(x => Number(x.amount));
this.cdr.detectChanges();
      }

    });

}

private loadStatusDistribution(): void {

  this.dashboardService
    .getStatusDistribution()
    .subscribe({

      next: (res) => {

         console.log("Status Distribution", res);
        this.statusLabels =
          res.map(x => x.status);

        this.statusValues =
          res.map(x => x.count);

           console.log(this.statusLabels);
  console.log(this.statusValues);
this.cdr.detectChanges();
      },

      error: err => console.error(err)

    });

}

private loadBudgetForecast(): void {

  const year = new Date().getFullYear();

  this.dashboardService
    .getForecast(year)
    .subscribe({

      next: res => {

        this.forecastBudget = Number(res.budget);

        this.forecastCurrentSpend =
          Number(res.currentSpend);

        this.forecastSpendAmount =
          Number(res.forecastSpend);
this.cdr.detectChanges();
      },

      error: err => console.error(err)

    });

}

}
