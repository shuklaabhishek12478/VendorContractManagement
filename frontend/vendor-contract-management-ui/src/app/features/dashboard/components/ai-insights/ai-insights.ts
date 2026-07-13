import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AIInsight {

  icon: string;

  title: string;

  message: string;

  severity: 'info' | 'warning' | 'success' | 'danger';

}

@Component({

selector:'app-ai-insights',

standalone:true,

imports:[CommonModule],

templateUrl:'./ai-insights.html',

styleUrls:['./ai-insights.scss']

})
export class AiInsightsComponent{

@Input()

insights:AIInsight[]=[];

}