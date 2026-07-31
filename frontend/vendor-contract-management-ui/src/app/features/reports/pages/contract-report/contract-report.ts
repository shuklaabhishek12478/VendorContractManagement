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
import { ContractReport } from '../../../../core/models/reports-model/contract-report.model';
import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportFilterComponent } from '../../Components/report-filter/report-filter';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportChartComponent } from '../../Components/report-chart/report-chart';
import { ReportTableComponent } from '../../Components/report-table/report-table';
import { ReportExportService } from '../../../../core/services/report-export.service';

@Component({
    selector: 'app-contract-report',
    standalone: true,
    imports: [
        CommonModule,
        ReportToolbarComponent,
        ReportFilterComponent,
        ReportSummaryCardsComponent,
        ReportChartComponent,
        ReportTableComponent
    ],
    templateUrl: './contract-report.html',
    styleUrls: ['./contract-report.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractReportComponent implements OnInit {

    private reportService =
        inject(ReportService);

    private readonly exportService =
    inject(ReportExportService);

    private router =
        inject(Router);

    private title =
        inject(Title);

    loading = false;

    lastUpdated = '';

    filter: ReportFilter = {};

    contracts: ContractReport[] = [];

    rowData: ContractReport[] = [];

    columnDefs: ColDef[] = [];

    summary: ReportSummary = {} as ReportSummary;

    statusChart: any[] = [];

    valueTrendChart: any[] = [];

    departmentChart: any[] = [];

    categoryChart: any[] = [];

    breadcrumb = [

        {
            label: 'Reports',
            url: '/reports/dashboard'
        },
        {
            label: 'Contract Report'
        }

    ];

    ngOnInit(): void {

        this.title.setTitle(
            'Contract Report | Vendor Contract Management'
        );

        this.buildColumns();

        this.load();

    }
  load(): void {

    this.loading = true;

    this.reportService
        .getDashboard(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: dashboard => {

                this.summary = dashboard.summary;

                this.valueTrendChart =
                    dashboard.monthlySpend.map(x => ({
                        label: x.month,
                        value: x.spend
                    }));

                this.departmentChart =
                    dashboard.departmentSpend.map(x => ({
                        label: x.department,
                        value: x.spend
                    }));

                this.categoryChart =
                    dashboard.categorySpend.map(x => ({
                        label: x.category,
                        value: x.spend
                    }));

                this.loadContracts();

            },

            error: error => {

                console.error(error);

            }

        });

}

private loadContracts(): void {

    this.reportService
        .getContracts(this.filter)
        .subscribe({

            next: contracts => {

                this.contracts = contracts;

                this.rowData = contracts;

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
headerName:'Contract No',
field:'contractNumber',
minWidth:170
},

{
headerName:'Vendor',
field:'vendorName',
flex:2
},

{
headerName:'Status',
field:'status',
width:150
},

{
    headerName: 'Contract Value',
    field: 'contractValue',
    width: 180,
    type: 'numericColumn',
    valueFormatter: p =>
        p.value?.toLocaleString()
},

{
    headerName: 'Start Date',
    field: 'startDate',
    width: 150,
    valueFormatter: p =>
        new Date(p.value).toLocaleDateString()
},

{
    headerName: 'End Date',
    field: 'endDate',
    width: 150,
    valueFormatter: p =>
        new Date(p.value).toLocaleDateString()
}

];

}

private buildCharts(): void {

    const statusMap = new Map<string, number>();

    this.contracts.forEach(contract => {

        statusMap.set(

            contract.status,

            (statusMap.get(contract.status) ?? 0) + 1

        );

    });

    this.statusChart =

        Array.from(statusMap.entries())

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
        .exportContracts(this.filter)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe({

            next: blob => {

                this.exportService.exportExcel(

                    blob,

                    'ContractReport'

                );

            },

            error: error => {

                console.error(error);

            }

        });

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
    row: ContractReport
): void {

    this.router.navigate([
        '/contracts',
        row.contractId
    ]);

}
}