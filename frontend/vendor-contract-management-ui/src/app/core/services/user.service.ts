import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';
import { PagedResponse } from '../models/paged-response.model';
import { CreateUser } from '../models/users-model/create-user.model';
import { UpdateUser } from '../models/users-model/update-user.model';
import { UserQuery } from '../models/users-model/user-query.model';
import { RecentActivity } from '../models/recent-activity.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/Users`;

  getAll(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl);

  }

  getPaged(
    query: UserQuery
  ): Observable<PagedResponse<User>> {

    return this.http.get<PagedResponse<User>>(
      `${this.apiUrl}/paged`,
      {
        params: {

          pageNumber: query.pageNumber,

          pageSize: query.pageSize,

          search: query.search ?? '',

          sortBy: query.sortBy ?? '',

          sortDirection: query.sortDirection ?? '',

          isActive:
            query.isActive != null
              ? query.isActive
              : ''

        }
      }
    );

  }

 
  createUser(model: CreateUser) {

    return this.http.post(
      this.apiUrl,
      model
    );

  }

  updateUser(
    id: number,
    model: UpdateUser
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      model
    );

  }

  deleteUser(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  activateUser(id: number) {

    return this.http.put(
      `${this.apiUrl}/${id}/activate`,
      {}
    );

  }

  deactivateUser(id: number) {

    return this.http.put(
      `${this.apiUrl}/${id}/deactivate`,
      {}
    );

  }

 

  assignRoles(
    id: number,
    roleIds: number[]
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}/roles`,
      roleIds
    );

  }

  create(model: any) {

  return this.http.post(

    this.apiUrl,

    model

  );

}

getById(id: number): Observable<User> {

  return this.http.get<User>(

    `${this.apiUrl}/${id}`

  );

}

update(id:number, model:any){

    return this.http.put(
        `${this.apiUrl}/${id}`,
        model,
        {
            responseType:'text'
        }
    );

}


activate(id: number) {

  return this.http.put(
    `${this.apiUrl}/${id}/activate`,
    {},
    {
      responseType: 'text'
    }
  );

}

deactivate(id: number) {

  return this.http.put(
    `${this.apiUrl}/${id}/deactivate`,
    {},
    {
      responseType: 'text'
    }
  );

}

delete(id: number) {

  return this.http.delete(
    `${this.apiUrl}/${id}`
  );

}

resetPassword(
  id: number,
  password: string
) {

  return this.http.put(
    `${this.apiUrl}/${id}/reset-password`,
    {
      newPassword: password
    }
  );

}

getUserActivities(userId: number) {

  return this.http.get<RecentActivity[]>(

    `${environment.apiUrl}/RecentActivities/user/${userId}`

  );

}

exportUsers() {

  return this.http.get(
    `${this.apiUrl}/export`,
    {
      responseType: 'blob'
    }
  );

}

importUsers(file: File) {

  const formData = new FormData();

  formData.append('file', file);

  return this.http.post(

    `${this.apiUrl}/import`,

    formData

  );

}

}