import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle
} from 'ng-apexcharts';

@Component({
  selector: 'app-contract-overview-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './contract-overview-chart.html',
  styleUrls: ['./contract-overview-chart.scss']
})
export class ContractOverviewChartComponent {

  series: ApexAxisChartSeries = [
    {
      name: 'Contracts',
      data: [5, 8, 12, 16, 20, 25, 28, 34, 38, 45, 49, 55]
    }
  ];

  chart: ApexChart = {
    type: 'area',
    height: 320,
    toolbar: {
      show: false
    }
  };

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 3
  };

  dataLabels: ApexDataLabels = {
    enabled: false
  };

  xaxis: ApexXAxis = {
    categories: [
      'Jan','Feb','Mar','Apr',
      'May','Jun','Jul','Aug',
      'Sep','Oct','Nov','Dec'
    ]
  };

  title: ApexTitleSubtitle = {
    text: 'Contracts Growth'
  };

}