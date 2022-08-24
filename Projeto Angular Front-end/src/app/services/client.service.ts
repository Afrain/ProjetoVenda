import { Client } from '../models/client.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  readonly apiUrl = environment.apiUrl + "/clients"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  get(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  save(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, this.httpOptions);
  }

  edit(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client, this.httpOptions);
  }

  delete(client: Client): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${client.id}`, this.httpOptions);
  }

}
