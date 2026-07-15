import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RoleFormComponent } from '../../components/role-form/role-form';
import { RoleService } from '../../../../core/services/role.service';
import { CreateRoleRequest } from '../../../../core/models/role.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-role.html',
  styleUrl: './add-role.scss'
})
export class AddRoleComponent {
loading = false;


  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  
  save(model: CreateRoleRequest): void {

  this.loading = true;

  this.roleService.create(model).subscribe({

    next: () => {

      this.loading = false;

      this.snackBar.open(
        'Role created successfully.',
        'Close',
        {
          duration: 3000
        });

      this.router.navigate(['/roles']);

    },

    error: err => {

      this.loading = false;

      this.snackBar.open(

        err.error?.message ||

        'Unable to create role.',

        'Close',

        {

          duration: 3000

        });

    }

  });

}

}