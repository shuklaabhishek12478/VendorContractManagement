import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector: 'app-contract-status-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './contract-status-chart.html',
  styleUrls: ['./contract-status-chart.scss']
})
export class ContractStatusChartComponent implements OnChanges {

  @Input()
  labels: string[] = [];

  @Input()
  values: number[] = [];

  series: ApexNonAxisChartSeries = [];

  chart: ApexChart = {
    type: 'donut',
    height: 340
  };

  legend: ApexLegend = {
    position: 'bottom'
  };

  tooltip: ApexTooltip = {
    theme: 'light'
  };

  dataLabels: ApexDataLabels = {
    enabled: false
  };

  responsive: ApexResponsive[] = [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 280
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ];

  ngOnChanges(): void {

    this.series = this.values;

  }

}