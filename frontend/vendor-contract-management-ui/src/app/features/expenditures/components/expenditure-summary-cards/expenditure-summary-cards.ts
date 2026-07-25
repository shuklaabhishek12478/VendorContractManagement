import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ExpenditureSummary } from '../../../../core/models/expenditures-model/expenditure-summary.model';


@Component({
  selector: 'app-expenditure-summary-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './expenditure-summary-cards.html',
  styleUrl: './expenditure-summary-cards.scss'
})
export class ExpenditureSummaryCardsComponent {

  @Input({ required: true })
  summary!: ExpenditureSummary;

}