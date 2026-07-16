import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-assign-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './assign-user-dialog.html',
  styleUrls: ['./assign-user-dialog.scss']
})
export class AssignUserDialogComponent implements OnInit {

  users: (User & { selected: boolean })[] = [];

  searchText = '';

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private userService: UserService,

    private dialogRef:
      MatDialogRef<AssignUserDialogComponent>

  ) {}

  ngOnInit(): void {

    this.userService.getAll().subscribe(res => {

      this.users = res.map(user => ({

        ...user,

        selected:
          this.data.currentUsers?.includes(user.id) ?? false

      }));

    });

  }

  get filteredUsers() {

    if (!this.searchText.trim()) {

      return this.users;

    }

    const search =
      this.searchText.toLowerCase();

    return this.users.filter(user =>

      user.fullName.toLowerCase().includes(search) ||

      user.email.toLowerCase().includes(search)

    );

  }

  get selectedCount(): number {

    return this.users.filter(x => x.selected).length;

  }

  save(): void {

    this.dialogRef.close(

      this.users

        .filter(x => x.selected)

        .map(x => x.id)

    );

  }

}