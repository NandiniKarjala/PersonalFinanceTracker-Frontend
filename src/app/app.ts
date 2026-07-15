import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  CommonModule,
  RouterOutlet,
  Navbar,
  Footer
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  showNavbar = false;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.showNavbar =
          event.url !== '/login' &&
          event.url !== '/register';

      }

    });

  }

}