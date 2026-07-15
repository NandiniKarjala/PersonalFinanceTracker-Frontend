import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  totalTransactions = 0;
  incomeTransactions = 0;
  expenseTransactions = 0;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.dashboardService.getDashboard().subscribe({

      next: (data) => {

        console.log("Dashboard Response:", data);

        this.totalIncome = Number(data.totalIncome);
        this.totalExpense = Number(data.totalExpense);
        this.balance = Number(data.balance);

        this.totalTransactions = Number(data.totalTransactions);
        this.incomeTransactions = Number(data.incomeTransactions);
        this.expenseTransactions = Number(data.expenseTransactions);
        
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}