import { Routes } from '@angular/router';

import { HomeComponent } from './home/home';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

import { ProductListComponent } from './products/product-list/product-list';
import { ProductDetailsComponent } from './products/product-details/product-details';

import { CartComponent } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { Orders } from './orders/orders';
import { AdminOrders } from './admin-orders/admin-orders';

import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  // 🏠 Home
  { path: '', component: HomeComponent },

  // 🔐 Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 🛍 Products (PROTECTED)
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard]
  },

  // 🛒 User protected routes
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    component: Orders,
    canActivate: [authGuard]
  },

  // 👑 Admin protected route
  {
    path: 'admin/orders',
    component: AdminOrders,
    canActivate: [adminGuard]
  },

  // ❌ Fallback
  { path: '**', redirectTo: '' }
];
