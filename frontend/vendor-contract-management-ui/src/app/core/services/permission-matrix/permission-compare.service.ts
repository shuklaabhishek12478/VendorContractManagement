import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoleService } from '../role.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionCompareService {

  constructor(
    private roleService: RoleService
  ) {}

  compareRole(roleId: number): Observable<string[]> {

    return this.roleService
      .getPermissionMatrix(roleId)
      .pipe(

        map(groups =>

          groups
            .flatMap(g => g.permissions)
            .filter(p => p.assigned)
            .map(p => p.permissionName.toLowerCase())

        )

      );

  }

}