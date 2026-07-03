import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Contract } from '../models/contract.model';
import { CreateContract } from '../models/create-contract.model';
import { UpdateContract } from '../models/update-contract.model';
import { PagedResponse } from '../models/paged-response.model';
import { ContractQuery } from '../models/contract-query.model';
import { CreateRenewal } from '../models/create-renewal.model';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/contracts`;


  getById(id: number): Observable<Contract> {
  return this.http.get<Contract>(
    `${this.apiUrl}/${id}`
  );
}

createContract(
  contract: CreateContract
): Observable<string> {

  return this.http.post(
    this.apiUrl,
    contract,
    {
      responseType: 'text'
    }
  );

}

updateContract(
  id: number,
  contract: UpdateContract
): Observable<any> {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    contract
  );
}

deleteContract(id: number): Observable<any> {

  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}

 
  // PAGING


  getPaged(
    query: ContractQuery
  ): Observable<PagedResponse<Contract>> {

    return this.http.get<PagedResponse<Contract>>(
      `${this.apiUrl}/paged`,
      {
        params: {

          pageNumber: query.pageNumber,

          pageSize: query.pageSize,

          search: query.search ?? '',

          sortBy: query.sortBy ?? '',

          sortDirection: query.sortDirection ?? '',

          status:
            query.status != null
              ? query.status
              : ''

        }
      }
    );

  }

  
  // WORKFLOW


  submit(id: number) {

    return this.http.post(
      `${this.apiUrl}/${id}/submit`,
      {},
      {
        responseType: 'text'
      }
    );

  }

  approve(id: number) {

    return this.http.post(
      `${this.apiUrl}/${id}/approve`,
      {},
      {
        responseType: 'text'
      }
    );

  }

  reject(
    id: number,
    reason: string
  ) {

    return this.http.post(
      `${this.apiUrl}/${id}/reject`,
      {
        reason
      },
      {
        responseType: 'text'
      }
    );

  }

  //active 

  activate(id: number) {

  return this.http.post(

    `${this.apiUrl}/${id}/activate`,

    {},

    {

      responseType: 'text'

    }

  );

}
  // RENEWAL
  

  renew(
    id: number,
    renewal:CreateRenewal
  ) {

    return this.http.post(
      `${this.apiUrl}/${id}/renew`,
      renewal,
      {
        responseType: 'text'
      }
    );

  }

  getRenewals(
    id: number
  ): Observable<Contract[]> {

    return this.http.get<Contract[]>(
      `${this.apiUrl}/${id}/renewals`
    );

  }

  approveRenewal(
    id: number
  ) {

    return this.http.post(
      `${this.apiUrl}/${id}/approve-renewal`,
      {},
      {
        responseType: 'text'
      }
    );

  }

  activateRenewal(
    id: number
  ) {

    return this.http.post(
      `${this.apiUrl}/${id}/activate-renewal`,
      {},
      {
        responseType: 'text'
      }
    );

  }

  rejectRenewal(
    id: number,
    reason: string
  ) {

    return this.http.post(
      `${this.apiUrl}/${id}/reject-renewal`,
      {
        reason
      },
      {
        responseType: 'text'
      }
    );

  }


  // TERMINATION


  terminate(
    id: number,
    reason: string
  ) {

    return this.http.post(
      `${this.apiUrl}/${id}/terminate`,
      {
        reason
      },
      {
        responseType: 'text'
      }
    );

  }

 
  // REPORTS


  exportReport(filter: any) {

    return this.http.get(
      `${this.apiUrl}/export`,
      {
        params: filter,
        responseType: 'blob'
      }
    );

  }

}