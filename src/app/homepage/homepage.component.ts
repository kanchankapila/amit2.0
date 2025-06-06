
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataApiService } from '../core/services/data-api.service';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Subject, takeUntil, catchError, EMPTY, combineLatest } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GlobalMarketData, ScreenerData, StockData } from '../core/models/market.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ChartOptions } from '../core/models/chart.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    RadioButtonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ChartModule,
    NgApexchartsModule,
    BaseChartDirective,
    ScrollingModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [DataApiService, provideCharts(withDefaultRegisterables())],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomepageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private dataApi = inject(DataApiService);
  private snackBar = inject(MatSnackBar);
  private refreshInterval?: number;

  // Loading states
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Data states
  globalMarket = signal<GlobalMarketData[]>([]);
  screener = signal<ScreenerData[]>([]);
  pdstocks = signal<StockData[]>([]);
  ssstocks = signal<StockData[]>([]);
  selectedValue = signal<string>('moversvolume');
  selectedValueGainers = signal('gainers,intraday,desc,1d');
  selectedValueLosers = signal('losers,intraday,asc,1d');
  tableDataGainers = signal<ScreenerData[]>([]);
  tableDataLosers = signal<ScreenerData[]>([]);

  // Chart data
  advdecChartData = signal<any>({
    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    datasets: [
      {
        label: 'Advances',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#46c35f',
        fill: false
      },
      {
        label: 'Declines',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#f96868',
        fill: false
      }
    ]
  });

  advdecChartOptions = signal<any>({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  });

  advdecChartType = 'line';

  // UI states
  dialogVisible = signal<boolean[]>([]);

  // Chart configurations
  chartOptions1 = signal<Partial<ChartOptions>>(null);
  chartOptions5 = signal<Partial<ChartOptions>>(null);
  chartOptions6 = signal<Partial<ChartOptions>>(null);

  constructor() {}

  ngOnInit() {
    this.setupDataStreams();
    this.setupRefreshIntervals();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  setupDataStreams(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Fetch both global market data and screener data
    combineLatest([
      this.dataApi.getNtGlobal(),
      this.dataApi.getTlScreeners(this.selectedValue())
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ([globalData, screenerData]) => {
        this.globalMarket.set(globalData);
        this.screener.set(screenerData);
        this.updateCharts();
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching market data:', error);
        this.error.set('Failed to load market data. Please try again.');
        this.isLoading.set(false);
      }
    });

    // Stock data
    this.loadStockData();
  }

  private loadStockData() {
    this.dataApi.getStockData('pd').pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.handleError('Failed to load PD stock data', error);
        return EMPTY;
      })
    ).subscribe(data => {
      this.pdstocks.set(data);
    });

    this.dataApi.getStockData('ss').pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.handleError('Failed to load SS stock data', error);
        return EMPTY;
      })
    ).subscribe(data => {
      this.ssstocks.set(data);
    });
  }

  private setupRefreshIntervals() {
    this.refreshInterval = window.setInterval(() => {
      this.setupDataStreams();
    }, 30000) as unknown as number;
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    this.error.set(message);
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  // Event handlers
  onScreenerValueChange(event: any) {
    this.selectedValue.set(event.value);
    this.setupDataStreams();
  }

  onClick(event: any) {
    const value = event.value;
    this.selectedValueGainers.set(value);
    this.loadGainersData(value);
  }

  onClick1(event: any) {
    const value = event.value;
    this.selectedValueGainers.set(value);
    this.loadHourlyGainersData(value);
  }

  onClick2(event: any) {
    const value = event.value;
    this.selectedValueLosers.set(value);
    this.loadLosersData(value);
  }

  onClick3(event: any) {
    const value = event.value;
    this.selectedValueLosers.set(value);
    this.loadHourlyLosersData(value);
  }

  onClick4(event: any) {
    const value = event.value;
    this.selectedValue.set(value);
    this.loadPredefinedFilters(value);
  }

  onClick5(event: any) {
    const value = event.value;
    this.selectedValue.set(value);
    this.loadStockScoreFilters(value);
  }

  onClick6(event: any): void {
    this.selectedValue.set(event.value);
    this.updateScreenerData(event.value);
  }

  private loadGainersData(value: string) {
    // Implementation for loading gainers data
    console.log('Loading gainers data:', value);
  }

  private loadHourlyGainersData(value: string) {
    // Implementation for loading hourly gainers data
    console.log('Loading hourly gainers data:', value);
  }

  private loadLosersData(value: string) {
    // Implementation for loading losers data
    console.log('Loading losers data:', value);
  }

  private loadHourlyLosersData(value: string) {
    // Implementation for loading hourly losers data
    console.log('Loading hourly losers data:', value);
  }

  private loadPredefinedFilters(value: string) {
    // Implementation for loading predefined filters
    console.log('Loading predefined filters:', value);
  }

  private loadStockScoreFilters(value: string) {
    // Implementation for loading stock score filters
    console.log('Loading stock score filters:', value);
  }

  private updateScreenerData(type: string): void {
    this.isLoading.set(true);
    this.dataApi.getTlScreeners(type)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.screener.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error fetching screener data:', error);
          this.error.set('Failed to load screener data. Please try again.');
          this.isLoading.set(false);
        }
      });
  }

  private updateCharts(): void {
    // Update chart configurations based on the current data
    this.chartOptions1.set({
      series: [{
        name: 'Market Trend',
        data: []
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []
      }
    });

    this.chartOptions5.set({
      series: [{
        name: 'Volume',
        data: []
      }],
      chart: {
        type: 'pie',
        height: 350
      },
      dataLabels: {
        enabled: false
      }
    });

    this.chartOptions6.set({
      series: [{
        name: 'Price',
        data: []
      }],
      chart: {
        type: 'line',
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []
      }
    });
  }

  // TrackBy functions
  trackByGlobalMarket(index: number, item: GlobalMarketData): string {
    return item.text1;
  }

  trackByScreener(index: number, item: ScreenerData): string {
    return item.text1;
  }

  trackByPdStocks(index: number, item: StockData): string {
    return item.text1;
  }

  trackBySsStocks(index: number, item: StockData): string {
    return item.text1;
  }

  maximizeDialog(index: number): void {
    const dialogStates = [...this.dialogVisible()];
    dialogStates[index] = true;
    this.dialogVisible.set(dialogStates);
  }
}
