import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PendingUser } from '../models/user-approval-model/pending-user.model';
import { ApproveUserRequest } from '../models/user-approval-model/approve-user.model';
import { RejectUserRequest } from '../models/user-approval-model/reject-user.model';


@Injectable({
  providedIn: 'root'
})
export class UserApprovalService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/user-approval`;

  getPending(): Observable<PendingUser[]> {
    return this.http.get<PendingUser[]>(
      `${this.apiUrl}/pending`);
  }

  getById(id: number): Observable<PendingUser> {
    return this.http.get<PendingUser>(
      `${this.apiUrl}/${id}`);
  }

  approve(
    id: number,
    request: ApproveUserRequest
  ): Observable<void> {

    return this.http.post<void>(
      `${this.apiUrl}/${id}/approve`,
      request);
  }

  reject(
    id: number,
    request: RejectUserRequest
  ): Observable<void> {

    return this.http.post<void>(
      `${this.apiUrl}/${id}/reject`,
      request);
  }
}