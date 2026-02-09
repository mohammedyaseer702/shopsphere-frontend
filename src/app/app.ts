import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { ToastComponent } from "./toast/toast";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, Navbar, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shopsphere-frontend');
}
