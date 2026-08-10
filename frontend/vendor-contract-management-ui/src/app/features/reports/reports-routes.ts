import { Routes } from '@angular/router';
import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard';
import { ContractReportComponent } from './pages/contract-report/contract-report';
import { VendorReportComponent } from './pages/vendor-report/vendor-report';
import { ExpenditureReportComponent } from './pages/expenditure-report/expenditure-report';
import { DepartmentReportComponent } from './pages/department-report/department-report';
import { CategoryReportComponent } from './pages/category-report/category-report';
import { MonthlyReportComponent } from './pages/monthly-report/monthly-report';
import { permissionGuard } from '../../core/guards/permission.guard';

export const reportRoutes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        component: ReportDashboardComponent,
        title: 'Reports Dashboard',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.View'
        }
    },

    {
        path: 'contracts',
        component: ContractReportComponent,
        title: 'Contract Report',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.Contract'
        }
    },

    {
        path: 'vendors',
        component: VendorReportComponent,
        title: 'Vendor Report',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.Vendor'
        }
    },

    {
        path: 'expenditures',
        component: ExpenditureReportComponent,
        title: 'Expenditure Report',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.Expenditure'
        }
    },

    {
        path: 'departments',
        component: DepartmentReportComponent,
        title: 'Department Report',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.Department'
        }
    },

    {
        path: 'categories',
        component: CategoryReportComponent,
        title: 'Category Report',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.Category'
        }
    },

    {
        path: 'monthly',
        component: MonthlyReportComponent,
        title: 'Monthly Report',
        canActivate: [permissionGuard],
        data: {
            permission: 'Report.Monthly'
        }
    }

];