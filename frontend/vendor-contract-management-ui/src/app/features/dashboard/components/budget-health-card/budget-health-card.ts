import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-budget-health-card',
standalone:true,
imports:[CommonModule],
templateUrl:'./budget-health-card.html',
styleUrls:['./budget-health-card.scss']
})
export class BudgetHealthCardComponent{

@Input()

budget=0;

@Input()

spent=0;

get remaining(){

return this.budget-this.spent;

}

get percentage(){

if(this.budget===0){

return 0;

}

return Math.round((this.spent/this.budget)*100);

}

get status(){

if(this.percentage<60){

return 'Healthy';

}

if(this.percentage<90){

return 'Warning';

}

return 'Critical';

}

}