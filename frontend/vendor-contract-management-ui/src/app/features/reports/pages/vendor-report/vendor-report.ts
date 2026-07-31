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
import { VendorReport } from '../../../../core/models/reports-model/vendor-report.model';

import {
    ReportChartComponent,
    ReportChartData
} from '../../Components/report-chart/report-chart';

import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportFilterComponent } from '../../Components/report-filter/report-filter';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportTableComponent } from '../../Components/report-table/report-table';

@Component({
    selector: 'app-vendor-report',
    standalone: true,
    imports: [
        CommonModule,
        ReportToolbarComponent,
        ReportFilterComponent,
        ReportSummaryCardsComponent,
        ReportChartComponent,
        ReportTableComponent
    ],
    templateUrl: './vendor-report.html',
    styleUrls: ['./vendor-report.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorReportComponent implements OnInit {

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

    summary: ReportSummary =
        {} as ReportSummary;

    vendors: VendorReport[] = [];

    rowData: VendorReport[] = [];

    columnDefs: ColDef[] = [];

    //=========================================================
    // Charts
    //=========================================================

    vendorSpendChart: ReportChartData[] = [];

    topVendorChart: ReportChartData[] = [];

    //=========================================================
    // Breadcrumb
    //=========================================================

    breadcrumb = [
        {
            label: 'Reports',
            url: '/reports/dashboard'
        },
        {
            label: 'Vendor Report'
        }
    ];

    //=========================================================
    // Lifecycle
    //=========================================================

    ngOnInit(): void {

        this.title.setTitle(
            'Vendor Report | Vendor Contract Management'
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

                    this.loadVendors();

                },

                error: error => {

                    this.loading = false;

                    console.error(error);

                    this.cdr.markForCheck();

                }

            });

    }

    //=========================================================
    // Vendors
    //=========================================================

    private loadVendors(): void {

        this.reportService
            .getVendors(this.filter)
            .pipe(

                finalize(() => {

                    this.loading = false;

                    this.cdr.markForCheck();

                })

            )
            .subscribe({

                next: vendors => {

                    this.vendors = vendors;

                    this.rowData = vendors;

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
                headerName: 'Vendor Name',
                field: 'vendorName',
                flex: 2,
                pinned: 'left'
            },

            {
                headerName: 'Spend',
                field: 'spend',
                width: 170,
                valueFormatter: p =>
                    '₹ ' + Number(p.value ?? 0).toLocaleString()
            },

            {
                headerName: 'Contracts',
                field: 'contracts',
                width: 150
            },

            {
                headerName: 'Expenses',
                field: 'expenses',
                width: 150
            },

            {
                headerName: 'Created On',
                field: 'createdOn',
                width: 170,
                valueFormatter: p =>
                    p.value
                        ? new Date(p.value).toLocaleDateString()
                        : ''
            }

        ];

    }
        //=========================================================
    // Charts
    //=========================================================

    private buildCharts(): void {

        this.vendorSpendChart =

            this.vendors.map(vendor => ({

                label: vendor.vendorName,

                value: vendor.spend

            }));


        this.topVendorChart =

            [...this.vendorSpendChart]

                .sort((a, b) => b.value - a.value)

                .slice(0, 10);

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

            .exportVendors(this.filter)

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

                        'VendorReport'

                    );

                },

                error: error => {

                    console.error(error);

                }

            });

    }

    exportPdf(): void {

        console.log('Vendor PDF Export');

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
        row: VendorReport
    ): void {

        this.router.navigate([

            '/vendors',

            row.vendorId

        ]);

    }

}