import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions implements OnInit {

  transactions: any[] = [];

  selectedTransaction: any = null;

  newTransaction = {
    amount: 0,
    category: '',
    transactionType: 'EXPENSE',
    description: '',
    date: ''
  };

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {

    this.transactionService.getTransactions().subscribe({

      next: (data) => {

        this.transactions = [...data];

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addTransaction(): void {

    if (!this.newTransaction.category.trim()) {

      alert("Category is required");

      return;

    }

    if (this.newTransaction.amount <= 0) {

      alert("Amount must be greater than 0");

      return;

    }

    if (!this.newTransaction.date) {

      alert("Transaction date is required");

      return;

    }

    this.transactionService.addTransaction(this.newTransaction).subscribe({

      next: () => {

        this.newTransaction = {
          amount: 0,
          category: '',
          transactionType: 'EXPENSE',
          description: '',
          date: ''
        };

        this.loadTransactions();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to add transaction");

      }

    });

  }

  editTransaction(transaction: any): void {

    this.selectedTransaction = { ...transaction };

  }

  updateTransaction(): void {

    if (!this.selectedTransaction) {
      return;
    }

    if (!this.selectedTransaction.category.trim()) {

      alert("Category is required");

      return;

    }

    if (this.selectedTransaction.amount <= 0) {

      alert("Amount must be greater than 0");

      return;

    }

    if (!this.selectedTransaction.date) {

      alert("Transaction date is required");

      return;

    }

    this.transactionService.updateTransaction(
      this.selectedTransaction.id,
      this.selectedTransaction
    ).subscribe({

      next: () => {

        this.selectedTransaction = null;

        this.loadTransactions();

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to update transaction");

      }

    });

  }

  deleteTransaction(id: number): void {

    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    this.transactionService.deleteTransaction(id).subscribe({

      next: () => {

        alert("Transaction Deleted Successfully");

        this.loadTransactions();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to delete transaction");

      }

    });

  }

}