import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Vendor } from '../models/vendor.model';
import { environment } from '../../../environments/environment';
import { PagedResponse } from '../models/paged-response.model';
import { CreateVendor } from '../models/create-vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/vendors`;

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

   getPaged(
    pageNumber = 1,
    pageSize = 10
  ): Observable<PagedResponse<Vendor>> {

    return this.http.get<PagedResponse<Vendor>>(
      `${this.apiUrl}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getById(id: number) {
  return this.http.get<Vendor>(
    `${this.apiUrl}/${id}`
  );
}

  createVendor(
  vendor: CreateVendor
): Observable<any> {

  return this.http.post(
    this.apiUrl,
    vendor
  );
}

updateVendor(
  id: number,
  vendor: CreateVendor
) {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    vendor
  );
}



deleteVendor(id: number) {
  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}


activateVendor(id: number) {
  return this.http.put(
    `${this.apiUrl}/${id}/activate`,
    {}
  );
}

deactivateVendor(id: number) {
  return this.http.put(
    `${this.apiUrl}/${id}/deactivate`,
    {}
  );
}
}