# Homepage Component

## Overview
The Homepage component serves as the main dashboard of the StockInsights application, providing real-time market data, stock performance, and sector analysis in a responsive and user-friendly interface.

## Features

### 1. Market Overview
- Real-time market status display
- Current market value with percentage change
- Visual indicators for market trends
- Responsive header with market summary

### 2. Market Performance Chart
- Interactive area chart using ApexCharts
- Real-time data updates
- Customizable time ranges
- Smooth animations and transitions
- Gradient fill for better visualization

### 3. Market Movers
- Tabbed interface for Top Gainers and Losers
- Real-time stock price updates
- Company name and symbol display
- Percentage change indicators
- Scrollable list with virtual scrolling

### 4. Sector Performance
- Grid layout of sector performance
- Visual indicators for sector trends
- Percentage change display
- Responsive grid system

## Technical Implementation

### Component Structure
```typescript
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgApexchartsModule
  ]
})
```

### State Management
- Uses Angular Signals for reactive state management
- Converts RxJS observables to signals for better performance
- Implements automatic data refresh mechanism

### Data Services Integration
```typescript
// Signal-based state management
marketOverview = toSignal(this.dataApi.getMarketOverview(), { initialValue: null });
topGainers = toSignal(this.dataApi.getTopGainers(), { initialValue: [] });
topLosers = toSignal(this.dataApi.getTopLosers(), { initialValue: [] });
sectorPerformance = toSignal(this.dataApi.getSectorPerformance(), { initialValue: [] });
```

### Chart Configuration
```typescript
chartOptions = signal({
  series: [{
    name: 'Market Value',
    data: []
  }],
  chart: {
    type: 'area',
    height: 400,
    toolbar: { show: false },
    animations: { enabled: true },
    background: 'transparent'
  },
  // ... additional configuration
});
```

## Styling

### Responsive Design
- Mobile-first approach
- Breakpoints for different screen sizes
- Flexible grid system
- Adaptive layout changes

### Theme Integration
- Material Design components
- Custom color schemes
- Dynamic theme switching support
- Consistent styling across components

## Performance Optimization

### Data Management
- Efficient data refresh mechanism
- Memory leak prevention
- Automatic cleanup on component destruction
- Optimized change detection

### Loading States
- Skeleton loading screens
- Progressive data loading
- Smooth transitions between states
- Error state handling

## Usage Example

```typescript
<app-homepage></app-homepage>
```

## Dependencies

- @angular/core
- @angular/common
- @angular/material
- ng-apexcharts
- rxjs

## API Integration

### Input Properties
None

### Output Events
None

### Public Methods
- `loadChartData()`: Refreshes chart data
- `setupDataRefresh()`: Configures automatic data updates

## Error Handling

- Implements error boundary pattern
- Graceful degradation on API failures
- User-friendly error messages
- Automatic retry mechanism

## Testing

### Unit Tests
```typescript
describe('HomepageComponent', () => {
  // Test cases for component initialization
  // Test cases for data loading
  // Test cases for error handling
  // Test cases for user interactions
});
```

## Best Practices

1. **Performance**
   - Use of signals for state management
   - Efficient change detection
   - Lazy loading of components
   - Virtual scrolling for lists

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - High contrast support

3. **Code Organization**
   - Clean component structure
   - Separation of concerns
   - Modular design
   - Clear documentation

4. **Security**
   - XSS prevention
   - CSRF protection
   - Secure data handling
   - Input sanitization 