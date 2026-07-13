import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-forecast-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-forecast-card.html',
  styleUrls: ['./budget-forecast-card.scss']
})
export class BudgetForecastCardComponent implements OnChanges {

  @Input()
  budget = 0;

  @Input()
  currentSpend = 0;

  @Input()
  forecastSpend = 0;

  remaining = 0;

  percentage = 0;

  risk = '';

  riskColor = '';

  ngOnChanges(): void {

    this.remaining = this.budget - this.forecastSpend;

    this.percentage = this.budget === 0
      ? 0
      : (this.forecastSpend / this.budget) * 100;

    if (this.percentage < 70) {

      this.risk = 'Safe';
      this.riskColor = 'safe';

    }

    else if (this.percentage < 90) {

      this.risk = 'Warning';
      this.riskColor = 'warning';

    }

    else {

      this.risk = 'Over Budget';
      this.riskColor = 'danger';

    }

  }

}