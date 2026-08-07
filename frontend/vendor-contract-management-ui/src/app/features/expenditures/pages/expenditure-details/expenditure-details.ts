import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ExpenditureService } from '../../../../core/services/expenditure.service';
import { Expenditure } from '../../../../core/models/expenditures-model/expenditure.model';

@Component({
  selector: 'app-expenditure-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './expenditure-details.html',
  styleUrl: './expenditure-details.scss'
})
export class ExpenditureDetailsComponent implements OnInit {

  constructor(
  private cdr: ChangeDetectorRef
) {
}
  private service = inject(ExpenditureService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  loading = true;

  expenditure!: Expenditure;

  ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.service
      .getById(id)
      .subscribe({

        next: res => {

          this.expenditure = res;

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: () => {

          this.router.navigate(['/expenditures']);

        }

      });

  }

  edit(): void {

    this.router.navigate([
      '/expenditures/edit',
      this.expenditure.id
    ]);

  }

  back(): void {

    this.router.navigate([
      '/expenditures'
    ]);

  }

}