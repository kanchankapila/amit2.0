import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface PortfolioHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  value: number;
  pl: number;
  plPercentage: number;
}

@Component({
  selector: 'app-portfolio-widget',
  templateUrl: './portfolio-widget.component.html',
  styleUrls: ['./portfolio-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PortfolioWidgetComponent implements OnInit {
  loading = true;

  selectedView = 'summary';
  displayedColumns = ['symbol', 'quantity', 'avgPrice', 'currentPrice', 'pl'];

  holdings: PortfolioHolding[] = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      quantity: 100,
      avgPrice: 2200.50,
      currentPrice: 2450.75,
      change: 1.25,
      value: 245075,
      pl: 25025,
      plPercentage: 11.37
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      quantity: 50,
      avgPrice: 3100.25,
      currentPrice: 3275.50,
      change: -0.75,
      value: 163775,
      pl: 8762.50,
      plPercentage: 5.65
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank',
      quantity: 200,
      avgPrice: 1600.00,
      currentPrice: 1575.25,
      change: 0.50,
      value: 315050,
      pl: -4950,
      plPercentage: -1.55
    }
  ];

  get totalValue(): number {
    return this.holdings.reduce((sum, holding) => sum + holding.value, 0);
  }

  get totalPL(): number {
    return this.holdings.reduce((sum, holding) => sum + holding.pl, 0);
  }

  get totalPLPercentage(): number {
    const totalInvestment = this.holdings.reduce((sum, holding) => sum + (holding.avgPrice * holding.quantity), 0);
    return (this.totalPL / totalInvestment) * 100;
  }

  get todaysPL(): number {
    return this.holdings.reduce((sum, holding) => sum + (holding.change * holding.quantity), 0);
  }

  get todaysPLPercentage(): number {
    return (this.todaysPL / this.totalValue) * 100;
  }

  ngOnInit(): void {
    // TODO: Implement portfolio data loading
    this.loading = false;
  }
} 