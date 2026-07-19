import { Injectable } from '@angular/core';
import { PermissionChangeResult, PermissionGroup } from '../../models/permission-matrix.model';



@Injectable({
  providedIn: 'root'
})
export class PermissionChangeTrackerService {

  calculateChanges(

    groups: PermissionGroup[],

    originalPermissionIds: number[]

  ): PermissionChangeResult {

    const currentPermissions =
      groups.flatMap(g => g.permissions);

    const addedPermissionNames: string[] = [];

    const removedPermissionNames: string[] = [];
        currentPermissions.forEach(permission => {

      const wasAssigned =
        originalPermissionIds.includes(
          permission.permissionId
        );

      if (
        permission.assigned &&
        !wasAssigned
      ) {

        addedPermissionNames.push(
          permission.permissionName
        );

      }

      if (
        !permission.assigned &&
        wasAssigned
      ) {

        removedPermissionNames.push(
          permission.permissionName
        );

      }

    });

    const addedPermissions =
      addedPermissionNames.length;

    const removedPermissions =
      removedPermissionNames.length;
          return {

      addedPermissions,

      removedPermissions,

      addedPermissionNames,

      removedPermissionNames

    };

  }

}