import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({

selector:'app-expenditure-summary',

standalone:true,

imports:[
CommonModule
],

templateUrl:'./expenditure-summary.html',

styleUrls:['./expenditure-summary.scss']

})

export class ExpenditureSummaryComponent{

@Input()

currentSpend=0;

@Input()

forecastSpend=0;

@Input()

budget=0;

get utilization(){

if(this.budget===0){

return 0;

}

return Math.round(

(this.currentSpend/this.budget)*100

);

}

}