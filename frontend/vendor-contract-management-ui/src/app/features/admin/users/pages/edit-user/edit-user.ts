import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserFormComponent } from '../../components/user-form/user-form';
import { UserService } from '../../../../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
     RouterModule,
    UserFormComponent
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUserComponent
implements OnInit {

  id = 0;

  loading = false;

  saving = false;
  form!: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({

    fullName: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    vendorId: [null],

    roleIds: [[]],

    isActive: [true]

  });
  }

 ngOnInit(): void {

  this.id = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.loadUser();

}

  loadUser() {

    this.loading = true;

    this.userService
      .getById(this.id)
      .subscribe({

        next: user => {

          this.form.patchValue({

            fullName: user.fullName,

            email: user.email,

            vendorId: user.vendorId,

            roleIds:user.roleIds,

            isActive: user.isActive

          });

          this.loading = false;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

save() {

  if (this.form.invalid) {
    console.log('Form Invalid', this.form.value);
    return;
  }

  console.log('Calling Update...');

  this.userService.update(this.id, this.form.value)
    .subscribe({

      next: (res) => {

        console.log('Update Success');
        console.log(res);

        this.snackBar.open(
          'User updated successfully.',
          'Close',
          { duration: 3000 }
        );

        console.log('Before Navigate');

        this.router.navigate(['/users', this.id])
          .then(result => {
            console.log('Navigate Result', result);
          })
          .catch(err => {
            console.log('Navigation Error', err);
          });

      },

      error: (err: any) => {

  console.log("========== ERROR ==========");
  console.dir(err);
  console.log("status =", err?.status);
  console.log("message =", err?.message);
  console.log("error =", err?.error);
  console.log("url =", err?.url);

}

    });

}

goBack() {
    this.router.navigate(['/users']);
}
}