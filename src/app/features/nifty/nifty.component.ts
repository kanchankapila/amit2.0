import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DataApiService } from '../../core/services/data-api.service';
import { IndexData } from '../../core/models/market.interface';

@Component({
  selector: 'app-nifty',
  templateUrl: './nifty.component.html',
  styleUrls: ['./nifty.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ]
})
export class NiftyComponent implements OnInit, OnDestroy {
  loading = true;
  error = false;
  niftyData: IndexData | null = null;
  private destroy$ = new Subject<void>();

  constructor(private dataApi: DataApiService) {}

  ngOnInit(): void {
    this.loadNiftyData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadNiftyData(): void {
    this.loading = true;
    this.error = false;

    this.dataApi.getNiftyData()
      .pipe(
        takeUntil(this.destroy$),
        map((data: IndexData) => ({
          ...data,
          components: data.components.map(item => ({
            ...item,
            change: item.price - (item.price / (1 + item.changePercent / 100)),
            volume: Math.round(item.volume / 1000), // Convert to K
            marketCap: Math.round(item.marketCap / 10000000) / 100, // Convert to Cr
          })),
          timestamp: new Date(),
          lastUpdated: new Date()
        }))
      )
      .subscribe({
        next: (data) => {
          this.niftyData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading Nifty data:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
} 