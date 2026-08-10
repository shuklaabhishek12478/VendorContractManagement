import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Dashboard } from '../../core/models/dashboard-model/dashboard.model';
import { DashboardCharts } from '../../core/models/dashboard-model/dashboard-charts.model';
import {Vendor} from '../models/vendor.model';
import {Contract} from '../models/contract.model';
import { RecentActivity } from '../../core/models/recent-activity.model';
import { AppNotification } from '../models/notifications-model/notification.model';
import { ExpiringContract } from '../../core/models/dashboard-model/expiring-contract.model';
import { MonthlyContractTrend } from '../../core/models/dashboard-model/monthly-contract-trend.model';
import { ExpenditureDashboard } from '../../core/models/expenditures-model/expenditure-dashboard.model';
import { ExpenditureForecast } from '../../core/models/expenditures-model/expenditure-forecast.model';
import { TopVendor } from '../models/dashboard-model/top-vendor.model';
import { ContractStatusAnalytics } from '../models/dashboard-model/status-distribution.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  private readonly api = `${environment.apiUrl}`;

 // Dashboard Summary
 
  getDashboard(): Observable<Dashboard> {

    return this.http.get<Dashboard>(
      `${this.api}/dashboard`
    );

  }

  // Charts
  
  getCharts(): Observable<DashboardCharts> {

    return this.http.get<DashboardCharts>(
      `${this.api}/dashboard/charts`
    );

  }

getStatusDistribution(): Observable<ContractStatusAnalytics[]> {

  return this.http.get<ContractStatusAnalytics[]>(
    `${this.api}/dashboard/status-distribution`
  );

}


  getContractValueTrend() {

    return this.http.get<any[]>(
      `${this.api}/dashboard/contract-value-trend`
    );

  }

getTopVendors(count = 5): Observable<TopVendor[]> {

  const params =
    new HttpParams().set('count', count);

  return this.http.get<TopVendor[]>(
    `${this.api}/dashboard/top-vendors`,
    { params }
  );

}

  getExpiryAnalytics() {

    return this.http.get<any>(
      `${this.api}/dashboard/expiry-analytics`
    );

  }

  // Notifications
 
  getNotifications(): Observable<AppNotification[]> {

    return this.http.get<AppNotification[]>(
      `${this.api}/notifications/my`
    );

  }

  // Recent Activity
  
  getRecentActivities(): Observable<RecentActivity[]> {

    return this.http.get<RecentActivity[]>(
      `${this.api}/recentactivities`
    );

  }

 // Contracts
  
  getExpiringContracts(days = 30): Observable<ExpiringContract[]> {

    const params =
      new HttpParams().set('days', days);

    return this.http.get<ExpiringContract[]>(
      `${this.api}/contracts/expiring-soon`,
      { params }
    );

  }

  // Expenditure
  
  getExpenditureDashboard(): Observable<ExpenditureDashboard> {

    return this.http.get<ExpenditureDashboard>(
      `${this.api}/expenditure/dashboard`
    );

  }

  getForecast(year: number): Observable<ExpenditureForecast> {

    return this.http.get<ExpenditureForecast>(
      `${this.api}/expenditure/forecast/${year}`
    );

  }

  // Vendor Dashboard
 
  getVendorDashboard() {

    return this.http.get(
      `${this.api}/dashboard/vendor`
    );

  }

  // Load Complete Dashboard
 
  loadDashboard(year: number = new Date().getFullYear()) {

    return forkJoin({

      summary: this.getDashboard(),

      charts: this.getCharts(),

      notifications: this.getNotifications(),

      activities: this.getRecentActivities(),

      expiringContracts: this.getExpiringContracts(),

      expenditure: this.getExpenditureDashboard(),

      forecast: this.getForecast(year)

    });

  }
  
  getVendors() {
  return this.http.get<Vendor[]>(`${environment.apiUrl}/vendors`);
}

getActiveContracts() {
  return this.http.get<Contract[]>(`${environment.apiUrl}/contracts/active`);
}

getExpiredContracts() {
  return this.http.get<Contract[]>(`${environment.apiUrl}/contracts/expired`);
}

getMonthlyTrend(): Observable<MonthlyContractTrend[]> {

  return this.http.get<MonthlyContractTrend[]>(
    `${this.api}/dashboard/monthly-trend`
  );

}

}