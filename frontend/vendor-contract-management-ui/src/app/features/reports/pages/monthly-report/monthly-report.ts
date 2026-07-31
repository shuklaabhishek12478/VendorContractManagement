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
import { MonthlyReport } from '../../../../core/models/reports-model/monthly-report.model';
import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportFilterComponent } from '../../Components/report-filter/report-filter';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportChartComponent } from '../../Components/report-chart/report-chart';
import { ReportTableComponent } from '../../Components/report-table/report-table';
import { ReportExportService } from '../../../../core/services/report-export.service';

@Component({
    selector: 'app-monthly-report',
    standalone: true,
    imports: [
        CommonModule,
        ReportToolbarComponent,
        ReportFilterComponent,
        ReportSummaryCardsComponent,
        ReportChartComponent,
        ReportTableComponent
    ],
    templateUrl: './monthly-report.html',
    styleUrls: ['./monthly-report.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyReportComponent implements OnInit {

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

    reports: MonthlyReport[] = [];

    rowData: MonthlyReport[] = [];

    columnDefs: ColDef[] = [];

    summary: ReportSummary =
        {} as ReportSummary;

    spendTrendChart: any[] = [];

    contractTrendChart: any[] = [];

    vendorGrowthChart: any[] = [];


    breadcrumb = [

        {
            label: 'Reports',
            url: '/reports/dashboard'
        },

        {
            label: 'Monthly Report'
        }

    ];

    ngOnInit(): void {

        this.title.setTitle(
            'Monthly Report | Vendor Contract Management'
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

                this.summary =
                    dashboard.summary;

                this.loadMonthlyReports();

            },

            error: error => {

                this.loading = false;

                console.error(error);

            }

        });

}

private loadMonthlyReports(): void {

    this.reportService
        .getMonthlyReport(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: reports => {

                this.reports = reports;

                this.rowData = reports;

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
            headerName: 'Month',
            field: 'month',
            pinned: 'left',
            minWidth: 170
        },

        {
            headerName: 'Spend',
            field: 'spend',
            width: 180,
            type: 'numericColumn'
        },

        {
            headerName: 'Contracts',
            field: 'contracts',
            width: 150,
            type: 'numericColumn'
        },

        {
            headerName: 'Vendors',
            field: 'vendors',
            width: 150,
            type: 'numericColumn'
        }

    ];

}

private buildCharts(): void {

    this.spendTrendChart =
        this.reports.map(report => ({

            label: report.month,

            value: report.spend

        }));

    this.contractTrendChart =
        this.reports.map(report => ({

            label: report.month,

            value: report.contracts

        }));

    this.vendorGrowthChart =
        this.reports.map(report => ({

            label: report.month,

            value: report.vendors

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
        .exportMonthly(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: blob => {

                this.exportService.exportExcel(

                    blob,

                    'MonthlyReport'

                );

            },

            error: error => {

                console.error(error);

            }

        });

}


exportPdf(): void {

    console.log('Monthly PDF Export');

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
    row: MonthlyReport
): void {

    console.log('Monthly Report', row);

}

}