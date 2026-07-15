import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl =
    'https://localhost:7220/api/Permission';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Permission[]> {

    return this.http.get<Permission[]>(this.apiUrl);

  }

}