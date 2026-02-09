import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="toast.message() as msg"
       class="app-toast"
       [class.success]="toast.type() === 'success'"
       [class.error]="toast.type() === 'error'"
       [class.info]="toast.type() === 'info'">
    {{ msg }}
  </div>
`,
styles: [`
  .app-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 6px;
    color: white;
    z-index: 9999;
    min-width: 220px;
    font-weight: 500;
  }
  .success { background: #28a745; }
  .error { background: #dc3545; }
  .info { background: #007bff; }
`]

})
export class ToastComponent {
  constructor(public toast: ToastService) {}
}
