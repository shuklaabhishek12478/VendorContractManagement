import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { PermissionGroup } from '../../../../../../core/models/permission-matrix.model';

@Component({
    selector: 'app-permission-module',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatCardModule
    ],
    templateUrl: './permission-module.html',
    styleUrl: './permission-module.scss'
})
export class PermissionModuleComponent {

    @Input()
    group!: PermissionGroup;

    @Input()
    expanded = true;

    @Input()
    comparePermissions: string[] = [];

    @Output()
    permissionChanged =
        new EventEmitter<void>();

    @Output()
moduleChanged =
new EventEmitter<void>();

}