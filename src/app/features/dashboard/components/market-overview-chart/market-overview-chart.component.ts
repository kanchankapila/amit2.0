import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DataApiService } from '../../../../core/services/data-api.service';

@Component({
  selector: 'app-market-overview-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './market-overview-chart.component.html',
  styleUrls: ['./market-overview-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketOverviewChartComponent implements OnInit {
  chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private api: DataApiService) {}

  ngOnInit(): void {
    this.api.getMarketOverview().subscribe({
      next: (data) => this.buildChart(data),
      error: (err) => console.error('Failed to load market overview', err)
    });
  }

  private buildChart(data: any): void {
    if (!data) { return; }

    const labels: string[] = [];
    const values: number[] = [];

    Object.keys(data).forEach(key => {
      const value = Number(data[key]);
      if (!isNaN(value)) {
        labels.push(key);
        values.push(value);
      }
    });

    this.chartData = {
      labels,
      datasets: [{ data: values, label: 'Index Value' }]
    };
  }
}
