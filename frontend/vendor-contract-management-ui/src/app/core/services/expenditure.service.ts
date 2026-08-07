import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Expenditure } from '../models/expenditures-model/expenditure.model';
import { CreateExpenditure } from '../models/expenditures-model/create-expenditure.model';
import { ExpenditureFilter } from '../models/expenditures-model/expenditure-filter.model';
import { ExpenditureDashboard } from '../models/expenditures-model/expenditure-dashboard.model';
import { ExpenditureForecast } from '../models/expenditures-model/expenditure-forecast.model';
import { UpdateExpenditure } from '../models/expenditures-model/update-expenditure.model';
import { ExpenditureForecastInner } from '../models/expenditures-model/forecast-inner/expenditure-forecast-inner.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/Expenditure`;

  getAll(): Observable<Expenditure[]> {
    return this.http.get<Expenditure[]>(this.apiUrl);
  }

  getById(id: number): Observable<Expenditure> {
    return this.http.get<Expenditure>(
      `${this.apiUrl}/${id}`
    );
  }

  create(model: CreateExpenditure): Observable<Expenditure> {
    return this.http.post<Expenditure>(
      this.apiUrl,
      model
    );
  }

  update(
    id: number,
    model: UpdateExpenditure
  ): Observable<Expenditure> {

    return this.http.put<Expenditure>(
      `${this.apiUrl}/${id}`,
      model
    );
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  search(
    filter: ExpenditureFilter
  ): Observable<Expenditure[]> {

    let params = new HttpParams();

    Object.entries(filter).forEach(([key, value]) => {

      if (
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {
        params = params.set(key, value.toString());
      }

    });

    return this.http.get<Expenditure[]>(
      `${this.apiUrl}/search`,
      { params }
    );
  }

  getDashboard(): Observable<ExpenditureDashboard> {

    return this.http.get<ExpenditureDashboard>(
      `${this.apiUrl}/dashboard`
    );
  }

  getForecast(
    year: number
  ): Observable<ExpenditureForecast> {

    return this.http.get<ExpenditureForecast>(
      `${this.apiUrl}/forecast/${year}`
    );
  }

  exportExcel(
    filter: ExpenditureFilter
  ): Observable<Blob> {

    let params = new HttpParams();

    Object.entries(filter).forEach(([key, value]) => {

      if (
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {
        params = params.set(key, value.toString());
      }

    });

    return this.http.get(
      `${this.apiUrl}/export/excel`,
      {
        params,
        responseType: 'blob'
      }
    );
  }

  getForecastInner(
  year: number
): Observable<ExpenditureForecastInner> {

  return this.http.get<ExpenditureForecastInner>(
    `${this.apiUrl}/forecast/details/${year}`
  );

}
}