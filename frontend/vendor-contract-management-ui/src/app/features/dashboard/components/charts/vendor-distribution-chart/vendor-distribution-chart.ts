import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexResponsive
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-vendor-distribution-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './vendor-distribution-chart.html'
})
export class VendorDistributionChartComponent implements OnChanges {

  @Input() labels: string[] = [];
  @Input() values: number[] = [];

  chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'donut',
      height: 320
    },
    labels: [],
    legend: {
      position: 'bottom'
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 280
          }
        }
      }
    ]
  };

  ngOnChanges() {

    console.log(this.labels);
    console.log(this.values);

    this.chartOptions = {
      ...this.chartOptions,
      series: [...this.values],
      labels: [...this.labels]
    };

  }

}