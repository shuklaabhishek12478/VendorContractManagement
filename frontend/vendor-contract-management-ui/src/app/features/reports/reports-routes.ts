import { Routes } from '@angular/router';

import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard';
import { ContractReportComponent } from './pages/contract-report/contract-report';
import { VendorReportComponent } from './pages/vendor-report/vendor-report';
import { ExpenditureReportComponent } from './pages/expenditure-report/expenditure-report';
import { DepartmentReportComponent } from './pages/department-report/department-report';
import { CategoryReportComponent } from './pages/category-report/category-report';
import { MonthlyReportComponent } from './pages/monthly-report/monthly-report';

export const reportRoutes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        component: ReportDashboardComponent,
        title: 'Reports Dashboard'
    },

    {
        path: 'contracts',
        component: ContractReportComponent,
        title: 'Contract Report'
    },

    {
        path: 'vendors',
        component: VendorReportComponent,
        title: 'Vendor Report'
    },

    {
        path: 'expenditures',
        component: ExpenditureReportComponent,
        title: 'Expenditure Report'
    },

    {
        path: 'departments',
        component: DepartmentReportComponent,
        title: 'Department Report'
    },

    {
        path: 'categories',
        component: CategoryReportComponent,
        title: 'Category Report'
    },

    {
        path: 'monthly',
        component: MonthlyReportComponent,
        title: 'Monthly Report'
    }

];