import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Vendor } from '../models/vendor.model';
import { environment } from '../../../environments/environment';
import { PagedResponse } from '../models/paged-response.model';
import { CreateVendor } from '../models/create-vendor.model';
import { VendorQuery } from '../models/vendor-query.model';
import { Contracts } from '../models/contracts.model';

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

   /*getPaged(
    pageNumber = 1,
    pageSize = 10
  ): Observable<PagedResponse<Vendor>> {

    return this.http.get<PagedResponse<Vendor>>(
      `${this.apiUrl}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }*/

  getPaged(query: VendorQuery)
: Observable<PagedResponse<Vendor>> {

  return this.http.get<PagedResponse<Vendor>>(
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

  getById(id: number) {
  return this.http.get<Vendor>(
    `${this.apiUrl}/${id}`
  );
}

createVendor(data: CreateVendor) {

  return this.http.post<number>(
    `${this.apiUrl}`,
    data
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


getContracts(vendorId: number) {

  return this.http.get<Contracts[]>(

    `${this.apiUrl}/${vendorId}/contracts`

  );

}

}