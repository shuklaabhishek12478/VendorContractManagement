import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../../../core/models/role.model';

@Component({
  selector: 'app-role-general-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-general-info.html',
  styleUrl: './role-general-info.scss'
})
export class RoleGeneralInfoComponent {

  @Input({ required: true })
  role!: Role;

}