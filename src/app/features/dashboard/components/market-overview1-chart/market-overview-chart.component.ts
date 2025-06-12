import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { Ng2SharedChartModule } from '../../../../ng2-shared-chart/ng2-shared-chart.module';
// import { DataapiService } from '../../../../dataapi.service';

@Component({
  selector: 'app-market-overview-chart',
  standalone: true,
  imports: [CommonModule, Ng2SharedChartModule],
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

  constructor(
    // private api: DataapiService
    ) {}

  ngOnInit(): void {
    // this.api.getMarketOverview().subscribe({
    //   next: (data) => this.buildChart(data),
    //   error: (err) => console.error('Failed to load market overview', err)
    // });
  }

  // private buildChart(data: any): void {
  //   if (!data) { return; }

  //   const labels: string[] = [];
  //   const values: number[] = [];

  //   Object.keys(data).forEach(key => {
  //     const value = Number(data[key]);
  //     if (!isNaN(value)) {
  //       labels.push(key);
  //       values.push(value);
  //     }
  //   });

    // this.chartData = {
    //   labels,
    //   datasets: [{ data: values, label: 'Index Value' }]
    // };
  }

