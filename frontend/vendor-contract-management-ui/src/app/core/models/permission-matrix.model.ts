export interface PermissionMatrix {

  permissionId: number;

  permissionName: string;

  module: string;

  displayName: string;

  assigned: boolean;

}

export interface PermissionGroup {

  module: string;

  permissions: PermissionMatrix[];

}

export interface PermissionChangeResult {

  addedPermissions: number;

  removedPermissions: number;

  addedPermissionNames: string[];

  removedPermissionNames: string[];

}
export interface PermissionAnalyticsResult {

  assignmentRate: number;

  viewPermissions: number;

  createPermissions: number;

  editPermissions: number;

  deletePermissions: number;

  approvePermissions: number;

  highRiskPermissions: number;

  riskScore: number;

  riskLevel: string;

  riskColor: string;

  highestModule: string;

  highestModulePercent: number;

  lowestModule: string;

  lowestModulePercent: number;

  riskyModule: string;

  riskyModuleCount: number;

  recommendations: string[];

  moduleHeatmap: Map<string, string>;

}

export interface PermissionInsightsResult {

  highestModule: string;

  highestModulePercent: number;

  lowestModule: string;

  lowestModulePercent: number;

  riskyModule: string;

  riskyModuleCount: number;

}

export interface PermissionRiskResult {

  riskScore: number;

  riskLevel: string;

  riskColor: string;

}