import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './contract-overview-chart.html',
  styleUrls: ['./contract-overview-chart.scss']
})
export class ContractOverviewChartComponent implements OnChanges {

  @Input() categories: string[] = [];

  @Input() values: number[] = [];

  series: ApexAxisChartSeries = [];

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
  categories: []
};

markers = {
  size: 6
};

fill = {
  opacity: 0.3
};

title: ApexTitleSubtitle = {
  text: 'Contracts Growth'
};

ngOnChanges() {

  this.series = [{
    name: 'Contracts',
    data: [...this.values]
  }];

  this.xaxis = {
    categories: [...this.categories]
  };

}
}