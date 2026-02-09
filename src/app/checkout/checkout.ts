import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}
  loading=false;
  placeOrder() {
  this.loading = true;

  this.orderService.placeOrder().subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/orders']);
    },
    error: () => {
      this.loading = false;
    }
  });
}
}
