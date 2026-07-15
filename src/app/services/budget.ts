import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private apiUrl = 'http://localhost:8080/api/budgets';

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  addBudget(budget: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      budget
    );

  }

  updateBudget(id: number, budget: any): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      budget
    );

  }

  deleteBudget(id: number): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }

}