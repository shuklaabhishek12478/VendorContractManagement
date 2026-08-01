import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

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

  logout(): void {

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  this.router.navigate(['/login']);

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


getToken(): string | null {

    return localStorage.getItem('access_token');

}

register(model: RegisterRequest) {

  return this.http.post(
    `${environment.apiUrl}/auth/register`,
    model,
    {
      responseType: 'text'
    }
  );
}

forgotPassword(email: string) {

  return this.http.post(

    `${this.apiUrl}/forgot-password`,

    {
      email
    }

  );

}

resetForgotPassword(
  token: string,
  password: string
) {

  return this.http.post(

    `${this.apiUrl}/reset-password`,

    {

      token,

      password

    }

  );

}

}