import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  imports: [CommonModule],
  standalone: true
})
export class ProductDetailsComponent implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id)
      .subscribe(data => this.product = data);
  }

  addToCart() {
    this.cartService.addToCart(this.product.id)
      .subscribe(() => alert('Added to cart'));
  }
}
