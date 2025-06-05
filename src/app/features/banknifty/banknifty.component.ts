import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, distinctUntilChanged, shareReplay, takeUntil } from 'rxjs/operators';
import { DataApiService } from '../../core/services/data-api.service';
import { LoadingService } from '../../core/services/loading.service';
import { IndexData } from '../../core/models/market.interface';
import type { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-banknifty',
  templateUrl: './banknifty.component.html',
  styleUrls: ['./banknifty.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankNiftyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  indexData: IndexData | null = null;
  bankNiftyData$: Observable<IndexData>;
  loading$: Observable<boolean>;
  loading = true;
  error = false;

  // Chart options
  chartOptions: EChartsOption = {
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
        data: [],
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ],
    tooltip: {
      trigger: 'axis'
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

  constructor(
    private dataApiService: DataApiService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.bankNiftyData$ = this.dataApiService.getBankNiftyData();
    this.loading$ = this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    this.loadBankNiftyData();
    this.fetchAdditionalData();
  }

  private loadBankNiftyData(): void {
    this.loading = true;
    this.error = false;
    this.bankNiftyData$ = this.dataApiService.getBankNiftyData().pipe(
      map((data: IndexData) => ({
        ...data,
        timestamp: new Date()
      })),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.bankNiftyData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.indexData = data;
        this.updateChart([data]);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading BankNifty data:', error);
        this.error = true;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  private updateChart(data: IndexData[]): void {
    const timestamps = data.map(item => new Date(item.timestamp).toLocaleTimeString());
    const prices = data.map(item => item.price);

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis as any,
        data: timestamps
      },
      series: [
        {
          ...this.chartOptions.series?.[0],
          data: prices
        }
      ]
    };
  }

  private async fetchAdditionalData(): Promise<void> {
    try {
      const [bankNiftyPcr, ttmmi] = await Promise.all([
        this.dataApiService.getNtBankNiftyPcrDetails().toPromise(),
        this.dataApiService.getTtmmi().toPromise()
      ]);

      // Process PCR data
      if (bankNiftyPcr) {
        // Handle PCR data
      }

      // Process TTMMI data
      if (ttmmi) {
        // Handle TTMMI data
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 