import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend
} from 'ng-apexcharts';

@Component({
  selector: 'app-vendor-distribution-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './vendor-distribution-chart.html',
  styleUrls: ['./vendor-distribution-chart.scss']
})
export class VendorDistributionChartComponent {

  series: ApexNonAxisChartSeries = [
    45,
    25,
    15,
    10,
    5
  ];

  chart: ApexChart = {
    type: 'donut',
    height: 320
  };

  labels: string[] = [
    'IT',
    'Finance',
    'Legal',
    'HR',
    'Others'
  ];

  legend: ApexLegend = {
    position: 'bottom'
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

}