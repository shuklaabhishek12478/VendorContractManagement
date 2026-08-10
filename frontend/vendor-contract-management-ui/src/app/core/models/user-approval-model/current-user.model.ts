export interface CurrentUser {

  id: number;

  fullName: string;

  email: string;

  role: string;

  roles?: string[];

  vendorId: number | null;

  permissions: string[];

}