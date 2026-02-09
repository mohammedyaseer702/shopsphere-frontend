import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data.slice(0, 6);
      });
  }

  // HERO BUTTON
  goToProducts() {
    this.router.navigate(['/products']);
  }

  // FEATURED PRODUCT
  openProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
  testToast() {
  this.toast.success('Toast is working 🎉');
}
}
