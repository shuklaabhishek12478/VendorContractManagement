import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivateFn
} from '@angular/router';

import { PermissionService } from '../services/permission';

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const permissionService =
    inject(PermissionService);

  const router =
    inject(Router);

  const requiredPermission =
    route.data['permission'] as string | undefined;

  // Agar route par permission define nahi hai
  // to access allow karo
  if (!requiredPermission) {
    return true;
  }

  // Permission available hai
  if (
    permissionService.hasPermission(
      requiredPermission
    )
  ) {
    return true;
  }

  // Permission nahi hai
  return router.createUrlTree([
    '/dashboard'
  ]);
};