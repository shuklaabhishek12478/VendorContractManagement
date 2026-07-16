import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../../core/models/role.model';

@Component({
  selector: 'app-role-appearance-info',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './role-appearance-info.html',
  styleUrl: './role-appearance-info.scss'
})
export class RoleAppearanceInfoComponent {

  @Input({ required: true })
  role!: Role;

}