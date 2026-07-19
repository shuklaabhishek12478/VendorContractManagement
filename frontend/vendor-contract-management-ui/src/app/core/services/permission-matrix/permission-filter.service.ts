import { Injectable } from '@angular/core';
import { PermissionGroup } from '../../models/permission-matrix.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionFilterService {

  searchPermissions(
    groups: PermissionGroup[],
    keyword: string
  ): PermissionGroup[] {

    keyword = keyword
      .toLowerCase()
      .trim();

    if (!keyword) {

      return [...groups];

    }

    return groups
      .map(group => ({

        module: group.module,

        permissions: group.permissions.filter(permission =>

          permission.displayName
            .toLowerCase()
            .includes(keyword)

          ||

          permission.permissionName
            .toLowerCase()
            .includes(keyword)

        )

      }))
      .filter(group => group.permissions.length > 0);

  }

  filterByModule(
    groups: PermissionGroup[],
    selectedModule: string
  ): PermissionGroup[] {

    if (!selectedModule) {

      return [...groups];

    }

    return groups.filter(group =>

      group.module === selectedModule

    );

  }

}