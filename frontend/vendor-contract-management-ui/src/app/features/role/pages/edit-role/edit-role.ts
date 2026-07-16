import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
import { RoleFormComponent } from '../../components/role-form/role-form';

import {
  Role,
  UpdateRoleRequest
} from '../../../../core/models/role.model';

import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
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
    private roleService: RoleService,
  private cdr: ChangeDetectorRef
  ) {}

 
 ngOnInit(): void {

  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    if (!id || isNaN(id)) {

      this.snackBar.open(
        'Invalid role id.',
        'Close',
        {
          duration: 3000
        }
      );

      this.router.navigate(['/roles']);

      return;
    }

    this.loadRole(id);

  });

}

  private loadRole(id: number): void {

  console.log('LOAD ROLE START');

  this.loading = true;

  this.roleService.getById(id).subscribe({

    next: (role) => {

  console.log("NEXT");

  this.role = role;

  this.loading = false;

  this.cdr.detectChanges();

  console.log("ROLE =", this.role);
  console.log("LOADING =", this.loading);

},

  });

}

 save(model: UpdateRoleRequest): void {

  const role = this.role;

  if (!role) {
    return;
  }

  this.loading = true;

  this.roleService.update(role.id, model).subscribe({

    next: () => {

      this.loading = false;

      this.snackBar.open(
        'Role updated successfully.',
        'Close',
        {
          duration: 3000
        }
      );
      this.router.navigate([
        '/roles',
        role.id
      ]);

    },

    error: (err) => {

      this.loading = false;

      this.snackBar.open(
        err.error?.message ?? 'Unable to update role.',
        'Close',
        {
          duration: 3000
        }
      );

    }

  });

}
canDeactivate(): boolean {

  return true;

}

cancel(): void {

  if (!this.role) {

    this.router.navigate(['/roles']);

    return;

  }

  this.router.navigate([
    '/roles',
    this.role.id
  ]);

}
}