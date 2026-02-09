import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  cartCount = 0;
  username: string | null = null;
  role: string | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.role = this.authService.getRole();

    this.cartService.cartCount$.subscribe(
      count => this.cartCount = count
    );

    if (this.authService.isLoggedIn()) {
      this.cartService.loadCartCount();
    }
  }

  logout() {
    this.cartService.clearCartCount();
    
    this.toast.error('Invalid email or password');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.role === 'ROLE_ADMIN' || this.role === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
