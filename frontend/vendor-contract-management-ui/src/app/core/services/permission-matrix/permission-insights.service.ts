import { Injectable } from '@angular/core';
import { PermissionGroup, PermissionInsightsResult } from '../../models/permission-matrix.model';



@Injectable({
  providedIn: 'root'
})
export class PermissionInsightsService {

  calculate(
    groups: PermissionGroup[]
  ): PermissionInsightsResult {

    let highestModule = '';

    let lowestModule = '';

    let riskyModule = '';

    let highestModulePercent = 0;

    let lowestModulePercent = 100;

    let riskyModuleCount = 0;

    groups.forEach(group => {

      const total =
        group.permissions.length;

      const assigned =
        group.permissions.filter(
          x => x.assigned
        ).length;

      const percent =
        total === 0
          ? 0
          : Math.round(
              (assigned / total) * 100
            );

      if (percent > highestModulePercent) {

        highestModulePercent = percent;

        highestModule = group.module;

      }

      if (percent < lowestModulePercent) {

        lowestModulePercent = percent;

        lowestModule = group.module;

      }

      const risky =
        group.permissions.filter(x =>

          x.assigned && (

            x.permissionName.includes('Delete')

            ||

            x.permissionName.includes('Approve')

            ||

            x.permissionName.includes('Assign')

          )

        ).length;

      if (risky > riskyModuleCount) {

        riskyModuleCount = risky;

        riskyModule = group.module;

      }

    });
        return {

      highestModule,

      highestModulePercent,

      lowestModule,

      lowestModulePercent,

      riskyModule,

      riskyModuleCount

    };

  }

}