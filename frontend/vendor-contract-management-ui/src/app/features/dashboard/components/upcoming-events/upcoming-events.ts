import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UpcomingEvent{

id:number;

title:string;

date:string;

type:string;

}

@Component({

selector:'app-upcoming-events',

standalone:true,

imports:[CommonModule],

templateUrl:'./upcoming-events.html',

styleUrls:['./upcoming-events.scss']

})

export class UpcomingEventsComponent{

@Input()

events:UpcomingEvent[]=[];

}