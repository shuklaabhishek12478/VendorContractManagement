import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Permission } from '../../../../core/models/permission.model';
import { PermissionService } from '../../../../core/services/permission';

@Component({
  selector: 'app-assign-permissions-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './assign-permissions-dialog.html',
  styleUrl: './assign-permissions-dialog.scss'
})
export class AssignPermissionsDialogComponent implements OnInit {

  permissions: Permission[] = [];

  groupedPermissions: {
    module: string;
    allSelected: boolean;
    permissions: any[];
  }[] = [];

  searchText = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private permissionService: PermissionService,
    private dialogRef: MatDialogRef<AssignPermissionsDialogComponent>
  ) { }

  ngOnInit(): void {

    this.permissionService.getAll().subscribe(res => {

      this.permissions = res;

      const groups: any = {};

      for (const permission of res) {

        if (!groups[permission.module]) {

          groups[permission.module] = [];

        }

        groups[permission.module].push({

          ...permission,

          selected:
            this.data.currentPermissions?.includes(permission.code) ?? false

        });

      }

      this.groupedPermissions = Object.keys(groups)

        .sort()

        .map(module => ({

          module,

          allSelected: false,

          permissions: groups[module]

        }));

      this.groupedPermissions.forEach(group => {

        group.allSelected =
          group.permissions.every((x: any) => x.selected);

      });

    });

  }

  save(): void {

    const permissionIds = this.groupedPermissions

      .flatMap(x => x.permissions)

      .filter(x => x.selected)

      .map(x => x.id);

    this.dialogRef.close(permissionIds);

  }

  get selectedCount(): number {

    return this.groupedPermissions.reduce(

      (count, group) =>

        count +

        group.permissions.filter((x: any) => x.selected).length,

      0

    );

  }

  get totalCount(): number {

    return this.groupedPermissions.reduce(

      (count, group) => count + group.permissions.length,

      0

    );

  }

  get allSelected(): boolean {

    return this.selectedCount === this.totalCount &&
      this.totalCount > 0;

  }

  toggleAll(value: boolean): void {

    this.groupedPermissions.forEach(group => {

      group.allSelected = value;

      group.permissions.forEach((permission: any) => {

        permission.selected = value;

      });

    });

  }

  toggleModule(group: any): void {

    group.permissions.forEach((permission: any) => {

      permission.selected = group.allSelected;

    });

  }

  updateModule(group: any): void {

    group.allSelected =
      group.permissions.every((permission: any) => permission.selected);

  }

  get filteredGroups() {

    if (!this.searchText.trim()) {

      return this.groupedPermissions;

    }

    const search = this.searchText.toLowerCase();

    return this.groupedPermissions

      .map(group => ({

        ...group,

        permissions: group.permissions.filter((permission: any) =>

          permission.name.toLowerCase().includes(search) ||

          permission.code.toLowerCase().includes(search) ||

          permission.module.toLowerCase().includes(search)

        )

      }))

      .filter(group => group.permissions.length > 0);

  }

}