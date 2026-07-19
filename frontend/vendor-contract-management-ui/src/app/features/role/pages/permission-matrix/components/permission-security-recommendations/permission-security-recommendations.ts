import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-security-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-security-recommendations.html',
  styleUrl: './permission-security-recommendations.scss'
})
export class PermissionSecurityRecommendationsComponent {

  @Input()
  recommendations: string[] = [];

}