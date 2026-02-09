import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe(data => this.orders = data as any[]);
  }
}
