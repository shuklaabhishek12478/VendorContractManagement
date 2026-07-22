export interface CreateUser {
  fullName: string;
  email: string;
  password: string;
  vendorId?: number;
  roleIds: number[];
}