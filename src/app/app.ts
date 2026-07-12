import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { DashboardService } from './services/dashboard';
import { TransactionService } from './services/transaction';
import { BudgetService } from './services/budget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  transactions: any[] = [];
  budgets: any[] = [];

  newTransaction = {
    amount: 0,
    category: '',
    transactionType: 'EXPENSE',
    description: '',
    date: '',
    user: {
      id: 1
    }
  };

  newBudget = {
    category: '',
    monthlyLimit: 0,
    month: 7,
    year: 2026,
    user: {
      id: 1
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private transactionService: TransactionService,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadTransactions();
    this.loadBudgets();
  }

  loadDashboard(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.totalIncome = data.totalIncome;
        this.totalExpense = data.totalExpense;
        this.balance = data.balance;
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  loadBudgets(): void {
    this.budgetService.getBudgets().subscribe({
      next: (data) => {
        this.budgets = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  addTransaction(): void {

    this.transactionService.addTransaction(this.newTransaction).subscribe({

      next: () => {

        alert("Transaction Added Successfully");

        this.newTransaction = {
          amount: 0,
          category: '',
          transactionType: 'EXPENSE',
          description: '',
          date: '',
          user: {
            id: 1
          }
        };

        this.loadDashboard();
        this.loadTransactions();

      },

      error: (err) => {
        console.log(err);
        alert("Failed to add transaction");
      }

    });

  }

  addBudget(): void {

    this.budgetService.addBudget(this.newBudget).subscribe({

      next: () => {

        alert("Budget Added Successfully");

        this.newBudget = {
          category: '',
          monthlyLimit: 0,
          month: 7,
          year: 2026,
          user: {
            id: 1
          }
        };

        this.loadBudgets();

      },

      error: (err) => {
        console.log(err);
        alert("Failed to add budget");
      }

    });

  }

}