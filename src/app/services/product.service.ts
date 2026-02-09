import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.BASE_URL);
  }
  getProductById(id: number) {
  return this.http.get<Product>(`${this.BASE_URL}/${id}`);
}

}
