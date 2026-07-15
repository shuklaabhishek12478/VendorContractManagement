export interface Role {
  id: number;

  name: string;

  description: string;

  color: string;

  icon: string;

  priority: number;

  isActive: boolean;

  isSystemRole: boolean;

  userCount: number;

  permissionCount: number;

  createdOn: string;

  updatedOn?: string;
}

export interface CreateRoleRequest {
  name: string;

  description: string;

  color: string;

  icon: string;

  priority: number;

  isActive: boolean;
}

export interface UpdateRoleRequest {
  name: string;

  description: string;

  color: string;

  icon: string;

  priority: number;

  isActive: boolean;
}

export interface RoleFilter {
 search?: string;

  isActive?: boolean | null;

  isSystemRole?: boolean | null;

  page?: number;

  pageSize?: number;
}

export interface AssignPermissionsRequest {
  permissionIds: number[];
}

export interface AssignUsersRequest {
  userIds: number[];
}

export interface RoleStatistics {
  totalRoles: number;

  activeRoles: number;

  inactiveRoles: number;

  systemRoles: number;

  customRoles: number;
}

export interface RoleLookup {
  id: number;

  name: string;
}