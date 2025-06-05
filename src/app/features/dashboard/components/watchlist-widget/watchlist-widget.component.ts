import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  isAlertSet: boolean;
}

@Component({
  selector: 'app-watchlist-widget',
  templateUrl: './watchlist-widget.component.html',
  styleUrls: ['./watchlist-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class WatchlistWidgetComponent implements OnInit {
  loading = true;

  constructor() {}

  displayedColumns = ['symbol', 'price', 'change', 'actions'];
  searchQuery = '';
  
  watchlist: WatchlistItem[] = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2450.75, change: 1.25, volume: 5000000, isAlertSet: false },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3275.50, change: -0.75, volume: 2000000, isAlertSet: true },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1575.25, change: 0.50, volume: 3000000, isAlertSet: false },
    { symbol: 'INFY', name: 'Infosys', price: 1425.00, change: -1.25, volume: 2500000, isAlertSet: false }
  ];

  filteredWatchlist: WatchlistItem[] = this.watchlist;

  ngOnInit(): void {
    // TODO: Implement watchlist data loading
    this.loading = false;
  }

  filterStocks(): void {
    if (!this.searchQuery) {
      this.filteredWatchlist = this.watchlist;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredWatchlist = this.watchlist.filter(item =>
      item.symbol.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query)
    );
  }

  addToWatchlist(): void {
    // Implement add to watchlist logic
    console.log('Opening add to watchlist dialog...');
  }

  createNewList(): void {
    // Implement create new list logic
    console.log('Opening create new list dialog...');
  }

  manageAlerts(): void {
    // Implement manage alerts logic
    console.log('Opening manage alerts dialog...');
  }

  toggleAlert(item: WatchlistItem): void {
    item.isAlertSet = !item.isAlertSet;
    // Implement alert toggle logic
    console.log(`${item.isAlertSet ? 'Setting' : 'Removing'} alert for ${item.symbol}`);
  }

  viewDetails(item: WatchlistItem): void {
    // Implement view details logic
    console.log(`Viewing details for ${item.symbol}`);
  }

  removeFromWatchlist(item: WatchlistItem): void {
    // Implement remove from watchlist logic
    console.log(`Removing ${item.symbol} from watchlist`);
  }
} 