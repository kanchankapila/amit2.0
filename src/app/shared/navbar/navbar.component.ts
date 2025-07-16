import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as stocks from '../../lists/stocklist';
import { DatePipe } from '@angular/common';
import { SelectItem } from 'primeng/api';
import Chart from 'chart.js/auto';
import { PrimeNGConfig } from 'primeng/api';
import { DataapiService } from '../../../dataapi.service';
import { HttpClient } from '@angular/common/http';
export interface pcrnseniftytile {
  text1: number;
}
export interface ttmmitiles {
  text1: any;
}
export interface pcrnsebniftytile {
  text1: number;
}
export interface newscardtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
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
export interface pcrnsebniftytile {
  text1: number;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',],
  providers: []
})
export class NavbarComponent implements OnInit {
  @ViewChild('sparklineChart') sparklineChartRef: ElementRef;
  @ViewChild('sparklineChart1') sparklineChartRef1: ElementRef;
  @ViewChild('sparklineChart2') sparklineChartRef2: ElementRef;
  sparklineChart: Chart;
  sparklineChart1: Chart;
  sparklineChart2: Chart;
  stock: any
  data: any
  pcrnsebnifty: pcrnsebniftytile[] = [];
  pcrnsenifty: pcrnseniftytile[] = [];
  datetoday: any
  stock_isin: any
  newscard: newscardtile[] = [];
  stock1: any;
  fnostock: any;
  stockid = [];
  mcsectorsymbol = [];
  items: SelectItem[];
  ttmmi: ttmmitiles[] = [];
  item: string;
  eqsymbol1 = [];
  tlid = [];
  n50optionssupport: any;
  n50optionsresistance: any;
  bnoptionssupport: any;
  bnoptionsresistance: any;
  companyid = [];
  mcsymbol = [];
  mcsymbol1 = [];
  optionwc = [];
  optionwp = [];
  optionbwc = [];
  optionbwp = [];
  mcadvvalue: any
  mcdecvalue: any
  mcadvvalue1: any
  mcdecvalue1: any
  mcpadvvalue: any
  mcpdecvalue: any
  mcniftyrt: mcniftyrttiles[] = [];
  mcpniftyrt: mcpniftyrttiles[] = [];
  mcbniftyrt: mcbniftyrttiles[] = [];
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
  }
  async ngOnInit() {
    this.today = new Date();
    this.datetoday = this.datePipe.transform(this.today, 'yyyy-MM-dd')
    this.dateyesterday = this.datePipe.transform(this.today.setDate(this.today.getDate() - 1), 'yyyy-MM-dd')
    this.dateday5 = this.datePipe.transform(this.today.setDate(this.today.getDate() - 5), 'yyyy-MM-dd')
    this.date5 = this.today.setDate(this.today.getDate() - 5)
    this.stock = stocks.default.Data
    this.item = stocks.default.Data['name']
    this.primengConfig.ripple = true;
    this.data = this.stock
    this.tlidnifty = '1887'
    this.tlidbnifty = '1898'
    { setInterval(() => { this.getniftypcr() }, 30000); }
    { setInterval(() => { this.getbankniftypcr() }, 30000); }
    { setInterval(() => { this.getmcniftyrealtime() }, 5000); }
    { setInterval(() => { this.getmcbankniftyrealtime() }, 5000); }
    { setInterval(() => { this.getmcpharmaniftyrealtime() }, 5000); }
    { setInterval(() => { this.getttmmi() }, 60000); }
    await Promise.all([
      this.getniftytlbuildup(this.tlidnifty),
      // this.getniftytlbuildup5(),
      // this.getbniftytlbuildup(this.tlidbnifty),
      // this.getpniftytlbuildup('1905'),
      this.getniftysparkline(),
      this.getbniftysparkline(),
      this.getpniftysparkline(),
      this.getmcniftyrealtime(),
      this.getniftypcr(),
      this.getbankniftypcr(),
      this.getmcbankniftyrealtime(),
      this.getttmmi(),
      this.getmcpharmaniftyrealtime(),
      this.toggleSidebar(),
    ])
  }
  keyword = 'name';
  selectEvent(stock_isin) {
    window.open('/Share?stock=' + stock_isin)
  }
  onChangeSearch(val: string) {
  }
  onFocused(abc) {
    // do something when input is focused
  }
  async getttmmi() {
    try {
      this.dataApi.getTtmmi().subscribe(data5 => {
        const nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
        this.ttmmi.length = 0;
        this.ttmmi.push({ text1: nestedItems[0]['data'].currentValue })
      })
    } catch (err) {
      console.error(err);
    }
  }
  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  // toggle sidebar
  toggleSidebar() {
    const body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
 
  trackByFunctionmcniftyrt(index: number, item: any): any {
    return item.id; 
  } 
  trackByFunctionmcbniftyrt(index: number, item: any): any {
    return item.id; 
  } 
  trackByFunctionmcpniftyrt(index: number, item: any): any {
    return item.id; 
  } 
  trackByFunctionnewscardnav(index: number, item: any): any {
    return item.id; 
  }
  getniftypcr() {
    this.dataApi.getNtNiftyPcrDetails().subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.pcrnsenifty1length = (((nestedItems[0]['resultData']['oiDatas']).length) - 1)
      this.pcrnsenifty1 = nestedItems[0]['resultData']['oiDatas'][this.pcrnsenifty1length].pcr
    })
  }
  getbankniftypcr() {
    this.dataApi.getNtBankNiftyPcrDetails().subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.pcrnsebnifty1length = (((nestedItems[0]['resultData']['oiDatas']).length) - 1)
      this.pcrnsebnifty1 = nestedItems[0]['resultData']['oiDatas'][this.pcrnsebnifty1length].pcr
    })
  }
  getniftytlbuildup(tlidnifty) {
    this.tlidnifty = '1887'
    this.dataApi.getTlBuildup(this.tlidnifty).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.tlniftybuildup = (nestedItems[0]['data_v2'][0]['buildup'])
      // console.log(this.tlniftybuildup)
    });
  }
  getniftytlbuildup5() {
    this.tlidnifty = '1887'
    this.dataApi.getTlBuildup5().subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      // this.tlniftybuildup5=(nestedItems[0]['data_v2'][0]['buildup'])
      for (const val in nestedItems[0]['all']['series']) {
        if (nestedItems[0]['all']['series'][val].code == "NIFTY50") {
          this.tlniftybuildup5 = nestedItems[0]['all']['series'][val].builtup_str
        }
      }
    });
  }
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
  
}
