<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
=======
=======
>>>>>>> Stashed changes
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AppStateService } from '../../core/state/app.state';
import { AuthService } from '../../core/services/auth.service';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core';

// PrimeNG Imports
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export interface pcrnseniftytile {
  text1: number;
}

export interface ttmmitiles {
  text1: any;
}

export interface mcniftyrttiles {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
}

export interface mcpniftyrttiles {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
}

export interface mcbniftyrttiles {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
}

export interface newscardtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
}

@Component({
  selector: 'app-navbar',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',],
  providers: []
=======
=======
>>>>>>> Stashed changes
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    DropdownModule,
    ButtonModule,
    SidebarModule,
    CardModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
})
export class NavbarComponent {
  @Input() isAuthenticated = false;
  @Input() user: any = null;
  @Output() toggleSidenav = new EventEmitter<void>();

  isDarkTheme$ = inject(AppStateService).state$.pipe(map(state => state.theme === 'dark'));
  private appState = inject(AppStateService);
  private authService = inject(AuthService);

  // Dropdown properties
  items: any[] = [];
  item: any;

  // Sidebar visibility states
  visibleSidebar1: boolean = false;
  visibleSidebar2: boolean = false;
  visibleSidebar3: boolean = false;
  visibleSidebar4: boolean = false;
  visibleSidebar5: boolean = false;

  // Market data properties
  mcniftyrt: mcniftyrttiles[] = [];
  mcbniftyrt: mcbniftyrttiles[] = [];
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  sectorList: any;
  etstocks: any;
  bqsymbol = [];
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  visibleSidebar1;
  visibleSidebar2;
  visibleSidebar3;
  visibleSidebar4;
  visibleSidebar5;
  today: Date;
  pcrnsenifty1length: number
  pcrnsenifty1: number;
  pcrnsebnifty1length: number;
  pcrnsebnifty1: number;
  sparklineniftydata: Array<any> = [];
  sparklineniftylabel: Array<any> = [];
  sparklinebniftydata: Array<any> = [];
  sparklinebniftylabel: Array<any> = [];
  sparklinepniftydata: Array<any> = [];
  sparklinepniftylabel: Array<any> = [];
  dateyesterday: string;
  dateday5: string;
  date5: number;
  res;
  // @ViewChild('TradingViewWidget', { static: true }) TradingViewWidget: ElementRef;
  tlbuildup: string;
  tlniftybuildup: string;
  tlbniftybuildup: string;
  tlpniftybuildup: string;
  tlidnifty: string;
  tlidbnifty: string;
  tlniftybuildup5: string;
  constructor(private datePipe: DatePipe, private http: HttpClient, private primengConfig: PrimeNGConfig, private window: Window, private dataApi: DataapiService) {
  
    this.items = [];
    this.stock = stocks.default.Data;
    this.items = this.stock.map(stock => ({
      label: stock.name,
      value: stock.isin
    }));
=======
=======
>>>>>>> Stashed changes
  mcpniftyrt: mcpniftyrttiles[] = [];
  newscard: newscardtile[] = [];
  ttmmi: ttmmitiles[] = [];
  pcrnsenifty1: string = '';
  pcrnsebnifty1: string = '';
  tlniftybuildup: string = '';
  tlniftybuildup5: string = '';
  tlbniftybuildup: string = '';

  toggleTheme(): void {
    const currentTheme = this.appState.currentState.theme;
    this.appState.setTheme(currentTheme === 'light' ? 'dark' : 'light');
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  }

  logout(): void {
    this.authService.logout();
  }

  // Navigation methods
  navigateanalytics(): void {
    // TODO: Implement navigation
  }

  navigateinsights(): void {
    // TODO: Implement navigation
  }

  navigatescreeners(): void {
    // TODO: Implement navigation
  }

  navigatenifty(): void {
    // TODO: Implement navigation
  }

  navigatebanknifty(): void {
    // TODO: Implement navigation
  }

  navigatepnifty(): void {
    // TODO: Implement navigation
  }

  // Event handlers
  selectEvent(item: any): void {
    // TODO: Implement selection handling
  }

  // Track by functions for ngFor
  trackByFunctionmcniftyrt(index: number): number {
    return index;
  }

  trackByFunctionmcbniftyrt(index: number): number {
    return index;
  }

  trackByFunctionmcpniftyrt(index: number): number {
    return index;
  }

  trackByFunctionnewscardnav(index: number): number {
    return index;
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  getbniftytlbuildup(tlidbnifty) {
    this.tlidbnifty = '1898'
    this.dataApi.getTlBuildup(this.tlidbnifty).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      console.log(nestedItems[0]['data_v2'])
      this.tlbniftybuildup = (nestedItems[0]['data_v2'][1]['buildup'])
      console.log(this.tlbniftybuildup)
    });
  }
  // setttvolume() {
  //   console.log("Set TTVOLMCINSIGHT is hit !!!")
  //   this.dataApi.setttvolume().subscribe();}
  getmcniftyrealtime() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.mcniftyrt.length = 0;
      this.mcniftyrt.push({ text1: nestedItems[2]['pricecurrent'], text2: nestedItems[2]['pricecurrent'], text3: nestedItems[2]['pricechange'], text4: nestedItems[2]['pricepercentchange'], text5: nestedItems[2]['adv'], text6: nestedItems[2]['decl'] })
      this.mcadvvalue1 = nestedItems[2]['adv'];
      this.mcdecvalue1 = nestedItems[2]['decl'];
    }, err => {
      console.log(err)
    })
  }
   getmcpharmaniftyrealtime() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3Bcpr').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.mcpniftyrt.length = 0;
      this.mcpniftyrt.push({ text1: nestedItems[2]['pricecurrent'], text2: nestedItems[2]['pricecurrent'], text3: nestedItems[2]['pricechange'], text4: nestedItems[2]['pricepercentchange'], text5: nestedItems[2]['adv'], text6: nestedItems[2]['decl'] })
      this.mcpadvvalue = nestedItems[2]['adv'];
      this.mcpdecvalue = nestedItems[2]['decl'];
    }, err => {
      console.log(err)
    })
  }
  getmcbankniftyrealtime() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3Bnbx').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.mcbniftyrt.length = 0;
      this.mcbniftyrt.push({ text1: nestedItems[2]['pricecurrent'], text2: nestedItems[2]['pricecurrent'], text3: nestedItems[2]['pricechange'], text4: nestedItems[2]['pricepercentchange'], text5: nestedItems[2]['adv'], text6: nestedItems[2]['decl'] })
    }, err => {
      console.log(err)
    })
  }
  getniftysparkline() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=1d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const sparklineCanvas = this.sparklineChartRef.nativeElement;
      this.sparklineniftydata.length = 0;
      this.sparklineniftylabel.length = 0;
      for (const val in nestedItems[1]['values']) {
        this.sparklineniftydata.push(nestedItems[1]['values'][val]['_value'])
        this.sparklineniftylabel.push(nestedItems[1]['values'][val]['_time'])
      }
      // Create the sparkline chart
      this.sparklineChart = new Chart(sparklineCanvas, {
        type: 'line',
        data: {
          labels: this.sparklineniftylabel,
          datasets: [{
            data: this.sparklineniftydata, // Generate random data for 350 points
            borderColor: 'rgba(0,0,0)', // Define the color of the sparkline
            borderWidth: 1, // Define the width of the sparkline
            fill: false, // Do not fill the area under the sparkline
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: { radius: 0 } // Hide data points on the sparkline
          },
          scales: {
            x: { display: false }, // Hide x-axis
            y: { display: false }, // Hide y-axis
          },
          plugins: {
            legend: { display: false } // Hide legend
          },
        }
      });
    });
  }
  getbniftysparkline() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=1d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const sparklineCanvas1 = this.sparklineChartRef1.nativeElement;
      this.sparklinebniftydata.length = 0;
      this.sparklinebniftylabel.length = 0;
      for (const val in nestedItems[1]['values']) {
        this.sparklinebniftydata.push(nestedItems[1]['values'][val]['_value'])
        this.sparklinebniftylabel.push(nestedItems[1]['values'][val]['_time'])
      }
      // Create the sparkline chart
      this.sparklineChart1 = new Chart(sparklineCanvas1, {
        type: 'line',
        data: {
          labels: this.sparklinebniftylabel,
          datasets: [{
            data: this.sparklinebniftydata, // Generate random data for 350 points
            borderColor: 'rgba(0,0,0)', // Define the color of the sparkline
            borderWidth: 1, // Define the width of the sparkline
            fill: false, // Do not fill the area under the sparkline
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: { radius: 0 } // Hide data points on the sparkline
          },
          scales: {
            x: { display: false }, // Hide x-axis
            y: { display: false }, // Hide y-axis
          },
          plugins: {
            legend: { display: false } // Hide legend
          },
        }
      });
    });
  }
  getpniftysparkline() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=36&range=1d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const sparklineCanvas2 = this.sparklineChartRef2.nativeElement;
      this.sparklinepniftydata.length = 0;
      this.sparklinepniftylabel.length = 0;
      for (const val in nestedItems[1]['values']) {
        this.sparklinepniftydata.push(nestedItems[1]['values'][val]['_value'])
        this.sparklinepniftylabel.push(nestedItems[1]['values'][val]['_time'])
      }
      // Create the sparkline chart
      this.sparklineChart2 = new Chart(sparklineCanvas2, {
        type: 'line',
        data: {
          labels: this.sparklinepniftylabel,
          datasets: [{
            data: this.sparklinepniftydata, // Generate random data for 350 points
            borderColor: 'rgba(0,0,0)', // Define the color of the sparkline
            borderWidth: 1, // Define the width of the sparkline
            fill: false, // Do not fill the area under the sparkline
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: { radius: 0 } // Hide data points on the sparkline
          },
          scales: {
            x: { display: false }, // Hide x-axis
            y: { display: false }, // Hide y-axis
          },
          plugins: {
            legend: { display: false } // Hide legend
          },
        }
      });
    });
  }
 
  navigatenifty() {
    this.window.open("/nifty", "_blank")
  }
  navigateinsights() {
    this.window.open("/Insights", "_blank")
  }
  navigatehomepage() {
    this.window.open("/homepage", "_blank")
  }
  navigatescreeners() {
    this.window.open("/screeners", "_blank")
  }
  navigatebanknifty() {
    this.window.open("/banknifty", "_blank")
  }
  navigatepnifty() {
    this.window.open("/pharmanifty", "_blank")
  }
  navigateanalytics() {
    this.window.open("/analytics", "_blank")

  }
  
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}
