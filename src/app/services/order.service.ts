import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private BASE_URL = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  placeOrder() {
    return this.http.post(`${this.BASE_URL}/place`, {});
  }

  myOrders() {
    return this.http.get(`${this.BASE_URL}/my`);
  }

  getAllOrders() {
    return this.http.get(`${this.BASE_URL}/all`);
  }
}
