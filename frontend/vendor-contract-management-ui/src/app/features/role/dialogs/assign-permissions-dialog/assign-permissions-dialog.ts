import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
MAT_DIALOG_DATA,
MatDialogRef,
MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './assign-permissions-dialog.html',
  styleUrl: './assign-permissions-dialog.scss'
})
export class AssignPermissionsDialogComponent {


  permissions: Permission[] = [];
  groupedPermissions: {
  module: string;
  permissions: any[];
}[] = [];

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private permissionService:PermissionService,
    private dialogRef:
      MatDialogRef<AssignPermissionsDialogComponent>

  ) {}

  ngOnInit(): void {

  this.permissionService
      .getAll()
      .subscribe(res=>{

         this.permissions = res;

const groups: any = {};

for (const permission of res) {

  if (!groups[permission.module]) {

    groups[permission.module] = [];

  }

  groups[permission.module].push({

    ...permission,

    selected:

this.data.currentPermissions?.includes(
permission.code
) ?? false

  });

}

this.groupedPermissions = Object.keys(groups)

.sort()

.map(module => ({

module,

permissions: groups[module]

}));

      });

}

  save(): void {

  const permissionIds = this.groupedPermissions

    .flatMap(x => x.permissions)

    .filter(x => x.selected)

    .map(x => x.id);

  this.dialogRef.close(permissionIds);

}

}