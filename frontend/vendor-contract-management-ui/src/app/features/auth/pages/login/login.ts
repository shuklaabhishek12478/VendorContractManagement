import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { IdleTimeoutService } from '../../../../core/services/idle-timeout.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
     CommonModule,
  ReactiveFormsModule,
  RouterLink,
  MatSnackBarModule,
  MatIconModule,
  MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private sessionService = inject(SessionService);
  private idleTimeoutService = inject(IdleTimeoutService);

  loading = false;
  hidePassword = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required,  Validators.email]],
    password: ['', [Validators.required,  Validators.minLength(6)]],
    rememberMe: [false]
  });

  login() {

    if (this.loginForm.invalid)
      return;

    this.loading = true;

    this.authService
      .login(this.loginForm.getRawValue() as any)
      .subscribe({

       next: (response) => {

          console.log('LOGIN SUCCESS');
  console.log(response);

  this.loading = false;

  this.authService.saveTokens(

      response.accessToken,

      response.refreshToken,

      this.loginForm.value.rememberMe ?? false

  );

  this.authService.startRefreshTimer();
  this.sessionService.start();
  this.idleTimeoutService.start();
  this.router.navigateByUrl('/dashboard').then(result => {

  console.log('Navigation Result : ', result);

});
      localStorage.getItem('access_token');
      sessionStorage.getItem('access_token');

  this.snackBar.open(

      'Login successful',

      'Close',

      {

        duration:2000,

        horizontalPosition:'right',

        verticalPosition:'top'

      }

  );

  

},

        error: (err) => {

  this.loading = false;

  this.snackBar.open(

    err.error?.message ??
    'Login failed.',

    'Close',

    {

      duration: 4000,

      horizontalPosition: 'right',

      verticalPosition: 'top'

    }

  );

}
      });
  }

  
}