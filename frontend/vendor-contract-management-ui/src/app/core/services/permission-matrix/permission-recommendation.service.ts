import { Injectable } from '@angular/core';
import { PermissionGroup } from '../../models/permission-matrix.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionRecommendationService {

  calculate(
    groups: PermissionGroup[],
    assignedPermissions: number,
    assignmentRate: number,
    highRiskPermissions: number
  ): string[] {

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
        group.permissions.filter(
          x => x.assigned
        ).length;

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

    return recommendations;

  }

}