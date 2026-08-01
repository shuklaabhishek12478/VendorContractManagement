import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../../core/services/auth.service';
import { RegisterRequest } from '../../../../core/models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {

constructor(
  
  private cdr: ChangeDetectorRef,

 
) {}

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading = false;

  registerForm = this.fb.group(
    {
      fullName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ],

      vendorId: [null]
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const value = this.registerForm.getRawValue();

    const model: RegisterRequest = {
      fullName: value.fullName ?? '',
      email: value.email ?? '',
      password: value.password ?? '',
      confirmPassword: value.confirmPassword ?? '',
      vendorId: value.vendorId
    };

    this.authService.register(model).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Registration submitted successfully. Please wait for administrator approval.',
          'Close',
          {
            duration: 5000
          }
        );
         this.cdr.detectChanges();

        this.router.navigate(['/login']);

      },

      error: err => {

        this.loading = false;

        this.snackBar.open(
          err.error?.message ?? 'Registration failed.',
          'Close',
          {
            duration: 4000
          }
        );

      }

    });

  }

}