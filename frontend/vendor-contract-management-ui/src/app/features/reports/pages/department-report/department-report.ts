import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { finalize } from 'rxjs';

import { ColDef } from 'ag-grid-community';

import { ReportService } from '../../../../core/services/report.service';
import { ReportExportService } from '../../../../core/services/report-export.service';

import { ReportFilter } from '../../../../core/models/reports-model/report-filter.model';
import { ReportSummary } from '../../../../core/models/reports-model/report-summary.model';
import { DepartmentReport } from '../../../../core/models/reports-model/department-report.model';

import {
    ReportChartComponent,
    ReportChartData
} from '../../Components/report-chart/report-chart';

import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportFilterComponent } from '../../Components/report-filter/report-filter';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportTableComponent } from '../../Components/report-table/report-table';

@Component({
    selector: 'app-department-report',
    standalone: true,
    imports: [
        CommonModule,
        ReportToolbarComponent,
        ReportFilterComponent,
        ReportSummaryCardsComponent,
        ReportChartComponent,
        ReportTableComponent
    ],
    templateUrl: './department-report.html',
    styleUrls: ['./department-report.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentReportComponent implements OnInit {

    //=========================================================
    // Services
    //=========================================================

    private readonly reportService =
        inject(ReportService);

    private readonly exportService =
        inject(ReportExportService);

    private readonly router =
        inject(Router);

    private readonly title =
        inject(Title);

    private readonly cdr =
        inject(ChangeDetectorRef);

    //=========================================================
    // State
    //=========================================================

    loading = false;

    lastUpdated = '';

    filter: ReportFilter = {};

    departments: DepartmentReport[] = [];

    rowData: DepartmentReport[] = [];

    columnDefs: ColDef[] = [];

    summary: ReportSummary =
        {} as ReportSummary;

    //=========================================================
    // Charts
    //=========================================================

    spendChart: ReportChartData[] = [];

    expenseChart: ReportChartData[] = [];

    //=========================================================
    // Breadcrumb
    //=========================================================

    breadcrumb = [
        {
            label: 'Reports',
            url: '/reports/dashboard'
        },
        {
            label: 'Department Report'
        }
    ];

    //=========================================================
    // Lifecycle
    //=========================================================

    ngOnInit(): void {

        this.title.setTitle(
            'Department Report | Vendor Contract Management'
        );

        this.buildColumns();

        this.load();

    }

    //=========================================================
    // Load
    //=========================================================

    load(): void {

        this.loading = true;

        this.reportService
            .getDashboard(this.filter)
            .subscribe({

                next: dashboard => {

                    this.summary =
                        dashboard.summary;

                    this.loadDepartments();

                },

                error: error => {

                    this.loading = false;

                    console.error(error);

                    this.cdr.markForCheck();

                }

            });

    }

    //=========================================================
    // Departments
    //=========================================================

    private loadDepartments(): void {

        this.reportService
            .getDepartments(this.filter)
            .pipe(

                finalize(() => {

                    this.loading = false;

                    this.cdr.markForCheck();

                })

            )
            .subscribe({

                next: departments => {

                    this.departments = departments;

                    this.rowData = departments;

                    this.lastUpdated =
                        new Date().toLocaleString();

                    this.buildCharts();

                },

                error: error => {

                    console.error(error);

                }

            });

    }
        //=========================================================
    // Grid
    //=========================================================

    private buildColumns(): void {

        this.columnDefs = [

            {
                headerName: 'Department',
                field: 'department',
                flex: 2,
                pinned: 'left'
            },

            {
                headerName: 'Spend',
                field: 'spend',
                width: 180,
                valueFormatter: p =>
                    '₹ ' + Number(p.value ?? 0).toLocaleString()
            },

            {
                headerName: 'Expenses',
                field: 'expenses',
                width: 160
            }

        ];

    }

    //=========================================================
    // Charts
    //=========================================================

    private buildCharts(): void {

        this.spendChart =

            this.departments.map(department => ({

                label: department.department,

                value: department.spend

            }));


        this.expenseChart =

            this.departments.map(department => ({

                label: department.department,

                value: department.expenses

            }));

    }

    //=========================================================
    // Refresh
    //=========================================================

    refresh(): void {

        this.load();

    }

    //=========================================================
    // Filter
    //=========================================================

    onFilterChanged(
        filter: ReportFilter
    ): void {

        this.filter = filter;

        this.load();

    }

    resetFilters(): void {

        this.filter = {};

        this.load();

    }
        //=========================================================
    // Export
    //=========================================================

    exportExcel(): void {

        this.loading = true;

        this.reportService

            .exportDepartments(this.filter)

            .pipe(

                finalize(() => {

                    this.loading = false;

                    this.cdr.markForCheck();

                })

            )

            .subscribe({

                next: blob => {

                    this.exportService.exportExcel(

                        blob,

                        'DepartmentReport'

                    );

                },

                error: error => {

                    console.error(error);

                }

            });

    }

    exportPdf(): void {

        console.log('Department PDF Export');

    }

    //=========================================================
    // Summary
    //=========================================================

    onSummaryClick(
        route: string
    ): void {

        this.router.navigate([

            '/reports',

            route

        ]);

    }

    //=========================================================
    // Grid
    //=========================================================

    onRowDoubleClick(
        row: DepartmentReport
    ): void {

        console.log(row);

        // Future Navigation
        // this.router.navigate([
        //     '/departments',
        //     row.departmentId
        // ]);

    }

}