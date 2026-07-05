import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/Auth`;

  login(
    payload: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      payload
    );
  }

  logout() {

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'access_token'
    );
  }

  getRole(): string | null {

  const token = localStorage.getItem('access_token');

  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  return (
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
    payload["role"] ??
    null
  );

}

isAdmin(): boolean {

  return this.getRole() === 'Admin';

}
}