import { Injectable } from '@angular/core';
import { PermissionAnalyticsResult, PermissionGroup } from '../../models/permission-matrix.model';



@Injectable({
  providedIn: 'root'
})
export class PermissionAnalyticsService {

  calculate(
    groups: PermissionGroup[],
    assignedPermissions: number,
    totalPermissions: number
  ): PermissionAnalyticsResult {

    const permissions =
      groups.flatMap(x => x.permissions);

    const assignmentRate =
      totalPermissions === 0
        ? 0
        : Math.round(
            (assignedPermissions / totalPermissions) * 100
          );

    const viewPermissions =
      permissions.filter(x =>
        x.permissionName.includes('View')
      ).length;

    const createPermissions =
      permissions.filter(x =>
        x.permissionName.includes('Create')
      ).length;

    const editPermissions =
      permissions.filter(x =>
        x.permissionName.includes('Edit')
      ).length;

    const deletePermissions =
      permissions.filter(x =>
        x.permissionName.includes('Delete')
      ).length;

    const approvePermissions =
      permissions.filter(x =>
        x.permissionName.includes('Approve')
      ).length;

    const highRiskPermissions =
      permissions.filter(x =>

        x.permissionName.includes('Delete')

        ||

        x.permissionName.includes('Assign')

        ||

        x.permissionName.includes('Approve')

      ).length;
          let riskScore =
      Math.min(
        100,
        Math.round(
          (highRiskPermissions / Math.max(totalPermissions, 1)) * 100
        )
      );

    let riskLevel = '';

    let riskColor = '#16A34A';

    if (riskScore >= 70) {

      riskLevel = 'High';

      riskColor = '#DC2626';

    }

    else if (riskScore >= 35) {

      riskLevel = 'Medium';

      riskColor = '#F59E0B';

    }

    else {

      riskLevel = 'Low';

      riskColor = '#16A34A';

    }

    let highestModule = '';

    let highestModulePercent = 0;

    let lowestModule = '';

    let lowestModulePercent = 100;

    let riskyModule = '';

    let riskyModuleCount = 0;

    groups.forEach(group => {

      const total = group.permissions.length;

      const assigned =
        group.permissions.filter(x => x.assigned).length;

      const percent =
        total === 0
          ? 0
          : Math.round((assigned / total) * 100);

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

    const recommendations: string[] = [];

    if (assignedPermissions === 0) {

      recommendations.push(
        'No permissions are assigned to this role.'
      );

    }

    if (highRiskPermissions > 10) {

      recommendations.push(
        'Large number of high-risk permissions detected.'
      );

    }

    if (assignmentRate < 30) {

      recommendations.push(
        'Role has very limited access. Verify if this is intentional.'
      );

    }

    if (assignmentRate > 90) {

      recommendations.push(
        'Role has almost full access. Review least privilege principle.'
      );

    }

    groups.forEach(group => {

      const assigned =
        group.permissions.filter(x => x.assigned).length;

      if (assigned === 0) {

        recommendations.push(
          `${group.module} module has no assigned permissions.`
        );

      }

      const hasDelete =
        group.permissions.some(x =>

          x.assigned &&
          x.permissionName.includes('Delete')

        );

      if (hasDelete) {

        recommendations.push(
          `${group.module} contains Delete permissions.`
        );

      }

    });

    if (recommendations.length === 0) {

      recommendations.push(
        'Permission matrix looks healthy.'
      );

    }

    const moduleHeatmap = new Map<string, string>();

    groups.forEach(group => {

      const total = group.permissions.length;

      const assigned =
        group.permissions.filter(x => x.assigned).length;

      const percent =
        total === 0
          ? 0
          : (assigned / total) * 100;

      let color = '#22C55E';

      if (percent >= 90) {

        color = '#DC2626';

      }

      else if (percent >= 70) {

        color = '#F97316';

      }

      else if (percent >= 40) {

        color = '#FACC15';

      }

      else if (percent >= 20) {

        color = '#84CC16';

      }

      moduleHeatmap.set(group.module, color);

    });
        return {

      assignmentRate,

      viewPermissions,

      createPermissions,

      editPermissions,

      deletePermissions,

      approvePermissions,

      highRiskPermissions,

      riskScore,

      riskLevel,

      riskColor,

      highestModule,

      highestModulePercent,

      lowestModule,

      lowestModulePercent,

      riskyModule,

      riskyModuleCount,

      recommendations,

      moduleHeatmap

    };

  }

}