export interface User {

  id: number;

  fullName: string;

  email: string;

  roles: string[];

  isActive: boolean;

  vendorId?: number;

}