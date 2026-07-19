import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-role-compare',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './permission-role-compare.html',
  styleUrl: './permission-role-compare.scss'
})
export class PermissionRoleCompareComponent {

  @Input() roles:any[]=[];

  @Input() compareRoleId=0;

  @Output() compareRoleIdChange =
      new EventEmitter<number>();

}