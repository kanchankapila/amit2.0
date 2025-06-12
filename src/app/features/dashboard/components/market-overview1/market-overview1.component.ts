import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { DataapiService } from '../../../../dataapi.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IndexData } from '../../../../core/models/market.interface';

interface MarketStats {
  advances: number;
  declines: number;
  unchanged: number;
}

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class MarketOverviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loading = true;
  indices: IndexData[] = [];
  marketStats: MarketStats = {
    advances: 0,
    declines: 0,
    unchanged: 0
  };

  constructor(
    // private dataApiService: DataapiService
    ) {}

  ngOnInit(): void {
    this.loadMarketData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMarketData(): void {
    this.loading = true;

    // Load Nifty data
    // this.dataApiService.getNiftyData().pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe({
    //   next: (data) => {
    //     this.indices.push({
    //       ...data,
    //       name: 'NIFTY 50'
    //     });
    //     this.updateMarketStats();
    //   },
    //   error: (error) => console.error('Error loading Nifty data:', error)
    // });

    // Load Bank Nifty data
    // this.dataApiService.getBankNiftyData().pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe({
    //   next: (data) => {
    //     this.indices.push({
    //       ...data,
    //       name: 'BANK NIFTY'
    //     });
    //     this.updateMarketStats();
    //   },
    //   error: (error) => console.error('Error loading Bank Nifty data:', error)
    // });

    // Load Pharma Nifty data
    // this.dataApiService.getPharmaNiftyData().pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe({
    //   next: (data) => {
    //     this.indices.push({
    //       ...data,
    //       name: 'PHARMA NIFTY'
    //     });
    //     this.updateMarketStats();
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error loading Pharma Nifty data:', error);
    //     this.loading = false;
    //   }
    // });
  }

  private updateMarketStats(): void {
    this.marketStats = this.indices.reduce((stats, index) => {
      if (index.components) {
        index.components.forEach(component => {
          if (component.changePercent > 0) stats.advances++;
          else if (component.changePercent < 0) stats.declines++;
          else stats.unchanged++;
        });
      }
      return stats;
    }, { advances: 0, declines: 0, unchanged: 0 });
  }
} 