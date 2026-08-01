import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password-reset.html',
  styleUrl: './forgot-password-reset.scss'
})
export class ForgotPasswordResetComponent implements OnInit {

  constructor(
     private cdr: ChangeDetectorRef,
   private snackBar: MatSnackBar,
   ){}
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  loading = false;

  token = '';

  form = this.fb.group({

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

    ]

  });

  ngOnInit(): void {

    this.token =
      this.route.snapshot.queryParamMap.get('token') ?? '';

  }

  submit(): void {

    if (this.form.invalid)
      return;

    if (
      this.form.value.password !==
      this.form.value.confirmPassword
    ) {

      alert('Passwords do not match.');

      return;

    }

    this.loading = true;

    this.authService.resetForgotPassword(

      this.token,

      this.form.value.password!

    ).subscribe({

      next: () => {

        alert('Password changed successfully.');

        this.router.navigate(['/login']);
         this.cdr.detectChanges();
      },

      error: (err) => {

        this.loading = false;

        alert(

          err.error?.message ??

          'Reset link expired.'

        );

      }

    });

  }

}