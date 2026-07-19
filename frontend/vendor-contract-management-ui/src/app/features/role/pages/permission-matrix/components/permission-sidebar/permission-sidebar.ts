import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PermissionGroup } from '../../../../../../core/models/permission-matrix.model';

@Component({
    selector: 'app-permission-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule
    ],
    templateUrl: './permission-sidebar.html',
    styleUrl: './permission-sidebar.scss'
})
export class PermissionSidebarComponent {

    @Input()
    groups: PermissionGroup[] = [];

    @Input()
    activeModule = '';

    @Input()
    moduleCompletion = new Map<string, number>();

    @Output()
    moduleSelected =
        new EventEmitter<string>();

    getProgress(module: string): number {

        return this.moduleCompletion.get(module) ?? 0;

    }

}