import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import {
  Observable,
  BehaviorSubject,
  throwError
} from 'rxjs';

import {
  catchError,
  filter,
  switchMap,
  take
} from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  private refreshTokenSubject =
    new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    if (token) {

      request = this.addToken(
        request,
        token
      );

    }

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

        if (

          error.status === 401 &&

          !request.url.includes('/Auth/login') &&

          !request.url.includes('/Auth/register') &&

          !request.url.includes('/Auth/forgot-password') &&

          !request.url.includes('/Auth/reset-password') &&

          !request.url.includes('/Auth/refresh-token')

        ) {

          return this.handle401Error(
            request,
            next
          );

        }

        return throwError(() => error);

      })

    );

  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.isRefreshing) {

      this.isRefreshing = true;

      this.refreshTokenSubject.next(null);

      return this.authService
        .refreshToken()
        .pipe(

          switchMap(response => {

            this.isRefreshing = false;

            this.refreshTokenSubject.next(
              response.accessToken
            );

            this.authService.saveTokens(

              response.accessToken,

              response.refreshToken,

              this.authService.isRememberMe()

            );

            // Restart refresh timer
            this.authService.startRefreshTimer();

            return next.handle(

              this.addToken(

                request,

                response.accessToken

              )

            );

          }),

          catchError(error => {

            this.isRefreshing = false;

            this.refreshTokenSubject.next(null);

            this.authService.logout();

            return throwError(() => error);

          })

        );

    }

    return this.refreshTokenSubject.pipe(

      filter(token => token !== null),

      take(1),

      switchMap(token =>

        next.handle(

          this.addToken(

            request,

            token!

          )

        )

      )

    );

  }

  private addToken(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {

    return request.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`

      }

    });

  }

}