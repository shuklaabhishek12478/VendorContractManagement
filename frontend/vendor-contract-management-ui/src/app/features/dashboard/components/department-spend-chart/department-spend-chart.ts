import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
NgApexchartsModule,
ApexChart,
ApexResponsive,
ApexNonAxisChartSeries,
ApexLegend
}
from 'ng-apexcharts';

@Component({

selector:'app-department-spend-chart',

standalone:true,

imports:[
CommonModule,
NgApexchartsModule
],

templateUrl:'./department-spend-chart.html',

styleUrls:['./department-spend-chart.scss']

})

export class DepartmentSpendChartComponent
implements OnChanges{

@Input()

labels:string[]=[];

@Input()

values:number[]=[];

series:ApexNonAxisChartSeries=[];

chart:ApexChart={

type:'donut',

height:380

};

legend:ApexLegend={

position:'bottom'

};

responsive:ApexResponsive[]=[

{

breakpoint:768,

options:{

chart:{

height:300

},

legend:{

position:'bottom'

}

}

}

];

ngOnChanges(){

this.series=this.values;

}

}