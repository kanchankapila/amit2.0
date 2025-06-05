import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { DataApiService } from '../../core/services/data-api.service';
import { LoadingService } from '../../core/services/loading.service';
import type { EChartsOption } from 'echarts';
import * as stockList from '../../lists/stocklist';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'neutral';
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    MatProgressSpinnerModule
  ]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loading$: Observable<boolean>;

  selectedStock: string = '';
  selectedTimeframe: string = '1D';
  stockSuggestions: string[] = [];

  technicalIndicators: TechnicalIndicator[] = [];

  // Price Chart Options
  priceChartOptions: EChartsOption = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: 'Price',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {}
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ]
  };

  // Volume Chart Options
  volumeChartOptions: EChartsOption = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: 'Volume',
        type: 'bar',
        data: []
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  };

  constructor(
    private dataApiService: DataApiService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.loading$ = this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    // Load initial stock suggestions
    this.loadStockSuggestions();

    // Set up real-time data updates
    if (this.selectedStock) {
      this.setupRealTimeUpdates();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStockChange(): void {
    if (this.selectedStock) {
      this.loadStockData();
      this.setupRealTimeUpdates();
    }
  }

  onTimeframeChange(): void {
    if (this.selectedStock) {
      this.loadStockData();
    }
  }

  private loadStockSuggestions(): void {
    // Use the stock list from stocklist.ts
    this.stockSuggestions = stockList.default.Data.map(stock => stock.symbol);
    this.cdr.markForCheck();
  }

  private setupRealTimeUpdates(): void {
    // Subscribe to real-time updates
    combineLatest([
      this.dataApiService.getNtStockDetails(this.selectedStock),
      this.dataApiService.getNtStock1Yr(this.selectedStock)
    ])
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      shareReplay(1)
    )
    .subscribe({
      next: ([details, history]) => {
        this.updateCharts(history);
        this.updateIndicators(details);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching analytics data:', error);
      }
    });
  }

  private loadStockData(): void {
    combineLatest([
      this.dataApiService.getNtStockDetails(this.selectedStock),
      this.dataApiService.getNtStock1Yr(this.selectedStock)
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ([details, history]) => {
        this.updateCharts(history);
        this.updateIndicators(details);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading stock data:', error);
      }
    });
  }

  private updateCharts(data: any): void {
    const timestamps = data.map((item: any) => new Date(item.timestamp).toLocaleTimeString());
    const prices = data.map((item: any) => item.price);
    const volumes = data.map((item: any) => item.volume);

    // Update price chart
    this.priceChartOptions = {
      ...this.priceChartOptions,
      xAxis: {
        ...this.priceChartOptions.xAxis as any,
        data: timestamps
      },
      series: [
        {
          ...this.priceChartOptions.series?.[0],
          data: prices
        }
      ]
    };

    // Update volume chart
    this.volumeChartOptions = {
      ...this.volumeChartOptions,
      xAxis: {
        ...this.volumeChartOptions.xAxis as any,
        data: timestamps
      },
      series: [
        {
          ...this.volumeChartOptions.series?.[0],
          data: volumes
        }
      ]
    };
  }

  private updateIndicators(data: any): void {
    // Update technical indicators
    this.technicalIndicators = [
      {
        name: 'RSI',
        value: data.rsi || 0,
        signal: this.getSignal(data.rsi || 0, 30, 70)
      },
      {
        name: 'MACD',
        value: data.macd || 0,
        signal: this.getSignal(data.macd || 0, -0.5, 0.5)
      },
      // Add more indicators as needed
    ];
  }

  private getSignal(value: number, lowThreshold: number, highThreshold: number): 'buy' | 'sell' | 'neutral' {
    if (value <= lowThreshold) return 'buy';
    if (value >= highThreshold) return 'sell';
    return 'neutral';
  }
} 