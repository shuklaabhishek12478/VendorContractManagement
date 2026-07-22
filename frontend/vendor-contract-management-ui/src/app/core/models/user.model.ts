export interface User {

  id: number;

  fullName: string;

  email: string;

  roles: string[];

  roleIds:number[];

  isActive: boolean;

  vendorId?: number;

  vendorName?: string;

  phoneNumber?: string;

  isLocked: boolean;

  lastLogin?: Date;

  createdOn: Date;

  modifiedOn?: Date;

  createdBy: string;

  modifiedBy?: string;

}


 