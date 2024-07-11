// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:44385/api';

  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Order/create`, order);
  }

  getOrders(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/Order/${userId}`);
  }
}
