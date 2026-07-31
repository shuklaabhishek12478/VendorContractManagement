import {
    ChangeDetectionStrategy,
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

import { ReportFilter } from '../../../../core/models/reports-model/report-filter.model';
import { ReportSummary } from '../../../../core/models/reports-model/report-summary.model';
import { ExpenditureReport } from '../../../../core/models/reports-model/expenditure-report.model';
import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportFilterComponent } from '../../Components/report-filter/report-filter';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportChartComponent } from '../../Components/report-chart/report-chart';
import { ReportTableComponent } from '../../Components/report-table/report-table';
import { ReportExportService } from '../../../../core/services/report-export.service';

@Component({
    selector: 'app-expenditure-report',
    standalone: true,
    imports: [
        CommonModule,
        ReportToolbarComponent,
        ReportFilterComponent,
        ReportSummaryCardsComponent,
        ReportChartComponent,
        ReportTableComponent
    ],
    templateUrl: './expenditure-report.html',
    styleUrls: ['./expenditure-report.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenditureReportComponent implements OnInit {

    private reportService =
        inject(ReportService);

    private router =
        inject(Router);

    private title =
        inject(Title);

    private readonly exportService =
    inject(ReportExportService);

    loading = false;

    lastUpdated = '';

    filter: ReportFilter = {};

    expenditures: ExpenditureReport[] = [];

    rowData: ExpenditureReport[] = [];

    columnDefs: ColDef[] = [];

    summary: ReportSummary =
        {} as ReportSummary;

    departmentChart: any[] = [];

    categoryChart: any[] = [];

    breadcrumb = [

        {
            label: 'Reports',
            url: '/reports/dashboard'
        },

        {
            label: 'Expenditure Report'
        }

    ];

    ngOnInit(): void {

        this.title.setTitle(
            'Expenditure Report | Vendor Contract Management'
        );

        this.buildColumns();

        this.load();

    }

  load(): void {

    this.loading = true;

    this.reportService
        .getDashboard(this.filter)
        .subscribe({

            next: dashboard => {

                this.summary = dashboard.summary;

                this.loadExpenditures();

            },

            error: error => {

                this.loading = false;

                console.error(error);

            }

        });

}

private loadExpenditures(): void {

    this.reportService
        .getExpenditures(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: data => {

                this.expenditures = data;

                this.rowData = data;

                this.lastUpdated =
                    new Date().toLocaleString();

                this.buildCharts();

            },

            error: error => {

                console.error(error);

            }

        });

}

private buildColumns(): void {

    this.columnDefs = [

        {
            headerName: 'Expense No',
            field: 'expenseNumber',
            minWidth: 170
        },

        {
            headerName: 'Vendor',
            field: 'vendorName',
            flex: 2
        },

        {
            headerName: 'Department',
            field: 'department',
            width: 170
        },

        {
            headerName: 'Category',
            field: 'category',
            width: 170
        },

        {
            headerName: 'Amount',
            field: 'amount',
            width: 150,
            type: 'numericColumn'
        },

        {
            headerName: 'Tax',
            field: 'taxAmount',
            width: 150,
            type: 'numericColumn'
        },

        {
            headerName: 'Total',
            field: 'totalAmount',
            width: 150,
            type: 'numericColumn'
        },

        {
            headerName: 'Expense Date',
            field: 'expenseDate',
            width: 160
        }

    ];

}

private buildCharts(): void {

    const departmentMap =
        new Map<string, number>();

    const categoryMap =
        new Map<string, number>();

    this.expenditures.forEach(expense => {

        departmentMap.set(
            expense.department,
            (departmentMap.get(expense.department) ?? 0)
            + expense.totalAmount
        );

        categoryMap.set(
            expense.category,
            (categoryMap.get(expense.category) ?? 0)
            + expense.totalAmount
        );

    });

    this.departmentChart =
        Array.from(departmentMap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(x => ({

                label: x[0],

                value: x[1]

            }));

    this.categoryChart =
        Array.from(categoryMap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(x => ({

                label: x[0],

                value: x[1]

            }));

}

refresh(): void {

    this.load();

}

resetFilters(): void {

    this.filter = {};

    this.load();

}

onFilterChanged(
    filter: ReportFilter
): void {

    this.filter = filter;

    this.load();

}

exportExcel(): void {

    this.loading = true;

    this.reportService
        .exportExpenditures(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: blob => {

                this.exportService.exportExcel(
                    blob,
                    'ExpenditureReport'
                );

            },

            error: error => {

                console.error(error);

            }

        });

}

exportPdf(): void {

    console.log('Export Expenditure PDF');

}

onSummaryClick(
    route: string
): void {

    this.router.navigate([
        '/reports',
        route
    ]);

}

onRowDoubleClick(
    row: ExpenditureReport
): void {

    this.router.navigate([
    '/expenditures',
    row.expenditureId
]);

}

}