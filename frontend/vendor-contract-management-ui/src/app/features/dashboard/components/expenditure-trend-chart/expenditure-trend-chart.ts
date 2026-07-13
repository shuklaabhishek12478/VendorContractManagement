import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexGrid,
  ApexYAxis
} from 'ng-apexcharts';

@Component({
  selector:'app-expenditure-trend-chart',
  standalone:true,
  imports:[
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl:'./expenditure-trend-chart.html',
  styleUrls:['./expenditure-trend-chart.scss']
})
export class ExpenditureTrendChartComponent
implements OnChanges{

@Input()
actual:number[]=[];

@Input()
forecast:number[]=[];

series:ApexAxisChartSeries=[];

chart:ApexChart={

type:'area',

height:360,

toolbar:{
show:false
},

zoom:{
enabled:false
}

};

stroke:ApexStroke={

curve:'smooth',

width:3

};

dataLabels:ApexDataLabels={

enabled:false

};

legend:ApexLegend={

position:'top'

};

grid:ApexGrid={

borderColor:'#e5e7eb'

};

tooltip:ApexTooltip={

theme:'light'

};

yaxis:ApexYAxis={

labels:{
formatter:(val)=>'₹ '+(val/100000).toFixed(1)+'L'
}

};

xaxis:ApexXAxis={

categories:[
'Jan',
'Feb',
'Mar',
'Apr',
'May',
'Jun',
'Jul',
'Aug',
'Sep',
'Oct',
'Nov',
'Dec'
]

};

ngOnChanges(){

this.series=[

{

name:'Actual',

data:this.actual

},

{

name:'Forecast',

data:this.forecast

}

];

}

}