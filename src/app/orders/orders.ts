import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-orders',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.myOrders()
      .subscribe(data => this.orders = data as any[]);
  }

}
