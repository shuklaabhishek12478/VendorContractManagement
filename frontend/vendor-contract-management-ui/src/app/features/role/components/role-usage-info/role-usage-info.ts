import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../../../core/models/role.model';

@Component({
  selector: 'app-role-usage-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-usage-info.html',
  styleUrl: './role-usage-info.scss'
})
export class RoleUsageInfoComponent {

  @Input({ required: true })
  role!: Role;

}