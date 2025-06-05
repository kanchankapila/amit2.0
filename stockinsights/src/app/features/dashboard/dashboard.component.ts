import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="grid-container">
      <h1 class="mat-h1">Dashboard</h1>
      <mat-grid-list [cols]="cols" rowHeight="350px">
        <!-- Market Overview Card -->
        <mat-grid-tile [colspan]="2" [rowspan]="1">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>Market Overview</mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <!-- Add market overview content -->
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Top Gainers Card -->
        <mat-grid-tile [colspan]="1" [rowspan]="1">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>Top Gainers</mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <!-- Add top gainers content -->
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Top Losers Card -->
        <mat-grid-tile [colspan]="1" [rowspan]="1">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>Top Losers</mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <!-- Add top losers content -->
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Market News Card -->
        <mat-grid-tile [colspan]="2" [rowspan]="1">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>Market News</mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <!-- Add market news content -->
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Portfolio Summary Card -->
        <mat-grid-tile [colspan]="2" [rowspan]="1">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>Portfolio Summary</mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <!-- Add portfolio summary content -->
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .grid-container {
      margin: 20px;
    }
    
    .dashboard-card {
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
    }
    
    .dashboard-card-content {
      text-align: center;
    }
    
    .mat-h1 {
      margin-bottom: 20px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  cols: number = 4;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          return 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          return 3;
        }
        return 4;
      })
    ).subscribe(cols => this.cols = cols);
  }
} 