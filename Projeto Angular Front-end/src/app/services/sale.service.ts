import { Sale } from './../models/sale.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  readonly apiUrl = environment.apiUrl + "/sales"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  get(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  save(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale, this.httpOptions);
  }

  edit(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/${sale.id}`, sale, this.httpOptions);
  }

  delete(sale: Sale): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${sale.id}`, this.httpOptions);
  }

}
