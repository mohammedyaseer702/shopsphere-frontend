import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router'
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-list',
  standalone:true,
  templateUrl: './product-list.html',
  imports:[CommonModule]
  
})
export class ProductListComponent implements OnInit {

  adding = new Set<number>();

  products: Product[] = [];

  constructor(private productService: ProductService,private router:Router ,private cartService:CartService,private toast: ToastService) {}

  ngOnInit(): void {
  this.productService.getAllProducts().subscribe({
    next: (data) => {
      console.log('Products from backend:', data);
      this.products = data;
    },
    error: (err) => {
      console.error('API error:', err);
    }
  })
}

viewProduct(id: number) {
  this.router.navigate(['/products', id]);
}

onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/no-image.png';
}


addToCart(productId: number) {
  if (this.adding.has(productId)) return;

  this.adding.add(productId);

  this.cartService.addToCart(productId).subscribe({
    next: () => {
      this.toast.show('Added to cart');
    },
    error: () => {
      this.toast.show('Login Required');
    }
  });
}



    





}
