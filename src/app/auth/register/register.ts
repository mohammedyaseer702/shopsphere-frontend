import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  name = '';
  email = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  register() {
  this.loading = true;
  this.authService.register({
    name: this.name,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      this.toast.success('Registration successful');
      setTimeout(() => {
  this.router.navigate(['/login']);
}, 1000);
    },
    error: () => {
      this.toast.error('Registration Failed');
    }
  });
}

passwordStrength: 'weak' | 'medium' | 'strong' | '' = '';

checkPasswordStrength() {
  const pwd = this.password;

  if (pwd.length < 6) {
    this.passwordStrength = 'weak';
    return;
  }

  const hasLetters = /[a-zA-Z]/.test(pwd);
  const hasNumbers = /[0-9]/.test(pwd);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

  if (hasLetters && hasNumbers && hasSpecial && pwd.length >= 8) {
    this.passwordStrength = 'strong';
  } else if (hasLetters && hasNumbers) {
    this.passwordStrength = 'medium';
  } else {
    this.passwordStrength = 'weak';
  }
}








}
