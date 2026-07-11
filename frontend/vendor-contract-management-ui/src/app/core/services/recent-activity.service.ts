import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RecentActivity } from '../models/recent-activity.model';

@Injectable({
  providedIn: 'root'
})
export class RecentActivityService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/RecentActivities`;

  getRecentActivities(
    count: number = 20
  ): Observable<RecentActivity[]> {

    return this.http.get<RecentActivity[]>(
      `${this.apiUrl}?count=${count}`
    );

  }

  getVendorActivities(
  vendorId: number,
  count: number = 20
) {
  return this.http.get<RecentActivity[]>(
    `${this.apiUrl}/vendor/${vendorId}?count=${count}`
  );
}
}