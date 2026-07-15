import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RoleFormComponent } from '../../components/role-form/role-form';

import {
  Role,
  UpdateRoleRequest
} from '../../../../core/models/role.model';

import { RoleService } from '../../../../core/services/role.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    RoleFormComponent,
  RouterLink,
  MatButtonModule,
  MatIconModule
  ],
  templateUrl: './edit-role.html',
  styleUrl: './edit-role.scss'
})
export class EditRoleComponent implements OnInit {

  role?: Role;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.roleService.getById(id).subscribe({

      next: res => {

        this.role = res;

      }

    });

  }

  save(model: UpdateRoleRequest): void {

    if (!this.role) return;

    this.loading = true;

    this.roleService.update(
      this.role.id,
      model
    ).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Role updated successfully.',
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
          'Unable to update role.',
          'Close',
          {
            duration: 3000
          });

      }

    });

  }

}