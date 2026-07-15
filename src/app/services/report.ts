import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Report {

  private apiUrl = 'http://localhost:8080/api/reports/monthly';

  constructor(private http: HttpClient) {}

  getReport(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }

}