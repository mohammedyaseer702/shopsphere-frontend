import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data: any[]) => {
        console.log('CART API DATA:', data);
        this.cartItems = data;   // ✅ THIS IS CORRECT
      },
      error: (err) => {
        console.error('Cart load error', err);
      }
    });
  }

  removingIds = new Set<number>();

remove(itemId: number) {
  if (this.removingIds.has(itemId)) return;

  this.removingIds.add(itemId);

  this.cartService.removeFromCart(itemId).subscribe({
    next: () => {
      this.cartService.decrementCount();
      this.removingIds.delete(itemId);
      this.loadCart();
    },
    error: () => {
      this.removingIds.delete(itemId);
    }
  });
}
}
