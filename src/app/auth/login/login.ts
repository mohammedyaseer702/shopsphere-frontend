import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}







errorMessage = '';

login() {

  if (!this.email || !this.password) {
      this.toast.error('Email and password required');
      return;
    }
  this.loading = true;


  this.errorMessage = '';

  this.authService.login({
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res: { token: string }) => {
      this.authService.saveToken(res.token);
      this.toast.success('Login successful');
      

      const payload = JSON.parse(atob(res.token.split('.')[1]));
      const role = payload.role || payload.authorities?.[0];
      const username = payload.sub;

      this.authService.setRole(role);
      this.authService.setUser(username);

      this.loading = false;

      if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
        this.router.navigate(['/admin/orders']);
      } else {
        this.router.navigate(['/products']);
      }
    },
    error: (err) => {
      console.error(err)
      this.toast.error('Invalid email or password');
      this.loading = false;
    }
  });
}

}
