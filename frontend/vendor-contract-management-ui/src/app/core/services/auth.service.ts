import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/user-approval-model/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
 
  private apiUrl =
    `${environment.apiUrl}/Auth`;

  private refreshTimer: any;

  login(
    payload: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      payload
    );
  }

logout(): void {

  clearTimeout(this.refreshTimer);

   // this.idleTimeoutService.stop();
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('remember_me');

  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('remember_me');
  
  this.router.navigate(['/login']);

}

  isLoggedIn(): boolean {

  return !!(
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token')
  );

}

  getRole(): string | null {

  const token =
  localStorage.getItem('access_token') ??
  sessionStorage.getItem('access_token');

  if (!token) return null;

  const payload =
this.parseJwt(token);

if(!payload)
return null;

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

  return (
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token')
  );

}

register(model: RegisterRequest) :Observable<any>{

  return this.http.post(
    `${environment.apiUrl}/auth/register`,
    model,
    {
      responseType: 'text'
    }
  );
}

forgotPassword(email: string) :Observable<any>{

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
) :Observable<any>{

  return this.http.post(

    `${this.apiUrl}/reset-password`,

    {

      token,

      password

    }

  );

}

refreshToken() {

  const refreshToken = this.getRefreshToken();
   // localStorage.getItem('refresh_token') ??
   // sessionStorage.getItem('refresh_token');

  return this.http.post<LoginResponse>(

    `${this.apiUrl}/refresh-token`,

    {

      refreshToken

    }

  );

}

saveTokens(
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean
) {

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('remember_me');

  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('remember_me');

  const storage =
    rememberMe
      ? localStorage
      : sessionStorage;

  storage.setItem('access_token', accessToken);
  storage.setItem('refresh_token', refreshToken);
  storage.setItem('remember_me', rememberMe.toString());

}

getRefreshToken(): string | null {

  return (
    localStorage.getItem('refresh_token') ??
    sessionStorage.getItem('refresh_token')
  );

}

isRememberMe(): boolean {

  return (

    localStorage.getItem('remember_me') === 'true' ||

    sessionStorage.getItem('remember_me') === 'true'

  );

}

private parseJwt(token: string): any {

  try {

    return JSON.parse(
      atob(token.split('.')[1])
    );

  }

  catch {

    return null;

  }

}

getTokenExpiry(): Date | null {

  const token = this.getToken();

  if (!token)
    return null;

  const payload = this.parseJwt(token);

  if (!payload.exp)
    return null;

  return new Date(payload.exp * 1000);

}

getRemainingTime(): number {

  const expiry = this.getTokenExpiry();

  if (!expiry)
    return 0;

  return expiry.getTime() - Date.now();

}

startRefreshTimer() {

  const remainingTime =
    this.getRemainingTime();

  if (remainingTime <= 0)
    return;

  // Refresh 2 minutes before expiry

  const timeout =

Math.max(

remainingTime - (2 * 60 * 1000),

5000

);

  

  clearTimeout(this.refreshTimer);

  this.refreshTimer = setTimeout(() => {

    this.refreshToken().subscribe({

      next: response => {

        this.saveTokens(

          response.accessToken,

          response.refreshToken,

          this.isRememberMe()

        );

        // Restart timer

        this.startRefreshTimer();

      },

      error: () => {

        this.logout();

      }

    });

  }, timeout);

}

getCurrentUser() {

  return this.http.get<CurrentUser>(
    `${this.apiUrl}/me`
  );

}
}