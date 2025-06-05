import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: Date;
  category: 'market' | 'company' | 'economy' | 'commodity';
  impact: 'high' | 'medium' | 'low';
  url: string;
}

@Component({
  selector: 'app-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrls: ['./news-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class NewsWidgetComponent implements OnInit {
  selectedCategory = 'all';
  loading = true;

  news: NewsItem[] = [
    {
      id: '1',
      title: 'RBI Announces New Monetary Policy, Keeps Rates Unchanged',
      source: 'Economic Times',
      timestamp: new Date(),
      category: 'economy',
      impact: 'high',
      url: '#'
    },
    {
      id: '2',
      title: 'TCS Reports Strong Q4 Results, Revenue Up 15%',
      source: 'Business Standard',
      timestamp: new Date(Date.now() - 3600000),
      category: 'company',
      impact: 'medium',
      url: '#'
    },
    {
      id: '3',
      title: 'Oil Prices Surge Amid Global Supply Concerns',
      source: 'Reuters',
      timestamp: new Date(Date.now() - 7200000),
      category: 'commodity',
      impact: 'high',
      url: '#'
    },
    {
      id: '4',
      title: 'Sensex Hits New All-Time High',
      source: 'Moneycontrol',
      timestamp: new Date(Date.now() - 10800000),
      category: 'market',
      impact: 'medium',
      url: '#'
    }
  ];

  get filteredNews(): NewsItem[] {
    if (this.selectedCategory === 'all') {
      return this.news;
    }
    return this.news.filter(item => item.category === this.selectedCategory);
  }

  ngOnInit(): void {
    // TODO: Implement news data loading
    this.loading = false;
  }

  getImpactColor(impact: string): string {
    switch (impact) {
      case 'high':
        return 'warn';
      case 'medium':
        return 'accent';
      default:
        return 'primary';
    }
  }

  openNews(item: NewsItem): void {
    window.open(item.url, '_blank');
  }

  viewAllNews(): void {
    // Navigate to news page
    console.log('Navigating to news page...');
  }
} 