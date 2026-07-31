import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReportFilter } from '../../../../core/models/reports-model/report-filter.model';

@Component({
    selector: 'app-report-filter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule
    ],
    templateUrl: './report-filter.html',
    styleUrls: ['./report-filter.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFilterComponent implements OnChanges {

    //=========================================================
    // INPUTS
    //=========================================================

    @Input()
    loading = false;

    @Input()
    filter: ReportFilter = {};

    @Input()
    vendors: any[] = [];

    @Input()
    contracts: any[] = [];

    @Input()
    departments: any[] = [];

    @Input()
    categories: any[] = [];

    @Input()
    statuses: any[] = [];

    @Input()
    paymentStatuses: any[] = [];

    //=========================================================
    // OUTPUTS
    //=========================================================

    @Output()
    filterChanged =
        new EventEmitter<ReportFilter>();

    @Output()
    reset =
        new EventEmitter<void>();

    @Output()
    saveFilter =
        new EventEmitter<ReportFilter>();

    //=========================================================
    // LOCAL MODEL
    //=========================================================

    localFilter: ReportFilter = {};

    //=========================================================
    // LIFECYCLE
    //=========================================================

    ngOnChanges(
        changes: SimpleChanges
    ): void {

        if (changes['filter']) {

            this.localFilter = {

                ...this.filter

            };

        }

    }

    //=========================================================
    // APPLY
    //=========================================================

    applyFilters(): void {

        this.filterChanged.emit({

            ...this.localFilter

        });

    }

    //=========================================================
    // RESET
    //=========================================================

    clearFilters(): void {

        this.localFilter = {};

        this.reset.emit();

        this.filterChanged.emit({});

    }

    //=========================================================
    // SAVE FILTER
    //=========================================================

    saveCurrentFilter(): void {

        this.saveFilter.emit({

            ...this.localFilter

        });

    }

    //=========================================================
    // DATE HELPERS
    //=========================================================

    setToday(): void {

        const today = new Date();

        this.localFilter.fromDate =
            today.toISOString();

        this.localFilter.toDate =
            today.toISOString();

    }

    setCurrentMonth(): void {

        const today = new Date();

        const firstDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        this.localFilter.fromDate =
            firstDay.toISOString();

        this.localFilter.toDate =
            today.toISOString();

    }

    setCurrentYear(): void {

        const today = new Date();

        const firstDay = new Date(
            today.getFullYear(),
            0,
            1
        );

        this.localFilter.fromDate =
            firstDay.toISOString();

        this.localFilter.toDate =
            today.toISOString();

    }

    //=========================================================
    // QUICK ACTIONS
    //=========================================================

    hasFilter(): boolean {

        return !!(

            this.localFilter.fromDate ||

            this.localFilter.toDate ||

            this.localFilter.vendorId ||

            this.localFilter.contractId ||

            this.localFilter.department ||

            this.localFilter.category ||

            this.localFilter.status ||

            this.localFilter.paymentStatus

        );

    }

}