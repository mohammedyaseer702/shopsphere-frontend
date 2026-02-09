import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {

  message = signal<string | null>(null);
  type = signal<ToastType>('info');

  show(message: string, type: ToastType = 'info') {
    this.message.set(message);
    this.type.set(type);

    setTimeout(() => this.clear(), 3000);
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }

  info(msg: string) {
    this.show(msg, 'info');
  }

  clear() {
    this.message.set(null);
  }
}
