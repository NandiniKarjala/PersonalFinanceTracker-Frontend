import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  registerData = {
    username: '',
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

  register(): void {

    if (!this.registerData.username.trim()) {
      alert("Username is required");
      return;
    }

    if (this.registerData.username.length < 3) {
      alert("Username must contain at least 3 characters");
      return;
    }

    if (!this.registerData.email.trim()) {
      alert("Email is required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.registerData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!this.registerData.password.trim()) {
      alert("Password is required");
      return;
    }

    if (this.registerData.password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    this.authService.register(this.registerData).subscribe({

      next: () => {

        alert("User Registered Successfully");

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.log(err);

        alert(err.error.message || "Registration Failed");

      }

    });

  }

}