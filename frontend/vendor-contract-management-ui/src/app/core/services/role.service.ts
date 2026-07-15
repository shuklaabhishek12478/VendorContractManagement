import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  RoleFilter,
  AssignPermissionsRequest,
  AssignUsersRequest,
  RoleStatistics,
  RoleLookup
} from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly apiUrl = 'https://localhost:7220/api/Role';

  constructor(
    private http: HttpClient
  ) { }

 
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  create(model: CreateRoleRequest): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, model);
  }

  update(
    id: number,
    model: UpdateRoleRequest
  ): Observable<Role> {
    return this.http.put<Role>(
      `${this.apiUrl}/${id}`,
      model
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  activate(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/activate`,
      {}
    );
  }

  deactivate(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/deactivate`,
      {}
    );
  }

  
  search(filter: RoleFilter): Observable<Role[]> {
    return this.http.post<Role[]>(
      `${this.apiUrl}/search`,
      filter
    );
  }


  getStatistics(): Observable<RoleStatistics> {
   return this.http.get<RoleStatistics>(
  `${this.apiUrl}/statistics`
);
  }

  getLookup(): Observable<RoleLookup[]> {
    return this.http.get<RoleLookup[]>(
      `${this.apiUrl}/lookup`
    );
  }

 
  exists(
    roleName: string,
    excludeId?: number
  ): Observable<{ exists: boolean }> {

    let url =
      `${this.apiUrl}/exists?roleName=${encodeURIComponent(roleName)}`;

    if (excludeId !== undefined) {
      url += `&excludeId=${excludeId}`;
    }

    return this.http.get<{ exists: boolean }>(url);
  }

  assignPermissions(
    roleId: number,
    model: AssignPermissionsRequest
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${roleId}/assign-permissions`,
      model
    );
  }

  getPermissions(roleId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/${roleId}/permissions`
    );
  }

  clone(
    roleId: number,
    newRoleName: string
  ): Observable<Role> {

    return this.http.post<Role>(
      `${this.apiUrl}/${roleId}/clone?newRoleName=${encodeURIComponent(newRoleName)}`,
      {}
    );
  }

  assignUsers(
    roleId: number,
    model: AssignUsersRequest
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/${roleId}/assign-users`,
      model
    );
  }

  getUsers(roleId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${roleId}/users`
    );
  }

  removeUser(
    roleId: number,
    userId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${roleId}/users/${userId}`
    );
  }

}