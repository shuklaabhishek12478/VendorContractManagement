import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CreateRoleRequest, Role } from '../../../../core/models/role.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
       CommonModule,
    MatCardModule,
MatButtonModule,
MatIconModule,
AgGridModule,
FormsModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatSlideToggleModule 
  ],
  templateUrl: './role-form.html',
  styleUrl: './role-form.scss'
})
export class RoleFormComponent {
    private fb = inject(FormBuilder);
  @Input()
  role?: Role;

  @Input() loading = false;

  @Output()
  save = new EventEmitter<CreateRoleRequest>();

  form = this.fb.group({

    name: ['', Validators.required],

    description: [''],

    color: ['#2563EB'],

    icon: ['admin_panel_settings'],

    priority: [1],

    isActive: [true]

  });

  constructor(
   
  ) {}

  ngOnInit(): void {

    if (this.role) {

      this.form.patchValue(this.role);

    }

  }

  submit(): void {

    if (this.form.invalid) return;

    this.save.emit(
      this.form.getRawValue() as CreateRoleRequest
    );

  }

}