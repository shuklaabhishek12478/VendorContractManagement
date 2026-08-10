import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Permission } from '../models/permission.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/Permission`;

  private userPermissions = new Set<string>();

  private userRole: string | null = null;

  private readonly permissionsSubject =
    new BehaviorSubject<Set<string>>(new Set());

  readonly permissions$ =
    this.permissionsSubject.asObservable();


  getAll(): Observable<Permission[]> {

    return this.http.get<Permission[]>(
      this.apiUrl
    );

  }


  setUserRole(role: string | null | undefined): void {

    this.userRole =
      role?.trim() || null;

    console.log(
      'Permission Service Role:',
      this.userRole
    );

  }


  setPermissions(
    permissions: string[] | null | undefined
  ): void {

    console.log(
      'Permissions received:',
      permissions
    );

    this.userPermissions.clear();

    if (permissions?.length) {

      permissions.forEach(permission => {

        if (!permission) {
          return;
        }

        this.userPermissions.add(
          permission.trim()
        );

      });

    }

    console.log(
      'Permissions stored:',
      this.getPermissions()
    );

    this.permissionsSubject.next(
      new Set(this.userPermissions)
    );

  }


  hasPermission(permission: string): boolean {

    if (!permission) {
      return false;
    }

    const normalizedPermission =
      permission.trim();


    // ============================================
    // 1. Super Admin / Admin full access
    // ============================================

    if (
      this.userRole === 'Super Admin' ||
      this.userRole === 'Admin'
    ) {
      return true;
    }


    // ============================================
    // 2. Wildcard full access
    // ============================================

    if (
      this.userPermissions.has('*') ||
      this.userPermissions.has('ALL')
    ) {
      return true;
    }


    // ============================================
    // 3. Normal permission check
    // ============================================

    return this.userPermissions.has(
      normalizedPermission
    );

  }


  hasAnyPermission(
    permissions: string[]
  ): boolean {

    if (!permissions?.length) {
      return false;
    }

    return permissions.some(
      permission =>
        this.hasPermission(permission)
    );

  }


  hasAllPermissions(
    permissions: string[]
  ): boolean {

    if (!permissions?.length) {
      return false;
    }

    return permissions.every(
      permission =>
        this.hasPermission(permission)
    );

  }


  clearPermissions(): void {

    this.userPermissions.clear();

    this.userRole = null;

    this.permissionsSubject.next(
      new Set()
    );

  }


  getPermissions(): string[] {

    return Array.from(
      this.userPermissions
    );

  }

}