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
import { CategoryReport } from '../../../../core/models/reports-model/category-report.model';
import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportFilterComponent } from '../../Components/report-filter/report-filter';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportChartComponent } from '../../Components/report-chart/report-chart';
import { ReportTableComponent } from '../../Components/report-table/report-table';
import { ReportExportService } from '../../../../core/services/report-export.service';

@Component({
    selector: 'app-category-report',
    standalone: true,
    imports: [
        CommonModule,
        ReportToolbarComponent,
        ReportFilterComponent,
        ReportSummaryCardsComponent,
        ReportChartComponent,
        ReportTableComponent
    ],
    templateUrl: './category-report.html',
    styleUrls: ['./category-report.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryReportComponent implements OnInit {

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

    categories: CategoryReport[] = [];

    rowData: CategoryReport[] = [];

    columnDefs: ColDef[] = [];

    summary: ReportSummary =
        {} as ReportSummary;

    spendChart: any[] = [];

expenseChart: any[] = [];

  

    breadcrumb = [

        {
            label: 'Reports',
            url: '/reports/dashboard'
        },

        {
            label: 'Category Report'
        }

    ];

    ngOnInit(): void {

        this.title.setTitle(
            'Category Report | Vendor Contract Management'
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

                this.loadCategories();

            },

            error: error => {

                this.loading = false;

                console.error(error);

            }

        });

}

private loadCategories(): void {

    this.reportService
        .getCategories(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: categories => {

                this.categories = categories;

                this.rowData = categories;

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
            headerName: 'Category',
            field: 'category',
            flex: 2,
            pinned: 'left'
        },

        {
            headerName: 'Spend',
            field: 'spend',
            width: 180,
            type: 'numericColumn'
        },

        {
            headerName: 'Expenses',
            field: 'expenses',
            width: 160,
            type: 'numericColumn'
        }

    ];

}

private buildCharts(): void {

    this.spendChart =
        this.categories
            .sort((a, b) => b.spend - a.spend)
            .map(category => ({

                label: category.category,

                value: category.spend

            }));

    this.expenseChart =
        this.categories
            .sort((a, b) => b.expenses - a.expenses)
            .map(category => ({

                label: category.category,

                value: category.expenses

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
        .exportCategories(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: blob => {

                this.exportService.exportExcel(
                    blob,
                    'CategoryReport'
                );

            },

            error: error => {

                console.error(error);

            }

        });

}

exportPdf(): void {

    console.log('Category PDF Export');

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
    row: CategoryReport
): void {

    console.log(row);

}

}