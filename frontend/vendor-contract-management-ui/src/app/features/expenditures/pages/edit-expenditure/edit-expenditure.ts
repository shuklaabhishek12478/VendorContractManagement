import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ExpenditureService } from '../../../../core/services/expenditure.service';

import { Expenditure } from '../../../../core/models/expenditures-model/expenditure.model';

import { ExpenditureFormComponent } from '../../components/expenditure-form/expenditure-form';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-edit-expenditure',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    ExpenditureFormComponent
  ],
  templateUrl: './edit-expenditure.html',
  styleUrl: './edit-expenditure.scss'
})
export class EditExpenditureComponent implements OnInit {

    constructor(
  private cdr: ChangeDetectorRef,
 
) {
}

  @ViewChild(ExpenditureFormComponent)
  formComponent!: ExpenditureFormComponent;

  private readonly service = inject(ExpenditureService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly snackBar = inject(MatSnackBar);

  id!: number;

  loading = true;

  saving = false;

  expenditure: Expenditure | null = null;

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadExpenditure();

  }

  private loadExpenditure(): void {

    this.loading = true;

    this.service
      .getById(this.id)
      .subscribe({

        next: response => {

          this.expenditure = response;

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;

          this.snackBar.open(
            'Unable to load expenditure.',
            'Close',
            {
              duration: 3000
            });

          this.router.navigate([
            '/expenditures'
          ]);

        }

      });

  }

  save(): void {

    if (!this.formComponent.isValid()) {

      this.formComponent.markAllAsTouched();

      return;

    }

    this.saving = true;

    this.service
      .update(
        this.id,
        this.formComponent.getUpdateModel()
      )
      .subscribe({

        next: response => {
          console.log(response);
          this.expenditure = response;
          this.saving = false;
          
          this.snackBar.open(
            'Expenditure updated successfully.',
            'Close',
            {
              duration: 3000
            });

          this.router.navigate([
            '/expenditures/details'
            
          ]);

           this.cdr.detectChanges();
        },

        error: (err) => {
           console.error("UPDATE ERROR", err);
          this.saving = false;

          this.snackBar.open(
            'Failed to update expenditure.',
            'Close',
            {
              duration: 3000
            });

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/expenditures/details',
      this.id
    ]);

  }

}