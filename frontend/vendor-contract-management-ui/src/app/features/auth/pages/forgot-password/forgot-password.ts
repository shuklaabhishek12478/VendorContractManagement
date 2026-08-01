import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPasswordComponent {

   constructor(
     private cdr: ChangeDetectorRef,
   private snackBar: MatSnackBar,
   ){}
  private fb = inject(FormBuilder);
   private router = inject(Router);
  private authService = inject(AuthService);
  loading = false;

  emailSent = false;

  form = this.fb.group({

    email: [

      '',

      [

        Validators.required,

        Validators.email

      ]

    ]

  });

  submit(): void {

    if (this.form.invalid)
      return;

    this.loading = true;

    this.authService
      .forgotPassword(
        this.form.value.email!
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.emailSent = true;

          this.router.navigate(['/login']);

          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;

          this.snackBar.open(
'Unable to send reset email.',
'Close',
{
duration:3000
});

        }

      });

  }

}