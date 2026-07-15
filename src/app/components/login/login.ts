import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('token')) {

      this.router.navigate(['/dashboard']);

    }

  }

  login(): void {

    if (!this.loginData.email.trim()) {
      alert("Email is required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.loginData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!this.loginData.password.trim()) {
      alert("Password is required");
      return;
    }

    if (this.loginData.password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    this.authService.login(this.loginData).subscribe({

      next: (response) => {

        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {

        console.log(err);

        alert("Invalid Email or Password");

      }

    });

  }

}