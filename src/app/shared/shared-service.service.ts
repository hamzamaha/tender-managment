import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private baseUrl = 'http://localhost:8200/api/tender/all';

  constructor(private http: HttpClient) {}

  getTenders(pageNo: number, pageSize: number, payload: any): Observable<any> {
    const url = `${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.post<any>(url, payload);
  }
}
