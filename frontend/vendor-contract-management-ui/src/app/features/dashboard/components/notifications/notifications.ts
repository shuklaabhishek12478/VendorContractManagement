import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DashboardNotification {

  id:number;

  title:string;

  message:string;

  type:'success'|'warning'|'info'|'danger';

  time:string;

  unread:boolean;

}

@Component({
  selector:'app-notifications',
  standalone:true,
  imports:[
    CommonModule
  ],
  templateUrl:'./notifications.html',
  styleUrls:['./notifications.scss']
})
export class NotificationsComponent {

  @Input()
  notifications:DashboardNotification[]=[];

}