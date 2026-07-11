import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Vendor } from '../models/vendor.model';
import { environment } from '../../../environments/environment';
import { PagedResponse } from '../models/paged-response.model';
import { CreateVendor } from '../models/create-vendor.model';
import { VendorQuery } from '../models/vendor-query.model';
import { Contracts } from '../models/contracts.model';
import { VendorDocument } from '../models/vendor-document';
import { RecentActivity } from '../models/recent-activity.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private http = inject(HttpClient);
  
  private apiUrl =
    `${environment.apiUrl}/vendors`;

private vendorDocumentUrl =
  `${environment.apiUrl}/VendorDocuments`;

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

getVendorActivities(vendorId: number) {

  return this.http.get<RecentActivity[]>(
    `${environment.apiUrl}/RecentActivities/vendor/${vendorId}`
  );

}


getVendorDocuments(vendorId: number) {

  return this.http.get<VendorDocument[]>(
    `${this.vendorDocumentUrl}/vendor/${vendorId}`
  );

}

uploadVendorDocument(
  vendorId: number,
  file: File,
  documentType: string
) {

  const formData = new FormData();

  formData.append('vendorId', vendorId.toString());

  formData.append('documentType', documentType);

  formData.append('file', file);

  return this.http.post(
    `${this.vendorDocumentUrl}/upload`,
    formData,
    {
      observe: 'events',
      reportProgress: true
    }
  );

}

downloadVendorDocument(id: number) {

  return this.http.get(
    `${this.vendorDocumentUrl}/${id}/download`,
    {
      responseType: 'blob'
    }
  );

}

getVendorDocumentPreviewUrl(id: number) {

  return `${environment.apiUrl}/VendorDocuments/${id}/preview`;

}

deleteVendorDocument(id: number) {

  return this.http.delete(
    `${this.vendorDocumentUrl}/${id}`
  );

}


}