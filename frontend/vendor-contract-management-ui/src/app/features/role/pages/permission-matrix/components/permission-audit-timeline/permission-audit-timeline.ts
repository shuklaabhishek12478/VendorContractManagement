import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface AuditTimelineItem {

  title: string;

  time: string;

  icon: string;

  color: string;

}

@Component({
  selector: 'app-permission-audit-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-audit-timeline.html',
  styleUrl: './permission-audit-timeline.scss'
})
export class PermissionAuditTimelineComponent {

  @Input()
  auditTimeline: AuditTimelineItem[] = [];

}