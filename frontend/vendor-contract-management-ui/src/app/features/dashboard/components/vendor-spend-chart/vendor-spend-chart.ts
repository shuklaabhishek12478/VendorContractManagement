import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector:'app-vendor-spend-chart',
  standalone:true,
  imports:[
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl:'./vendor-spend-chart.html',
  styleUrls:['./vendor-spend-chart.scss']
})
export class VendorSpendChartComponent implements OnChanges{

@Input()

vendors:string[]=[];

@Input()

amounts:number[]=[];

series:ApexAxisChartSeries=[];

chart:ApexChart={

type:'bar',

height:420,

toolbar:{
show:false
}

};

plotOptions:ApexPlotOptions={

bar:{

horizontal:true,

borderRadius:8,

distributed:true

}

};

dataLabels:ApexDataLabels={

enabled:false

};

grid:ApexGrid={

borderColor:'#e5e7eb'

};

tooltip:ApexTooltip={

theme:'light'

};

xaxis:ApexXAxis={

categories:[]

};

ngOnChanges(){

this.series=[

{

name:'Spend',

data:this.amounts

}

];

this.xaxis={

categories:this.vendors

};

}

}