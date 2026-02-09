import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class CartService {

  private BASE_URL = `${environment.apiBaseUrl}/cart`;


  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get<any[]>(this.BASE_URL, {
      withCredentials: true
    });
  }


  loadCartCount() {
    this.getCart().subscribe({
      next: (items) => this.cartCountSubject.next(items.length),
      error: () => this.cartCountSubject.next(0)
    });
  }






  addToCart(productId: number) {
    return this.http.post(
      `${this.BASE_URL}/add?productId=${productId}&quantity=1`,
      {},
      { withCredentials: true }
    );
  }

  removeFromCart(itemId: number) {
    return this.http.delete(
      `${this.BASE_URL}/remove/${itemId}`,
      { withCredentials: true }
    );
  }


  // ✅ increment count instantly
incrementCount() {
  this.cartCountSubject.next(this.cartCountSubject.value + 1);
}

// ✅ decrement count instantly
decrementCount() {
  const current = this.cartCountSubject.value;
  this.cartCountSubject.next(current > 0 ? current - 1 : 0);
}


  clearCartCount() {
    this.cartCountSubject.next(0);
  }
}
