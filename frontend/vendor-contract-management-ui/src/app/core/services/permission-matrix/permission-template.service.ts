import { Injectable } from '@angular/core';
import { PermissionGroup } from '../../models/permission-matrix.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionTemplateService {

  toggleAll(
    groups: PermissionGroup[],
    value: boolean
  ): void {

    groups.forEach(group => {

      group.permissions.forEach(permission => {

        permission.assigned = value;

      });

    });

  }

  applyViewerTemplate(
    groups: PermissionGroup[]
  ): void {

    groups.forEach(group => {

      group.permissions.forEach(permission => {

        permission.assigned =

          permission.permissionName.includes('View');

      });

    });

  }

  applyEditorTemplate(
    groups: PermissionGroup[]
  ): void {

    groups.forEach(group => {

      group.permissions.forEach(permission => {

        permission.assigned =

          permission.permissionName.includes('View')

          ||

          permission.permissionName.includes('Create')

          ||

          permission.permissionName.includes('Edit');

      });

    });

  }
    applyManagerTemplate(
    groups: PermissionGroup[]
  ): void {

    groups.forEach(group => {

      group.permissions.forEach(permission => {

        permission.assigned =

          !permission.permissionName.includes('Delete');

      });

    });

  }

  applyAdministratorTemplate(
    groups: PermissionGroup[]
  ): void {

    this.toggleAll(groups, true);

  }

  applyPermissionType(

    groups: PermissionGroup[],

    permissionType: string

  ): void {

    groups.forEach(group => {

      group.permissions.forEach(permission => {

        if (

          permission.permissionName

            .toLowerCase()

            .includes(permissionType.toLowerCase())

        ) {

          permission.assigned = true;

        }

      });

    });

  }
    validateDependencies(
    groups: PermissionGroup[]
  ): void {

    groups.forEach(group => {

      const view = group.permissions.find(x =>
        x.permissionName.includes('View'));

      const edit = group.permissions.find(x =>
        x.permissionName.includes('Edit'));

      const create = group.permissions.find(x =>
        x.permissionName.includes('Create'));

      const deletePermission = group.permissions.find(x =>
        x.permissionName.includes('Delete'));

      const approve = group.permissions.find(x =>
        x.permissionName.includes('Approve'));

      if (edit?.assigned && view) {

        view.assigned = true;

      }

      if (create?.assigned && view) {

        view.assigned = true;

      }

      if (deletePermission?.assigned) {

        if (view) {

          view.assigned = true;

        }

        if (edit) {

          edit.assigned = true;

        }

      }

      if (approve?.assigned && view) {

        view.assigned = true;

      }

    });

  }

}