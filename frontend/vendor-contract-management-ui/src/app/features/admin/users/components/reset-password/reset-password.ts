import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../../../core/services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPasswordComponent implements OnInit {

  userId = 0;

  saving = false;

  form!: FormGroup;
  hidePassword = true;

hideConfirmPassword = true;

strength = 0;
strengthPercentage = 0;

strengthLabel = 'Weak';
strengthText = 'Weak';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.userId = Number(

      this.route.snapshot.paramMap.get('id')

    );

    this.form = this.fb.group({

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

  }

  save(): void {

    if (this.form.invalid)
      return;

    if (

      this.form.value.password !==

      this.form.value.confirmPassword

    ){

      this.snackBar.open(

        'Passwords do not match.',

        'Close',

        {

          duration:3000

        });

      return;

    }

    this.saving = true;

    this.userService

      .resetPassword(

        this.userId,

        this.form.value.password

      )

      .subscribe({

        next:()=>{

          this.snackBar.open(

            'Password reset successfully.',

            'Close',

            {

              duration:3000

            });

          this.router.navigate([

            '/users',

            this.userId

          ]);

        },

        error:()=>{

          this.saving=false;

        }

      });

  }


  checkStrength(): void {

  const password =
    this.form.value.password ?? '';

  let score = 0;

  if(password.length>=8)
    score+=25;

  if(/[A-Z]/.test(password))
    score+=25;

  if(/[0-9]/.test(password))
    score+=25;

  if(/[^A-Za-z0-9]/.test(password))
    score+=25;

  this.strength=score;

  if(score<=25){

    this.strengthText='Weak';

  }

  else if(score<=50){

    this.strengthText='Fair';

  }

  else if(score<=75){

    this.strengthText='Good';

  }

  else{

    this.strengthText='Strong';

  }

}

}

