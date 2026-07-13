import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface ExpiringContract{

id:number;

contractNumber:string;

vendorName:string;

endDate:string;

daysLeft:number;

contractValue:number;

}

@Component({

selector:'app-expiring-contracts',

standalone:true,

imports:[
CommonModule,
MatButtonModule
],

templateUrl:'./expiring-contracts.html',

styleUrls:['./expiring-contracts.scss']

})

export class ExpiringContractsComponent{

@Input()

contracts:ExpiringContract[]=[];

@Output()

open=new EventEmitter<number>();

@Output()

renew=new EventEmitter<number>();

}