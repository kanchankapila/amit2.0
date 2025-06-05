import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, takeUntil, shareReplay, distinctUntilChanged } from 'rxjs';
import { DataApiService } from '../core/services/data-api.service';
import { provideCharts, withDefaultRegisterables } from 'chart.js';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    ScrollingModule
  ],
  providers: [
    DataApiService, 
    provideCharts(withDefaultRegisterables())
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private dataApi = inject(DataApiService);
  private refreshInterval: number | undefined;

  // Signals for reactive state management
  globalMarket = signal<any[]>([]);
  screener = signal<any[]>([]);
  sectors = signal<any[]>([]);
  selectedValue = signal('moversvolume');
  chartOptions = signal<any>(null);
  chartOptions1 = signal<any>(null);
  chartOptions5 = signal<any>(null);
  chartOptions6 = signal<any>(null);

  // Computed values
  filteredScreener = computed(() => {
    const screenerData = this.screener();
    const value = this.selectedValue();
    // Add your filtering logic here
    return screenerData;
  });

  // Virtual scrolling configuration
  readonly itemSize = 50;
  readonly pageSize = 10;

  constructor() {
    this.initializeChartOptions();
  }

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

  private setupDataStreams() {
    // Global market data stream
    this.dataApi.getntglobal().pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      shareReplay(1)
    ).subscribe(data => {
      const marketData = this.transformGlobalMarketData(data);
      this.globalMarket.set(marketData);
    });

    // Screener data stream
    this.dataApi.getEtScreenersData(this.selectedValue()).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      shareReplay(1)
    ).subscribe(data => {
      const screenerData = this.transformScreenerData(data);
      this.screener.set(screenerData);
    });

    // Sectors data stream
    this.dataApi.getSectorPerformance().pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      shareReplay(1)
    ).subscribe(data => {
      const sectorData = this.transformSectorData(data);
      this.sectors.set(sectorData);
    });
  }

  private setupRefreshIntervals() {
    this.refreshInterval = window.setInterval(() => {
      this.setupDataStreams();
    }, 30000) as unknown as number;
  }

  // Event handlers
  onScreenerValueChange(event: any) {
    this.selectedValue.set(event.value);
    this.setupDataStreams();
  }

  // TrackBy functions for performance
  trackByGlobalMarket(index: number, item: any): string {
    return item.text1 + item.text2;
  }

  trackByScreener(index: number, item: any): string {
    return item.text1;
  }

  trackBySector(index: number, item: any): string {
    return item.name;
  }

  // Data transformation methods
  private transformGlobalMarketData(data: any): any[] {
    if (!data) return [];
    const nestedItems = Object.values(data);
    const marketData = [];
    
    for (const item of nestedItems[0]?.resultData || []) {
      for (const marketItem of item.data || []) {
        marketData.push({
          text1: marketItem.symbol,
          text2: marketItem.country,
          text3: marketItem.change_per,
          text4: marketItem.change_value,
          text5: marketItem.timestamp
        });
      }
    }
    
    return marketData;
  }

  private transformScreenerData(data: any): any[] {
    if (!data) return [];
    const nestedItems = Object.values(data);
    return nestedItems[0]?.page?.map(item => ({
      text1: item.companyShortName,
      text2: item.absoluteChange,
      text3: item.ltp,
      text4: item.priceTargetHigh,
      text5: item.priceTargetLow,
      text6: item.recStrongBuyCnt,
      text7: item.recSellCnt,
      text8: item.recHoldCnt,
      text9: item.recText,
      text10: item.riskScore,
      text11: item.techScore,
      text12: item.analystScore
    })) || [];
  }

  private transformSectorData(data: any): any[] {
    if (!data) return [];
    return data.map(sector => ({
      name: sector.name,
      change: sector.change,
      performance: sector.performance
    }));
  }

  private initializeChartOptions() {
    const baseChartOptions = {
      chart: {
        animations: {
          enabled: window.innerWidth > 768,
          dynamicAnimation: {
            speed: 350
          }
        },
        background: 'transparent',
        redrawOnWindowResize: false,
        redrawOnParentResize: true,
        defaultLocale: 'en',
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      tooltip: {
        theme: 'dark',
        shared: true,
        intersect: false
      },
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back'
      },
      dataLabels: {
        enabled: false
      }
    };

    this.chartOptions.set({
      ...baseChartOptions,
      series: [{
        name: 'Market Value',
        data: []
      }],
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value: number) => value.toFixed(2)
        }
      }
    });

    // Initialize other chart options similarly
    this.chartOptions1.set({ ...baseChartOptions });
    this.chartOptions5.set({ ...baseChartOptions });
    this.chartOptions6.set({ ...baseChartOptions });
  }
} 