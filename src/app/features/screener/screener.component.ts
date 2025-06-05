import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataApiService } from '../../core/services/data-api.service';
import { LoadingService } from '../../core/services/loading.service';
import { StockData, ScreenerCriteria } from '../../core/models/market.interface';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ScreenerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  @ViewChild(MatTable) table!: MatTable<StockData>;

  filterForm: FormGroup;
  sectors: string[] = [
    'Technology',
    'Healthcare',
    'Finance',
    'Consumer Goods',
    'Energy',
    'Industrial',
    'Materials',
    'Utilities',
    'Real Estate',
    'Communication'
  ];

  industries: string[] = [
    'Software',
    'Hardware',
    'Banking',
    'Insurance',
    'Pharmaceuticals',
    'Biotechnology',
    'Retail',
    'Manufacturing',
    'Mining',
    'Telecommunications'
  ];

  displayedColumns: string[] = ['symbol', 'name', 'price', 'change', 'volume', 'marketCap', 'pe', 'sector', 'industry'];
  filteredStocks: StockData[] = [];
  totalResults = 0;
  pageSize = 25;
  currentPage = 0;

  constructor(
    private fb: FormBuilder,
    private dataApiService: DataApiService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.filterForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      minMarketCap: [null],
      maxMarketCap: [null],
      minVolume: [null],
      maxVolume: [null],
      minPE: [null],
      maxPE: [null],
      sectors: [[]],
      industries: [[]]
    });

    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyFilters();
      });
  }

  applyFilters(): void {
    const formValues = this.filterForm.value;
    const criteria: ScreenerCriteria = {
      priceRange: formValues.minPrice || formValues.maxPrice ? {
        min: formValues.minPrice || 0,
        max: formValues.maxPrice || Number.MAX_VALUE
      } : undefined,
      marketCap: formValues.minMarketCap || formValues.maxMarketCap ? {
        min: formValues.minMarketCap || 0,
        max: formValues.maxMarketCap || Number.MAX_VALUE
      } : undefined,
      volume: formValues.minVolume || formValues.maxVolume ? {
        min: formValues.minVolume || 0,
        max: formValues.maxVolume || Number.MAX_VALUE
      } : undefined,
      peRatio: formValues.minPE || formValues.maxPE ? {
        min: formValues.minPE || 0,
        max: formValues.maxPE || Number.MAX_VALUE
      } : undefined,
      sector: formValues.sectors.length > 0 ? formValues.sectors : undefined,
      industry: formValues.industries.length > 0 ? formValues.industries : undefined
    };

    this.loadingService.start('screener');
    this.dataApiService.getScreenerResults(criteria)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stocks) => {
          this.filteredStocks = stocks;
          this.totalResults = stocks.length;
          this.table.renderRows();
          this.cdr.markForCheck();
          this.loadingService.stop('screener');
        },
        error: (error) => {
          console.error('Error fetching screener results:', error);
          this.loadingService.stop('screener');
        }
      });
  }

  resetFilters(): void {
    this.filterForm.reset({
      minPrice: null,
      maxPrice: null,
      minMarketCap: null,
      maxMarketCap: null,
      minVolume: null,
      maxVolume: null,
      minPE: null,
      maxPE: null,
      sectors: [],
      industries: []
    });
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.filteredStocks = [...this.filteredStocks].sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'symbol': return compare(a.symbol, b.symbol, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'change': return compare(a.change, b.change, isAsc);
        case 'volume': return compare(a.volume, b.volume, isAsc);
        case 'marketCap': return compare(a.marketCap, b.marketCap, isAsc);
        case 'pe': return compare(a.pe, b.pe, isAsc);
        case 'sector': return compare(a.sector, b.sector, isAsc);
        case 'industry': return compare(a.industry, b.industry, isAsc);
        default: return 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
}

function compare<T extends string | number>(a: T, b: T, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
} 