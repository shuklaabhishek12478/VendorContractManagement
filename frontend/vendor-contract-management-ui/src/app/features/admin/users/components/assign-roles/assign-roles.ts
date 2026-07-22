import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../../../core/services/user.service';
import { RoleService } from '../../../../../core/services/role.service';

import { Role } from '../../../../../core/models/role.model';
import { User } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-assign-roles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './assign-roles.html',
  styleUrl: './assign-roles.scss'
})
export class AssignRolesComponent implements OnInit {

  userId = 0;

  user?: User;

  roles: Role[] = [];

  filteredRoles: Role[] = [];

  selectedRoles: number[] = [];

  searchText = '';

  loading = false;

  

selectedAvailable: Role[] = [];

selectedAssigned: Role[] = [];
availableRoles = this.filteredRoles;

assignedRoles: Role[] = [];

filteredAvailableRoles: Role[] = [];

selectedAvailableRoles: Role[] = [];

selectedAssignedRoles: Role[] = [];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  this.userId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.loadRoles();

}

  loadRoles(): void {

    this.roleService
      .getAll()
      .subscribe({

        next: roles => {

          this.roles = roles;

    this.loadUserRoles();


        }

      });

  }

 loadUserRoles(): void {

  this.loading = true;

  this.userService
      .getById(this.userId)
      .subscribe({

        next: user => {

          this.user = user;

          // user.roles = ["Admin","Manager"]

          this.selectedRoles = [...user.roleIds];

this.assignedRoles =
    this.roles.filter(r =>
        this.selectedRoles.includes(r.id));

this.availableRoles =
    this.roles.filter(r =>
        !this.selectedRoles.includes(r.id));

          this.filteredAvailableRoles = [
            ...this.availableRoles
          ];

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;

        }

      });

}

 
filterRoles(): void {

    const text =
        this.searchText.toLowerCase();

    this.filteredAvailableRoles =
        this.availableRoles.filter(x =>
            x.name.toLowerCase().includes(text));

}

 save(): void {

    this.loading = true;

    const roleIds = this.assignedRoles.map(x => x.id);

    this.userService
        .assignRoles(this.userId, roleIds)
        .subscribe({

            next: () => {

                this.loading = false;

                this.snackBar.open(

                    'Roles updated successfully.',

                    'Close',

                    {

                        duration: 3000

                    });

                this.router.navigate([
                    '/users',
                    this.userId
                ]);

            },

            error: () => {

                this.loading = false;

                this.snackBar.open(

                    'Unable to update roles.',

                    'Close',

                    {

                        duration:3000

                    });

            }

        });

}

selectAll(): void {
  this.selectedAvailableRoles = [...this.availableRoles];

  this.assignedRoles = [...this.roles];

  this.availableRoles = [];

  this.filteredAvailableRoles = [];

}

clearSelection(): void {

  this.availableRoles = [...this.roles];

  this.filteredAvailableRoles = [...this.roles];

  this.assignedRoles = [];
    this.selectedAvailableRoles = [];
  this.selectedAssignedRoles = [];

}

moveRight(): void {

    this.selectedAvailableRoles.forEach(role => {

        if (!this.assignedRoles.some(x => x.id === role.id)) {

            this.assignedRoles.push(role);

        }

    });

    this.availableRoles = this.availableRoles.filter(

        r => !this.selectedAvailableRoles.some(

            x => x.id === r.id)

    );

    this.filteredAvailableRoles = [...this.availableRoles];

    this.selectedAvailableRoles = [];

}

moveLeft(): void {

    this.selectedAssignedRoles.forEach(role => {

        if (!this.availableRoles.some(x => x.id === role.id)) {

            this.availableRoles.push(role);

        }

    });

    this.assignedRoles = this.assignedRoles.filter(

        r => !this.selectedAssignedRoles.some(

            x => x.id === r.id)

    );

    this.filteredAvailableRoles = [...this.availableRoles];

    this.selectedAssignedRoles = [];

}

}