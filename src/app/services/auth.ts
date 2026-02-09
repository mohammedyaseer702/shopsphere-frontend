import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private BASE_URL = `${environment.apiBaseUrl}/auth`;


  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  login(data: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.BASE_URL}/login`,
      data
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  saveUser(username: string) {
    localStorage.setItem('username', username);
  }

  getUser(): string | null {
    return localStorage.getItem('username');
  }

  // ✅ aliases (fix TS error)
  setUser(username: string) {
    this.saveUser(username);
  }

  setRole(role: string) {
    this.saveRole(role);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
  }
}

