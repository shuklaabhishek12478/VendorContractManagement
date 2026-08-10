import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { finalize } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '../../../../core/services/report.service';
import { ReportChartBuilderService } from '../../../../core/services/report-chart-builder.service';
import { MatButtonModule } from '@angular/material/button';
import { ReportFilter } from '../../../../core/models/reports-model/report-filter.model';
import { ReportToolbarComponent } from '../../Components/report-toolbar/report-toolbar';
import { ReportSummaryCardsComponent } from '../../Components/report-summary-cards/report-summary-cards';
import { ReportChartComponent, ReportChartData } from '../../Components/report-chart/report-chart';
import { ReportDashboard } from '../../../../core/models/reports-model/report-dashboard.model';
import { saveAs } from 'file-saver';
import { MatIconModule } from '@angular/material/icon';
import { ReportExportService } from '../../../../core/services/report-export.service';
import { MatCardModule } from '@angular/material/card';
import { PermissionService } from '../../../../core/services/permission';

export type ReportExportType =
    | 'contracts'
    | 'vendors'
    | 'departments'
    | 'categories'
    | 'monthly'
    | 'expenditures';

@Component({

    selector: 'app-report-dashboard',

    standalone: true,

    imports: [

         CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReportToolbarComponent,
    ReportSummaryCardsComponent,
    ReportChartComponent

    ],

    templateUrl: './report-dashboard.html',

    styleUrls: ['./report-dashboard.scss'],

    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ReportDashboardComponent
implements OnInit {

   
private readonly permissionService =
  inject(PermissionService);

    private readonly reportService =
        inject(ReportService);

    private readonly snackBar =
        inject(MatSnackBar);

    private readonly cdr =
        inject(ChangeDetectorRef);

    private readonly exportService =
    inject(ReportExportService);


    private readonly chartBuilder =
    inject(ReportChartBuilderService);
    //=========================================================
    // State
    //=========================================================

    loading = false;
    exportLoading = false;
    canExport = false;
    dashboard: ReportDashboard | null = null;
    exportingType: ReportExportType | null = null;
    filter: ReportFilter = {};

    //=========================================================
    // Charts
    //=========================================================

    monthlyChart: ReportChartData[] = [];

    vendorChart: ReportChartData[] = [];

    departmentChart: ReportChartData[] = [];

    categoryChart: ReportChartData[] = [];

    //=========================================================
    // Lifecycle
    //=========================================================

    ngOnInit(): void {
           this.canExport =
        this.permissionService.hasPermission(
            'Report.Export'
        );

        this.loadDashboard();

    }

    canExportReports(): boolean {

  return this.permissionService.hasPermission(
    'Report.Export'
  );

}

    //=========================================================
    // Load Dashboard
    //=========================================================

    loadDashboard(): void {

        this.loading = true;

        this.reportService

            .getDashboard(this.filter)

            .pipe(

                finalize(() => {

                    this.loading = false;

                    this.cdr.markForCheck();

                })

            )

            .subscribe({

                next: dashboard => {

                    this.dashboard = dashboard;

                    this.buildCharts();
                    this.cdr.markForCheck();
                },

                error: () => {

                    this.snackBar.open(

                        'Unable to load reports.',

                        'Close',

                        {

                            duration: 4000

                        }

                    );

                }

            });

    }

    //=========================================================
    // Refresh
    //=========================================================

    refresh(): void {

        this.loadDashboard();

    }

    //=========================================================
    // Toolbar Filter
    //=========================================================

   applyFilter(filter: ReportFilter): void {

    this.filter = filter;

    this.loadDashboard();

}

 

    //=========================================================
    // Reset Filter
    //=========================================================

    resetFilter(): void {

        this.filter = {};

        this.loadDashboard();

    }

    //=========================================================
    // Build Charts
    //=========================================================

    private buildCharts(): void {

        if (!this.dashboard) {

            this.monthlyChart = [];

            this.vendorChart = [];

            this.departmentChart = [];

            this.categoryChart = [];

            return;

        }

      this.monthlyChart =
    this.chartBuilder.buildMonthlySpendChart(
        this.dashboard.monthlySpend
    );

this.vendorChart =
    this.chartBuilder.buildVendorSpendChart(
        this.dashboard.vendorSpend
    );

this.departmentChart =
    this.chartBuilder.buildDepartmentSpendChart(
        this.dashboard.departmentSpend
    );

this.categoryChart =
    this.chartBuilder.buildCategorySpendChart(
        this.dashboard.categorySpend
    );

    }

    exportReport(
    type: ReportExportType
): void {

    this.exportLoading = true;

   let request$;

switch (type) {

    case 'contracts':
        request$ = this.reportService.exportContracts(this.filter);
        break;

    case 'vendors':
        request$ = this.reportService.exportVendors(this.filter);
        break;

    case 'departments':
        request$ = this.reportService.exportDepartments(this.filter);
        break;

    case 'categories':
        request$ = this.reportService.exportCategories(this.filter);
        break;

    case 'monthly':
        request$ = this.reportService.exportMonthly(this.filter);
        break;

    default:
        request$ = this.reportService.exportExpenditures(this.filter);
        break;
}

    request$

        .pipe(

            finalize(() => {

                this.exportLoading = false;

                this.cdr.markForCheck();

            })

        )

        .subscribe({

            next: blob => {

                saveAs(

                    blob,

                    `${type}-report.xlsx`

                );

                this.snackBar.open(

                    'Report exported successfully.',

                    'Close',

                    {

                        duration: 3000

                    }

                );

            },

            error: () => {

                this.snackBar.open(

                    'Export failed.',

                    'Close',

                    {

                        duration: 4000

                    }

                );

            }

        });

}

}