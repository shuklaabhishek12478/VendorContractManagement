import { Injectable } from '@angular/core';
import { PermissionRiskResult } from '../../models/permission-matrix.model';



@Injectable({
  providedIn: 'root'
})
export class PermissionRiskService {

  calculate(
    highRiskPermissions: number,
    deletePermissionCount: number,
    approvePermissionCount: number,
    assignmentRate: number
  ): PermissionRiskResult {

    let score = 0;

    score += highRiskPermissions * 5;

    score += deletePermissionCount * 3;

    score += approvePermissionCount * 2;

    if (assignmentRate > 90) {

      score += 20;

    }

    if (score > 100) {

      score = 100;

    }

        let riskLevel = '';

    let riskColor = '';

    if (score <= 30) {

      riskLevel = 'Low';

      riskColor = '#22C55E';

    }

    else if (score <= 70) {

      riskLevel = 'Medium';

      riskColor = '#F59E0B';

    }

    else {

      riskLevel = 'High';

      riskColor = '#EF4444';

    }

        return {

      riskScore: score,

      riskLevel,

      riskColor

    };

  }

}