import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Role } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-clone-role',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './clone-role.html',
  styleUrl: './clone-role.scss'
})
export class CloneRoleComponent {

  loading = true;
  saving = false;

  role!: Role;

  roleName = '';
  private initialRoleName = '';

hasChanges = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.roleService.getById(id).subscribe({

      next: (role: Role) => {

        this.role = role;

        this.roleName = `${role.name} Copy`;

this.initialRoleName = this.roleName;

        this.loading = false;
         this.cdr.detectChanges();

      },

      error: () => {

        this.snackBar.open(
          'Unable to load role.',
          'Close',
          {
            duration: 3000
          });

        this.router.navigate(['/roles']);

      }

    });

  }

  generateName(): void {

    const random = Math.floor(Math.random() * 1000);

    this.roleName = `${this.role.name} Copy ${random}`;

  }

  cloneRole(): void {

    if (!this.roleName.trim()) {
      return;
    }

    this.saving = true;

    this.roleService
      .clone(
        this.role.id,
        this.roleName.trim()
      )
      .subscribe({

        next: () => {

          this.saving = false;

          this.snackBar.open(
            'Role cloned successfully.',
            'Close',
            {
              duration: 3000
            });

          this.router.navigate(['/roles']);

        },

        error: err => {

          this.saving = false;

          this.snackBar.open(

            err.error?.message ||

            'Unable to clone role.',

            'Close',

            {
              duration: 3000
            });

        }

      });

  }

  checkChanges(): void {

  this.hasChanges =
      this.roleName.trim() !== this.initialRoleName.trim();

}

canDeactivate(): boolean {

    return !this.hasChanges;

}

}