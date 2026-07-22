export interface UpdateUser {
  fullName: string;
  vendorId?: number;
  isActive: boolean;
  roleIds: number[];
}