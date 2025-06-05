import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DataApiService } from '../../core/services/data-api.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { AuthService } from '../../core/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgApexchartsModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header Section -->
      <header class="dashboard-header">
        <h1>Market Dashboard</h1>
        <div class="market-status" *ngIf="marketOverview() as overview">
          <div class="status-item" [class.positive]="overview.change > 0" [class.negative]="overview.change < 0">
            <span class="value">{{ overview.currentValue | number:'1.0-2' }}</span>
            <span class="change">
              <mat-icon>{{ overview.change > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
              {{ overview.change | number:'+1.0-2' }} ({{ overview.changePercent | number:'+1.0-2' }}%)
            </span>
          </div>
        </div>
      </header>

      <!-- Main Content Grid -->
      <div class="dashboard-grid">
        <!-- Market Overview Chart -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Market Performance</mat-card-title>
            <mat-card-subtitle>Last 24 Hours</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container" *ngIf="chartOptions">
              <apx-chart
                [series]="chartOptions.series"
                [chart]="chartOptions.chart"
                [xaxis]="chartOptions.xaxis"
                [yaxis]="chartOptions.yaxis"
                [tooltip]="chartOptions.tooltip"
                [theme]="chartOptions.theme"
                [fill]="chartOptions.fill"
                [stroke]="chartOptions.stroke"
              ></apx-chart>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Market Movers Section -->
        <mat-card class="movers-card">
          <mat-tabs>
            <!-- Top Gainers Tab -->
            <mat-tab label="Top Gainers">
              <div class="scrollable-list">
                <div class="stock-item" *ngFor="let stock of topGainers()" 
                     [class.positive]="stock.changePercent > 0">
                  <div class="stock-info">
                    <span class="symbol">{{ stock.symbol }}</span>
                    <span class="name">{{ stock.name }}</span>
                  </div>
                  <div class="stock-price">
                    <span class="current">₹{{ stock.price | number:'1.0-2' }}</span>
                    <span class="change">
                      <mat-icon>trending_up</mat-icon>
                      {{ stock.changePercent | number:'+1.0-2' }}%
                    </span>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Top Losers Tab -->
            <mat-tab label="Top Losers">
              <div class="scrollable-list">
                <div class="stock-item" *ngFor="let stock of topLosers()"
                     [class.negative]="stock.changePercent < 0">
                  <div class="stock-info">
                    <span class="symbol">{{ stock.symbol }}</span>
                    <span class="name">{{ stock.name }}</span>
                  </div>
                  <div class="stock-price">
                    <span class="current">₹{{ stock.price | number:'1.0-2' }}</span>
                    <span class="change">
                      <mat-icon>trending_down</mat-icon>
                      {{ stock.changePercent | number:'1.0-2' }}%
                    </span>
                  </div>
                </div>
              </div>
            </mat-tab>
          </mat-tabs>
        </mat-card>

        <!-- Sector Performance -->
        <mat-card class="sectors-card">
          <mat-card-header>
            <mat-card-title>Sector Performance</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="sectors-grid">
              <div class="sector-item" *ngFor="let sector of sectorPerformance()"
                   [class.positive]="sector.change > 0"
                   [class.negative]="sector.change < 0">
                <span class="sector-name">{{ sector.name }}</span>
                <span class="sector-change">
                  <mat-icon>{{ sector.change > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                  {{ sector.change | number:'+1.0-2' }}%
                </span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1600px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .market-status {
      display: flex;
      gap: 16px;
    }

    .status-item {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .value {
        font-size: 24px;
        font-weight: 500;
      }

      .change {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
      }
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }

    .chart-card {
      grid-column: 1 / -1;

      .chart-container {
        height: 400px;
        margin-top: 16px;
      }
    }

    .movers-card, .sectors-card {
      height: 500px;
      overflow: hidden;
    }

    .scrollable-list {
      height: calc(100% - 48px);
      overflow-y: auto;
      padding: 16px;
    }

    .stock-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);

      &:last-child {
        border-bottom: none;
      }

      .stock-info {
        display: flex;
        flex-direction: column;

        .symbol {
          font-weight: 500;
        }

        .name {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }

      .stock-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
        }
      }
    }

    .sectors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      padding: 16px;
    }

    .sector-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.04);

      .sector-change {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .positive {
      color: #4caf50;
    }

    .negative {
      color: #f44336;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 12px;
      }

      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .chart-card .chart-container {
        height: 300px;
      }

      .sectors-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomepageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private dataApi = inject(DataApiService);
  private errorHandler = inject(ErrorHandlerService);
  private authService = inject(AuthService);

  // Convert observables to signals for better performance
  marketOverview = toSignal(this.dataApi.getMarketOverview(), { initialValue: null });
  topGainers = toSignal(this.dataApi.getTopGainers(), { initialValue: [] });
  topLosers = toSignal(this.dataApi.getTopLosers(), { initialValue: [] });
  sectorPerformance = toSignal(this.dataApi.getSectorPerformance(), { initialValue: [] });

  chartOptions = signal({
    series: [{
      name: 'Market Value',
      data: []
    }],
    chart: {
      type: 'area',
      height: 400,
      toolbar: { show: false },
      animations: { enabled: true },
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value: number) => value.toFixed(2)
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm'
      },
      theme: 'dark'
    }
  });

  ngOnInit() {
    this.loadChartData();
    this.setupDataRefresh();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadChartData() {
    this.dataApi.getMarketOverview()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data?.historicalData) {
            this.chartOptions.update(current => ({
              ...current,
              series: [{
                ...current.series[0],
                data: data.historicalData.map((item: any) => ({
                  x: new Date(item.date).getTime(),
                  y: item.value
                }))
              }]
            }));
          }
        },
        error: (error) => this.errorHandler.handleErrorWithoutRethrowing(error)
      });
  }

  private setupDataRefresh() {
    const refreshInterval = setInterval(() => {
      if (this.authService.isAuthenticated()) {
        this.loadChartData();
      }
    }, 30000);

    this.destroy$.subscribe(() => clearInterval(refreshInterval));
  }
} 