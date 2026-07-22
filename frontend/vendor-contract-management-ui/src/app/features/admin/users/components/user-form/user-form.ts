import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Vendor } from '../../../../../core/models/vendor.model';
import { Role } from '../../../../../core/models/role.model';
import { VendorService } from '../../../../../core/services/vendor.service';
import { RoleService } from '../../../../../core/services/role.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserFormComponent
implements OnInit {

  @Input() editMode = false;

  @Input() form!: FormGroup;

  @Output() save =
    new EventEmitter<void>();
    @Output()
cancel = new EventEmitter<void>();

  vendors: Vendor[] = [];

  roles: Role[] = [];

  constructor(
    private vendorService: VendorService,
    private roleService: RoleService
  ){}

  ngOnInit(): void {

    this.loadVendors();

    this.loadRoles();

  }

  loadVendors(){

    this.vendorService
      .getAll()
      .subscribe(x=>this.vendors=x);

  }

  loadRoles(){

    this.roleService
      .getAll()
      .subscribe(x=>this.roles=x);

  }

}