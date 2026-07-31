import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AgGridAngular } from 'ag-grid-angular';

import {
    AllCommunityModule,
    ModuleRegistry,
    ColDef,
    GridApi,
    GridReadyEvent,
    GridOptions,
    SelectionChangedEvent,
    RowDoubleClickedEvent,
    RowClickedEvent
} from 'ag-grid-community';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

ModuleRegistry.registerModules([
    AllCommunityModule
]);

@Component({
    selector: 'app-report-table',
    standalone: true,
    imports: [
        CommonModule,
        AgGridAngular,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule
    ],
    templateUrl: './report-table.html',
    styleUrls: ['./report-table.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportTableComponent
implements OnChanges {

    @ViewChild(AgGridAngular)
    grid!: AgGridAngular;

    /*=====================================================
    INPUTS
    =====================================================*/

    @Input()
    columnDefs: ColDef[] = [];

    @Input()
    rowData: any[] = [];

    @Input()
    loading = false;

    @Input()
    quickFilter = '';

    @Input()
    pageSize = 10;

    @Input()
    height = '600px';

    @Input()
    enablePagination = true;

    @Input()
    enableSelection = true;

    @Input()
    enableExport = true;

    /*=====================================================
    OUTPUTS
    =====================================================*/

    @Output()
    rowClicked =
        new EventEmitter<any>();

    @Output()
    rowDoubleClick =
        new EventEmitter<any>();

    @Output()
    selectionChanged =
        new EventEmitter<any[]>();

    /*=====================================================
    GRID
    =====================================================*/

    private gridApi!: GridApi;

    defaultColDef: ColDef = {

        sortable: true,

        filter: true,

        floatingFilter: true,

        resizable: true,

        flex: 1,

        minWidth: 140

    };

    gridOptions: GridOptions = {

        animateRows: true,

        pagination: true,

        paginationPageSize: 10,

        suppressCellFocus: false,

        rowHeight: 46,

        headerHeight: 48,

        rowSelection: {

            mode: 'singleRow'

        }

    };

    /*=====================================================
    LIFECYCLE
    =====================================================*/

    ngOnChanges(
        changes: SimpleChanges
    ): void {

        this.refreshGrid();

    }

    /*=====================================================
    GRID READY
    =====================================================*/

    onGridReady(
        event: GridReadyEvent
    ): void {

        this.gridApi = event.api;

        this.gridApi.setGridOption(
            'pagination',
            this.enablePagination
        );

        this.gridApi.setGridOption(
            'paginationPageSize',
            this.pageSize
        );

        this.refreshGrid();

    }

    /*=====================================================
    REFRESH
    =====================================================*/

    private refreshGrid(): void {

        if (!this.gridApi)
            return;

        this.gridApi.setGridOption(
            'quickFilterText',
            this.quickFilter
        );

        if (this.loading) {

            this.gridApi.showLoadingOverlay();

            return;

        }

        if (!this.rowData.length) {

            this.gridApi.showNoRowsOverlay();

            return;

        }

        this.gridApi.hideOverlay();

    }

    /*=====================================================
    EVENTS
    =====================================================*/

    onRowClicked(
        event: RowClickedEvent
    ): void {

        this.rowClicked.emit(
            event.data
        );

    }

    onRowDoubleClicked(
        event: RowDoubleClickedEvent
    ): void {

        this.rowDoubleClick.emit(
            event.data
        );

    }

    onSelectionChanged(
        event: SelectionChangedEvent
    ): void {

        this.selectionChanged.emit(

            event.api.getSelectedRows()

        );

    }

    /*=====================================================
    EXPORT
    =====================================================*/

    exportCsv(): void {

        if (!this.enableExport)
            return;

        this.gridApi.exportDataAsCsv({

            fileName: 'Report.csv'

        });

    }

    /*=====================================================
    COLUMNS
    =====================================================*/

    autoSize(): void {

        const cols =
            this.gridApi.getColumns();

        if (!cols)
            return;

        this.gridApi.autoSizeColumns(cols);

    }

    fitColumns(): void {

        this.gridApi.sizeColumnsToFit();

    }

    /*=====================================================
    REFRESH API
    =====================================================*/

    refresh(): void {

        this.gridApi.refreshCells();

    }

}