import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecentActivity } from '../../../../core/models/recent-activity.model';
import { RecentActivityService } from '../../../../core/services/recent-activity.service';

@Component({
  selector: 'app-vendor-recent-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vendor-recent-activity.html',
  styleUrls: ['./vendor-recent-activity.scss']
})
export class VendorRecentActivityComponent implements OnInit {

  @Input() vendorId!: number;
  private cdr = inject(ChangeDetectorRef);
  private service = inject(RecentActivityService);

  activities: RecentActivity[] = [];

  loading = true;

  ngOnInit(): void {

    if (!this.vendorId) {

      this.loading = false;
      return;

    }

    this.loadActivities();

  }

  loadActivities(): void {

    this.loading = true;

    this.service
      .getVendorActivities(this.vendorId)
      .subscribe({

        next: data => {

          console.log('Activities =>', data);
          this.activities = data;
          this.loading = false;
          this.cdr.detectChanges();

        },

        error: (err) => {

  console.error('Recent Activity Error:', err);

  this.loading = false;
  this.cdr.detectChanges();

}

      });

  }

  getIcon(action: string): string {

    switch (action.toLowerCase()) {

      case 'created':
        return 'add_circle';

      case 'updated':
        return 'edit';

      case 'activated':
        return 'check_circle';

      case 'deactivated':
        return 'pause_circle';

      case 'deleted':
        return 'delete';

      default:
        return 'history';

    }

  }
 
  getBadgeClass(action: string): string {

  switch (action.toLowerCase()) {

    case 'created':
      return 'bg-green-100 text-green-700';

    case 'updated':
      return 'bg-blue-100 text-blue-700';

    case 'deleted':
      return 'bg-red-100 text-red-700';

    case 'activated':
      return 'bg-emerald-100 text-emerald-700';

    case 'deactivated':
      return 'bg-orange-100 text-orange-700';

    default:
      return 'bg-slate-100 text-slate-700';

  }

}

getRelativeTime(date: string): string {

  const now = new Date().getTime();

  const value = new Date(date).getTime();

  const diff = Math.floor((now - value) / 1000);

  if (diff < 60) {

    return 'Just now';

  }

  if (diff < 3600) {

    return `${Math.floor(diff / 60)} min ago`;

  }

  if (diff < 86400) {

    return `${Math.floor(diff / 3600)} hrs ago`;

  }

  if (diff < 604800) {

    return `${Math.floor(diff / 86400)} days ago`;

  }

  return new Date(date).toLocaleDateString();

}
}