import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Report } from '../../services/report';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {

  report: any = {};

  constructor(
    private reportService: Report,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(): void {

    this.reportService.getReport().subscribe({

      next: (data) => {

        console.log("Report:", data);

        this.report = data;

        this.cdr.detectChanges();

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

}