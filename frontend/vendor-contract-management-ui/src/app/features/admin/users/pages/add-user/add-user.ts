import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { UserFormComponent } from '../../components/user-form/user-form';
import { UserService } from '../../../../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    UserFormComponent,
    RouterModule
  ],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss'
})
export class AddUserComponent {

  saving = false;
  
  form!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({

      fullName: ['', Validators.required],

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

      vendorId: [null],

      roleIds: [[]]

    });

  }

  

  save() {

  if (this.form.invalid)
    return;

  this.saving = true;

  this.userService
    .create(this.form.value)
    .subscribe({

      next: () => {

        this.snackBar.open(
          'User created successfully.',
          'Close',
          {
            duration: 3000
          });

        this.router.navigate(['/users']);

      },

      error: (err) => {

        console.error(err);

        this.saving = false;

        this.snackBar.open(
          'Unable to create user.',
          'Close',
          {
            duration: 3000
          });

      }

    });

}
goBack() {
    this.router.navigate(['/users']);
}
  

}