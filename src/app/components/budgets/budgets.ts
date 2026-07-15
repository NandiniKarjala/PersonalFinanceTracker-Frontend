import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetService } from '../../services/budget';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './budgets.html',
  styleUrl: './budgets.css'
})
export class Budgets implements OnInit {

  budgets: any[] = [];

  selectedBudget: any = null;

  newBudget = {
    category: '',
    monthlyLimit: 0,
    month: 1,
    year: new Date().getFullYear()
  };

  constructor(
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {

    this.budgetService.getBudgets().subscribe({

      next: (data) => {

        this.budgets = [...data];

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addBudget(): void {

    if (!this.newBudget.category.trim()) {

      alert("Category is required");

      return;

    }

    if (this.newBudget.monthlyLimit <= 0) {

      alert("Monthly Limit must be greater than 0");

      return;

    }

    if (this.newBudget.month < 1 || this.newBudget.month > 12) {

      alert("Month must be between 1 and 12");

      return;

    }

    if (!this.newBudget.year) {

      alert("Year is required");

      return;

    }

    this.budgetService.addBudget(this.newBudget).subscribe({

      next: () => {

        this.newBudget = {
          category: '',
          monthlyLimit: 0,
          month: 1,
          year: new Date().getFullYear()
        };

        this.loadBudgets();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to add budget");

      }

    });

  }

  editBudget(budget: any): void {

    this.selectedBudget = { ...budget };

  }

  updateBudget(): void {

    if (!this.selectedBudget) {
      return;
    }

    if (!this.selectedBudget.category.trim()) {

      alert("Category is required");

      return;

    }

    if (this.selectedBudget.monthlyLimit <= 0) {

      alert("Monthly Limit must be greater than 0");

      return;

    }

    if (this.selectedBudget.month < 1 || this.selectedBudget.month > 12) {

      alert("Month must be between 1 and 12");

      return;

    }

    if (!this.selectedBudget.year) {

      alert("Year is required");

      return;

    }

    this.budgetService.updateBudget(
      this.selectedBudget.id,
      this.selectedBudget
    ).subscribe({

      next: () => {

        this.selectedBudget = null;

        this.loadBudgets();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to update budget");

      }

    });

  }

  deleteBudget(id: number): void {

    if (!confirm("Are you sure you want to delete this budget?")) {
      return;
    }

    this.budgetService.deleteBudget(id).subscribe({

      next: () => {

        this.loadBudgets();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to delete budget");

      }

    });

  }

}