import { Component, Input, OnChanges } from '@angular/core';
import {
  ApexChart,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexPlotOptions,
  NgApexchartsModule
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-spend-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './category-spend-chart.html',
  styleUrls: ['./category-spend-chart.scss']
})
export class CategorySpendChartComponent implements OnChanges {

  @Input() labels: string[] = [];

  @Input() values: number[] = [];

  chartSeries: ApexNonAxisChartSeries = [];

  chartDetails: ApexChart = {
    type: 'donut',
    height: 320
  };

  chartLabels: string[] = [];

  chartLegend: ApexLegend = {
    position: 'bottom'
  };

  chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 260
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ];

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

  chartPlotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '60%'
      }
    }
  };

  ngOnChanges(): void {

    this.chartSeries = [...this.values];

    this.chartLabels = [...this.labels];

  }

}