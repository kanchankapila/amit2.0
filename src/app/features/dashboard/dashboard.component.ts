import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

// Import widget components
import { MarketOverviewComponent } from './components/market-overview/market-overview.component';
import { MarketOverviewChartComponent } from './components/market-overview-chart/market-overview-chart.component';
import { WatchlistWidgetComponent } from './components/watchlist-widget/watchlist-widget.component';
import { NewsWidgetComponent } from './components/news-widget/news-widget.component';
import { PortfolioWidgetComponent } from './components/portfolio-widget/portfolio-widget.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MarketOverviewComponent,
    MarketOverviewChartComponent,
    WatchlistWidgetComponent,
    NewsWidgetComponent,
    PortfolioWidgetComponent
  ]
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