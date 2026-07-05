import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/documents`;

  getByContract(contractId: number)
      : Observable<Document[]> {

    return this.http.get<Document[]>(

      `${this.apiUrl}/contract/${contractId}`

    );

  }

  upload(contractId: number, file: File) {

  const formData = new FormData();

  formData.append('contractId', contractId.toString());
  formData.append('file', file);

  return this.http.post(

    `${this.apiUrl}/upload`,

    formData,

    {
      responseType: 'text'
    }

  );
}

  download(id: number) {

  return this.http.get(

    `${this.apiUrl}/download/${id}`,

    {
      responseType: 'blob'
    }

  );

}

  delete(id: number) {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      {

        responseType: 'text'

      }

    );

  }

}