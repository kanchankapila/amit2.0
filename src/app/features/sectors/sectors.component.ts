import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataApiService } from '../../core/services/data-api.service';
import { LoadingService } from '../../core/services/loading.service';
import type { EChartsOption } from 'echarts';

interface SectorData {
  name: string;
  change: number;
  marketCap: number;
  volume: number;
  topGainers: string[];
  topLosers: string[];
}

@Component({
  selector: 'app-sectors',
  template: `
    <div class="sectors-container">
      <h1>Sector Performance</h1>

      <!-- Sector Overview Chart -->
      <mat-card class="chart-card">
        <mat-card-content>
          <div echarts [options]="sectorChartOptions" class="chart"></div>
        </mat-card-content>
      </mat-card>

      <!-- Sector Grid -->
      <mat-grid-list cols="2" rowHeight="400px" gutterSize="16px">
        <mat-grid-tile *ngFor="let sector of sectors">
          <mat-card class="sector-card">
            <mat-card-header>
              <mat-card-title>{{ sector.name }}</mat-card-title>
              <mat-card-subtitle [class.up]="sector.change > 0" [class.down]="sector.change < 0">
                {{ sector.change > 0 ? '+' : ''}}{{ sector.change | number:'1.2-2' }}%
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="sector-stats">
                <div class="stat">
                  <span class="label">Market Cap</span>
                  <span class="value">₹{{ sector.marketCap | number:'1.0-0' }} Cr</span>
                </div>
                <div class="stat">
                  <span class="label">Volume</span>
                  <span class="value">{{ sector.volume | number }}</span>
                </div>
              </div>

              <div class="movers">
                <div class="gainers">
                  <h4>Top Gainers</h4>
                  <ul>
                    <li *ngFor="let gainer of sector.topGainers">{{ gainer }}</li>
                  </ul>
                </div>
                <div class="losers">
                  <h4>Top Losers</h4>
                  <ul>
                    <li *ngFor="let loser of sector.topLosers">{{ loser }}</li>
                  </ul>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .sectors-container {
      padding: 1rem;
    }
    .chart-card {
      margin-bottom: 2rem;
    }
    .chart {
      height: 400px;
    }
    .sector-card {
      width: 100%;
      height: 100%;
      margin: 8px;
    }
    .sector-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 1rem 0;
    }
    .stat {
      display: flex;
      flex-direction: column;
    }
    .stat .label {
      font-size: 0.875rem;
      color: var(--mat-text-secondary-color);
    }
    .stat .value {
      font-size: 1.25rem;
      font-weight: 500;
    }
    .movers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .movers h4 {
      margin-bottom: 0.5rem;
    }
    .movers ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .movers li {
      font-size: 0.875rem;
      padding: 0.25rem 0;
    }
    .up {
      color: #4caf50;
    }
    .down {
      color: #f44336;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectorsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  sectors: SectorData[] = [];

  sectorChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      {
        name: 'Performance',
        type: 'bar',
        data: [],
        itemStyle: {
          color: (params) => {
            const value = params.value as number;
            return value >= 0 ? '#4caf50' : '#f44336';
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%'
        }
      }
    ]
  };

  constructor(
    private dataApiService: DataApiService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSectorData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSectorData(): void {
    this.loadingService.start('sectors');
    this.dataApiService.getSectorsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.sectors = data;
          this.updateChartData(data);
          this.cdr.markForCheck();
          this.loadingService.stop('sectors');
        },
        error: (error) => {
          console.error('Error loading sector data:', error);
          this.loadingService.stop('sectors');
        }
      });
  }

  private updateChartData(data: SectorData[]): void {
    const sortedData = [...data].sort((a, b) => b.change - a.change);
    
    this.sectorChartOptions = {
      ...this.sectorChartOptions,
      yAxis: {
        ...this.sectorChartOptions.yAxis as any,
        data: sortedData.map(sector => sector.name)
      },
      series: [
        {
          ...this.sectorChartOptions.series?.[0],
          data: sortedData.map(sector => sector.change)
        }
      ]
    };
  }
} 