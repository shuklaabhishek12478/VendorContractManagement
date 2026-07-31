import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ReportSummary } from '../../../../core/models/reports-model/report-summary.model';

@Component({
    selector: 'app-report-summary-cards',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './report-summary-cards.html',
    styleUrls: ['./report-summary-cards.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSummaryCardsComponent {

    /**
     * Dashboard Summary
     */
    @Input()
    summary: ReportSummary | null = null;

    /**
     * Disable card click while loading
     */
    @Input()
    loading = false;

    /**
     * Card Click Event
     */
    @Output()
    cardClick =
        new EventEmitter<string>();

    /**
     * Navigate to report
     */
    open(
        route: string
    ): void {

        if (this.loading) {
            return;
        }

        this.cardClick.emit(route);

    }

    /**
     * Progress Percentage
     * Used by Progress Bars
     */
    getPercentage(
        value: number,
        total: number
    ): number {

        if (!total || total <= 0) {
            return 0;
        }

        const percentage =
            (value / total) * 100;

        return Math.min(
            Math.max(
                percentage,
                0
            ),
            100
        );

    }

    /**
     * Currency Formatter
     */
    formatCurrency(
        value: number | null | undefined
    ): string {

        return new Intl.NumberFormat(
            'en-IN',
            {
                maximumFractionDigits: 2
            }
        ).format(value ?? 0);

    }

    /**
     * Trend Color
     */
    getTrendClass(
        percentage: number
    ): string {

        if (percentage >= 80) {
            return 'positive';
        }

        if (percentage >= 50) {
            return 'warning';
        }

        return 'negative';

    }

    /**
     * TrackBy
     */
    trackByIndex(
        index: number
    ): number {

        return index;

    }

}