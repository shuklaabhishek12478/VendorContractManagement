import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PermissionRule } from '../../../../../../core/models/permission-rule.model';
import { PermissionRuleService } from '../../../../../../core/services/permission-matrix/permission-rule.service';

@Component({
  selector: 'app-permission-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-summary.html',
  styleUrl: './permission-summary.scss'
})
export class PermissionSummaryComponent implements OnInit{

  @Input() assignedPermissions = 0;

  @Input() totalPermissions = 0;

  @Input() moduleCount = 0;
  rules: PermissionRule[] = [];

  constructor(
    private permissionRuleService:
    PermissionRuleService
) { }

ngOnInit(): void {

    this.permissionRuleService
        .getRules()
        .subscribe({

            next: data => {

                this.rules = data;

            },
            error: err => {

                console.error(
                    'Unable to load permission rules',
                    err
                );

            }

        });

}

}