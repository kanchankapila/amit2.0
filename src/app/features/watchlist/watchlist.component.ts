import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  sector: string;
  addedDate: Date;
  alerts: boolean;
}

@Component({
  selector: 'app-watchlist',
  template: `
    <div class="watchlist-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>My Watchlist</mat-card-title>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="addToWatchlist()">
              <mat-icon>add</mat-icon>
              Add Stock
            </button>
          </div>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="dataSource" matSort class="watchlist-table">
            <!-- Symbol Column -->
            <ng-container matColumnDef="symbol">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Symbol </th>
              <td mat-cell *matCellDef="let item"> {{ item.symbol }} </td>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
              <td mat-cell *matCellDef="let item"> {{ item.name }} </td>
            </ng-container>

            <!-- Price Column -->
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Price </th>
              <td mat-cell *matCellDef="let item"> {{ item.price | number:'1.2-2' }} </td>
            </ng-container>

            <!-- Change Column -->
            <ng-container matColumnDef="change">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Change </th>
              <td mat-cell *matCellDef="let item" [class.up]="item.change > 0" [class.down]="item.change < 0">
                {{ item.change > 0 ? '+' : ''}}{{ item.change | number:'1.2-2' }}%
              </td>
            </ng-container>

            <!-- Volume Column -->
            <ng-container matColumnDef="volume">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Volume </th>
              <td mat-cell *matCellDef="let item"> {{ item.volume | number }} </td>
            </ng-container>

            <!-- Market Cap Column -->
            <ng-container matColumnDef="marketCap">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Market Cap (Cr) </th>
              <td mat-cell *matCellDef="let item"> {{ item.marketCap | number:'1.0-0' }} </td>
            </ng-container>

            <!-- P/E Ratio Column -->
            <ng-container matColumnDef="peRatio">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> P/E Ratio </th>
              <td mat-cell *matCellDef="let item"> {{ item.peRatio | number:'1.2-2' }} </td>
            </ng-container>

            <!-- Sector Column -->
            <ng-container matColumnDef="sector">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Sector </th>
              <td mat-cell *matCellDef="let item"> {{ item.sector }} </td>
            </ng-container>

            <!-- Added Date Column -->
            <ng-container matColumnDef="addedDate">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Added On </th>
              <td mat-cell *matCellDef="let item"> {{ item.addedDate | date:'mediumDate' }} </td>
            </ng-container>

            <!-- Alerts Column -->
            <ng-container matColumnDef="alerts">
              <th mat-header-cell *matHeaderCellDef> Alerts </th>
              <td mat-cell *matCellDef="let item">
                <mat-slide-toggle [checked]="item.alerts" (change)="toggleAlerts(item)">
                </mat-slide-toggle>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let item">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="setAlerts(item)">
                    <mat-icon>notifications</mat-icon>
                    <span>Set Alerts</span>
                  </button>
                  <button mat-menu-item (click)="removeFromWatchlist(item)">
                    <mat-icon>delete</mat-icon>
                    <span>Remove</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[10, 25, 50, 100]"
                        showFirstLastButtons
                        aria-label="Select page of watchlist items">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .watchlist-container {
      padding: 1rem;
    }
    .header-actions {
      margin-left: auto;
    }
    .watchlist-table {
      width: 100%;
      margin-top: 1rem;
    }
    .up {
      color: #4caf50;
    }
    .down {
      color: #f44336;
    }
    .mat-column-actions {
      width: 48px;
      text-align: center;
    }
    .mat-column-alerts {
      width: 80px;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchlistComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'symbol',
    'name',
    'price',
    'change',
    'volume',
    'marketCap',
    'peRatio',
    'sector',
    'addedDate',
    'alerts',
    'actions'
  ];
  
  dataSource: MatTableDataSource<WatchlistItem>;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<WatchlistItem>();
  }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadWatchlist(): void {
    this.loadingService.start('watchlist');
    // TODO: Implement watchlist data loading
    // For now, using mock data
    const mockData: WatchlistItem[] = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        price: 2500.50,
        change: 1.25,
        volume: 5000000,
        marketCap: 1500000,
        peRatio: 25.5,
        sector: 'Oil & Gas',
        addedDate: new Date(),
        alerts: true
      },
      // Add more mock data as needed
    ];

    this.dataSource.data = mockData;
    this.loadingService.stop('watchlist');
    this.cdr.markForCheck();
  }

  addToWatchlist(): void {
    // TODO: Implement add to watchlist functionality
    console.log('Add to watchlist clicked');
  }

  removeFromWatchlist(item: WatchlistItem): void {
    // TODO: Implement remove from watchlist functionality
    console.log('Remove from watchlist:', item);
  }

  setAlerts(item: WatchlistItem): void {
    // TODO: Implement set alerts functionality
    console.log('Set alerts for:', item);
  }

  toggleAlerts(item: WatchlistItem): void {
    // TODO: Implement toggle alerts functionality
    console.log('Toggle alerts for:', item);
  }
} 