import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Role } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/role.service';
import { ChangeDetectorRef } from '@angular/core';
import { RoleGeneralInfoComponent } from '../role-general-info/role-general-info';
import { RoleAppearanceInfoComponent } from '../role-appearance-info/role-appearance-info';
import { RoleUsageInfoComponent } from '../role-usage-info/role-usage-info';
@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [
    CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  RoleGeneralInfoComponent,
RoleAppearanceInfoComponent,
RoleUsageInfoComponent,
  ],
  templateUrl: './role-details.html',
  styleUrl: './role-details.scss'
})
export class RoleDetailsComponent implements OnInit {

  role?: Role;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      if (!id) {

        this.router.navigate(['/roles']);

        return;

      }

      this.loadRole(id);

    });

  }

  private loadRole(id: number): void {

    this.loading = true;

    this.roleService.getById(id).subscribe({

    next: (role) => {

  this.role = role;

  this.loading = false;

  this.cdr.detectChanges();

  console.log("Role =", this.role);
  console.log("Loading =", this.loading);

},

      error: (err) => {

          console.log('GET ERROR', err);
        this.loading = false;

        this.router.navigate(['/roles']);

      }

    });

  }

  edit(): void {

if (!this.role) return;

this.router.navigate([
'/roles/edit',
this.role.id
]);

}

  back(): void {

    this.router.navigate(['/roles']);

  }

  canDeactivate(): boolean {

  return true;

}

}