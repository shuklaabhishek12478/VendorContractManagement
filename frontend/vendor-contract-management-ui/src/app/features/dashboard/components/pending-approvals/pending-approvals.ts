import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface PendingApproval {

  id:number;

  contractNumber:string;

  vendorName:string;

  submittedOn:string;

  contractValue:number;

}

@Component({
  selector:'app-pending-approvals',
  standalone:true,
  imports:[
    CommonModule,
    MatButtonModule
  ],
  templateUrl:'./pending-approvals.html',
  styleUrls:['./pending-approvals.scss']
})
export class PendingApprovalsComponent {

  @Input()
  approvals:PendingApproval[]=[];

  @Output()
  approve=new EventEmitter<number>();

  @Output()
  reject=new EventEmitter<number>();

}