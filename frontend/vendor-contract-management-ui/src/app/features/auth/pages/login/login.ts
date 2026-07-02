import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  login() {

    if (this.loginForm.invalid)
      return;

    this.loading = true;

    this.authService
      .login(this.loginForm.getRawValue() as any)
      .subscribe({

        next: (response) => {

          localStorage.setItem(
            'access_token',
            response.accessToken
          );

          localStorage.setItem(
            'refresh_token',
            response.refreshToken
          );

          this.router.navigate(['/dashboard']);
        },

        error: () => {

          alert('Invalid credentials');
          this.loading = false;
        }
      });
  }
}