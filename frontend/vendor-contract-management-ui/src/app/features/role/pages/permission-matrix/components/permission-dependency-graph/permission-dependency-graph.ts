import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface PermissionGraphEdge {

  from: string;

  to: string;

}

@Component({
  selector: 'app-permission-dependency-graph',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-dependency-graph.html',
  styleUrl: './permission-dependency-graph.scss'
})
export class PermissionDependencyGraphComponent {

  @Input()
  permissionGraph: PermissionGraphEdge[] = [];

}