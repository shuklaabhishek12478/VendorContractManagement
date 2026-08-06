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

      console.log('Status Labels:', this.labels);
  console.log('Status Values:', this.values);

    this.series = this.values;

  }

  getColor(status: string): string {

  switch (status) {

    case 'Draft':
      return '#94a3b8';

    case 'Pending':
      return '#f59e0b';

    case 'Approved':
      return '#2563eb';

    case 'Active':
      return '#16a34a';

    case 'Expired':
      return '#ef4444';

    case 'Renewed':
      return '#7c3aed';

    default:
      return '#64748b';
  }

}

}