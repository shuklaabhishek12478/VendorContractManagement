import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReportFilter } from '../models/reports-model/report-filter.model';
import { ReportDashboard } from '../models/reports-model/report-dashboard.model';
import { ContractReport } from '../models/reports-model/contract-report.model';
import { VendorReport } from '../models/reports-model/vendor-report.model';
import { DepartmentReport } from '../models/reports-model/department-report.model';
import { CategoryReport } from '../models/reports-model/category-report.model';
import { MonthlyReport } from '../models/reports-model/monthly-report.model';
import { ExpenditureReport } from '../models/reports-model/expenditure-report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/Report`;


  getDashboard(
    filter: ReportFilter
  ): Observable<ReportDashboard> {

    return this.http.get<ReportDashboard>(
      `${this.apiUrl}/dashboard`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  getContracts(
    filter: ReportFilter
  ): Observable<ContractReport[]> {

    return this.http.get<ContractReport[]>(
      `${this.apiUrl}/contracts`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  exportContracts(
    filter: ReportFilter
  ) {

    return this.http.get(
      `${this.apiUrl}/export/contracts/excel`,
      {
        params: this.buildParams(filter),
        responseType: 'blob'
      }
    );

  }

  getVendors(
    filter: ReportFilter
  ): Observable<VendorReport[]> {

    return this.http.get<VendorReport[]>(
      `${this.apiUrl}/vendors`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  exportVendors(
    filter: ReportFilter
  ) {

    return this.http.get(
      `${this.apiUrl}/export/vendors/excel`,
      {
        params: this.buildParams(filter),
        responseType: 'blob'
      }
    );

  }

  getDepartments(
    filter: ReportFilter
  ): Observable<DepartmentReport[]> {

    return this.http.get<DepartmentReport[]>(
      `${this.apiUrl}/departments`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  exportDepartments(
    filter: ReportFilter
  ) {

    return this.http.get(
      `${this.apiUrl}/export/departments/excel`,
      {
        params: this.buildParams(filter),
        responseType: 'blob'
      }
    );

  }


  getCategories(
    filter: ReportFilter
  ): Observable<CategoryReport[]> {

    return this.http.get<CategoryReport[]>(
      `${this.apiUrl}/categories`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  exportCategories(
    filter: ReportFilter
  ) {

    return this.http.get(
      `${this.apiUrl}/export/categories/excel`,
      {
        params: this.buildParams(filter),
        responseType: 'blob'
      }
    );

  }


  getMonthly(
    filter: ReportFilter
  ): Observable<MonthlyReport[]> {

    return this.http.get<MonthlyReport[]>(
      `${this.apiUrl}/monthly`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  exportMonthly(
    filter: ReportFilter
  ) {

    return this.http.get(
      `${this.apiUrl}/export/monthly/excel`,
      {
        params: this.buildParams(filter),
        responseType: 'blob'
      }
    );

  }

  
  getExpenditures(
    filter: ReportFilter
  ): Observable<ExpenditureReport[]> {

    return this.http.get<ExpenditureReport[]>(
      `${this.apiUrl}/expenditures`,
      {
        params: this.buildParams(filter)
      }
    );

  }

  exportExpenditures(
    filter: ReportFilter
  ) {

    return this.http.get(
      `${this.apiUrl}/export/expenditures/excel`,
      {
        params: this.buildParams(filter),
        responseType: 'blob'
      }
    );

  }


  private buildParams(filter: ReportFilter): HttpParams {

  let params = new HttpParams();

  if (filter.fromDate)
    params = params.set('fromDate', filter.fromDate);

  if (filter.toDate)
    params = params.set('toDate', filter.toDate);

  if (filter.vendorId != null)
    params = params.set('vendorId', filter.vendorId.toString());

  if (filter.contractId != null)
    params = params.set('contractId', filter.contractId.toString());

  if (filter.department != null)
    params = params.set('department', filter.department.toString());

  if (filter.category != null)
    params = params.set('category', filter.category.toString());

  if (filter.paymentStatus != null)
    params = params.set('paymentStatus', filter.paymentStatus.toString());

  if (filter.status != null)
    params = params.set('status', filter.status.toString());

  return params;
}
getMonthlyReport(
    filter: ReportFilter
): Observable<MonthlyReport[]> {

    return this.http.get<MonthlyReport[]>(
        `${this.apiUrl}/monthly`,
        {
            params: this.buildParams(filter)
        }
    );

}

exportMonthlyReport(
    filter: ReportFilter
) {

    return this.http.get(
        `${this.apiUrl}/export/monthly/excel`,
        {
            params: this.buildParams(filter),
            responseType: 'blob'
        }
    );

}

}