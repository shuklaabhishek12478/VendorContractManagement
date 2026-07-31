import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportFilter } from '../../../../core/models/reports-model/report-filter.model';

@Component({
    selector: 'app-report-toolbar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './report-toolbar.html',
    styleUrls: ['./report-toolbar.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportToolbarComponent {

    @Input() title = 'Reports Dashboard';

    @Input() subtitle =
        'Analytics & Reporting';

    @Input() icon = 'analytics';

    @Input() loading = false;

    @Input() searchText = '';

    @Input() totalRecords = 0;

    @Input() lastUpdated = '';

    @Input() showSearch = true;

    @Input() showExport = true;

    @Input() showRecordCount = true;

    @Output()
    searchChanged =
        new EventEmitter<string>();

    @Output()
    refresh =
        new EventEmitter<void>();

    @Output()
    reset =
        new EventEmitter<void>();

    @Output()
    excel =
        new EventEmitter<void>();

    @Output()
    pdf =
        new EventEmitter<void>();

    @Output()
    csv =
        new EventEmitter<void>();

    @Output()
    print =
        new EventEmitter<void>();

    @Output()
    copy =
        new EventEmitter<void>();

    @Output()
    email =
        new EventEmitter<void>();

        @Output() filterChanged = new EventEmitter<ReportFilter>();


    onSearch(value: string): void {

        this.searchChanged.emit(value);

    }

}