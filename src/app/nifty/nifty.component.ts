import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { DataapiService } from '../../dataapi.service'
import { PrimeNGConfig } from 'primeng/api';
import { ChartType } from 'chart.js';
import { ChartAnnotationSettingsModel } from '@syncfusion/ej2-angular-charts/esm2020/src/chart/annotations.directive.mjs';
import { RadioButton } from 'primeng/radiobutton';
import { HttpClient } from '@angular/common/http';
import * as  stocks from '../lists/stocklist'
import { ChartOptions } from 'chart.js';

export interface Nifty50Stocks {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
}
export interface stockhcdatatile {
  x: number;
  y: number;
}
export interface nifty50crossovertile {
  text1: number;
  text2: number;
  text3: number;
  text4: number;
}
export interface nifty50crossoverwtile {
  text1: number;
  text2: number;
  text3: number;
  text4: number;
}
export interface nifty50crossovermtile {
  text1: number;
  text2: number;
  text3: number;
  text4: number;
}
export interface nifty50indicatorstile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface nifty50indicatorswtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface nifty50indicatorsmtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface investingindicators1m {
  text1: string;
  
}
export interface investingindicators5m {
  text1: string;
  
}
export interface investingindicators5h {
  text1: string;
  
}
export interface investingindicators15m {
  text1: string;
  
}
export interface investingindicators30m {
  text1: string;
  
}
export interface investingindicators1h {
  text1: string;
  
}
export interface investingindicators1d {
  text1: string;
  
}
export interface investingindicators1w {
  text1: string;
  
}
export interface investingindicators1mo {
  text1: string;
  
}
export interface nifty50sentimentstiles {
  text1: string;
  text2: string;
}
export interface nifty50bbtile {
  text1: string;
  text2: string;
}
export interface niftyematile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
}
export interface niftysmatile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
}
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export interface pcrtile { x: any; y: string; }
export interface niftytile { x: any; y: string; color: any; }
@Component({
  selector: 'app-nifty',
  templateUrl: './nifty.component.html',
  styleUrls: ['./nifty.component.scss']
})
export class NiftyComponent implements OnInit {
  a: number;
  b: number;
  c: number;
  @ViewChild('TradingViewWidget', { static: true }) TradingViewWidget: ElementRef;
  @ViewChild('TradingViewWidget1', { static: true }) TradingViewWidget1: ElementRef;
  @ViewChild('trendlyneWidget', { static: true }) trendlyneWidget: ElementRef;

  constructor(private http: HttpClient, private dataApi: DataapiService, private window: Window, private primengConfig: PrimeNGConfig) {
  }
  selectedValue: string;
 
    //   const trendlyneScript = document.createElement('script');
    //   trendlyneScript.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
    //   trendlyneScript.charset = 'utf-8';
    //   trendlyneScript.setAttribute('preload', '');
    //   this.trendlyneWidget.nativeElement.appendChild(trendlyneScript);
    //   const tradingViewScript = document.createElement('script');
    //   tradingViewScript.defer = true;
    //   tradingViewScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    //   tradingViewScript.charset = 'utf-8';
    //   tradingViewScript.innerHTML = JSON.stringify({
    //     interval: '1m',
    //     width: '100%',
    //     isTransparent: false,
    //     height: '100%',
    //     symbol: 'NSE:NIFTY',
    //     showIntervalTabs: true,
    //     locale: 'in',
    //     colorTheme: 'light',
    //   });
    //   this.TradingViewWidget.nativeElement.appendChild(tradingViewScript);
    //   const tradingViewScript1 = document.createElement('script');
    //   tradingViewScript1.defer = true;
    //   tradingViewScript1.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    //   tradingViewScript1.charset = 'utf-8';
    //   tradingViewScript1.innerHTML = JSON.stringify({
    //     "symbol": "NSE:NIFTY",
    // 	  "width": 350,
    // 	  "height": 220,
    // 	  "locale": "in",
    // 	  "dateRange": "12M",
    // 	  "colorTheme": "light",
    // 	  "trendLineColor": "rgba(41, 98, 255, 1)",
    // 	  "underLineColor": "rgba(41, 98, 255, 0.3)",
    // 	  "underLineBottomColor": "rgba(41, 98, 255, 0)",
    // 	  "isTransparent": false,
    // 	  "autosize": false,
    //   "largeChartUrl": ""
    //   });
    //   this.TradingViewWidget1.nativeElement.appendChild(tradingViewScript1);
    // } 
    //   //stockhighcharts: StockChart;
  
  ngAfterViewInit() {
    RadioButton.prototype.select = function () {
      if (!this.disabled) {
        this.inputViewChild.nativeElement.checked = true;
        this.checked = true;
        this.onModelChange(this.value);
        this.onClick.emit(null);
      }
    }}
  public stockhcdate: Array<{x:number,y:number}> = [];
  public nifty50data: Array<number> = [];
  public nifty50Labels: Array<number> = [];
  public niftypcrdata: Array<number> = [];
  public niftypcrtime: Array<string>=[];
  public niftyvixdata: Array<number> = [];
  public niftyvixtime: Array<number> = [];
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<number> = [];
  public title1 = 'Nifty';
  public pointColorMapping: string;
  public nifty505ddata: Array<number> = [];
  public nifty505dLabels: Array<number> = [];
  public lineChart5dData: Array<any> = [];
  public lineChart5dLabels: Array<number> = [];
  public nifty501mdata: Array<number> = [];
  public nifty501mLabels: Array<number> = [];
  public lineChart1mData: Array<any> = [];
  public lineChart1mLabels: Array<number> = [];
  public nifty503mdata: Array<number> = [];
  public nifty503mLabels: Array<number> = [];
  public lineChart3mData: Array<any> = [];
  public lineChart3mLabels: Array<number> = [];
  public nifty506mdata: Array<number> = [];
  public nifty506mLabels: Array<number> = [];
  public lineChart6mData: Array<any> = [];
  public lineChart6mLabels: Array<number> = [];
  public nifty501yrdata: Array<number> = [];
  public nifty501yrLabels: Array<number> = [];
  public lineChart1yrData: Array<any> = [];
  public lineChart1yrLabels: Array<number> = [];
  public lineChartpcrData: Array<any> = [];
  public lineChartpcrLabels: Array<string> = [];
  public lineChartpcrOptions: any;
  public lineChartvixData: Array<any> = [];
  public lineChartvixLabels: Array<number> = [];
  public lineChartvixOptions: any;
  axis1: object[];
 
 
  date: Date;
  stockisin: number;
  //tlid:any
  tlid = '1887';
  tlname = 'NIFTY50';
  eqsymbol = 'nifty-50'
  nifty50sentiments: nifty50sentimentstiles[] = [];
  pcr: pcrtile[] = [];
  nifty: niftytile[] = [];
  investingindicators1m: investingindicators1m[] = [];
  investingindicators5m: investingindicators5m[] = [];
  investingindicators15m: investingindicators15m[] = [];
  investingindicators30m: investingindicators30m[] = [];
  investingindicators1h: investingindicators1h[] = [];
  investingindicators5h: investingindicators5h[] = [];
  investingindicators1d: investingindicators1d[] = [];
  investingindicators1w: investingindicators1w[] = [];
  investingindicators1mo: investingindicators1mo[] = [];
  nifty50Stocks: Nifty50Stocks[] = [];
  nifty50crossover: nifty50crossovertile[] = [];
  nifty50crossoverw: nifty50crossoverwtile[] = [];
  nifty50crossoverm: nifty50crossovermtile[] = [];
  nifty50indicators: nifty50indicatorstile[] = [];
  nifty50indicatorsw: nifty50indicatorswtile[] = [];
  nifty50indicatorsm: nifty50indicatorsmtile[] = [];
  nifty50bb: nifty50bbtile[] = [];
  niftyema: niftyematile[] = [];
  niftysma: niftysmatile[] = [];
  prev_close: number;
  hours: number;
  minutes: number;
  time: number;
  public primaryXAxis1: object;
  public primaryYAxis1: object;
  public dataValues: object[] = [];
  public stockhcdate1: Array<any> = [];
  public lineChartDatan50snrr1: Array<number> = [];
  public lineChartDatan50snrr2: Array<number> = [];
  public lineChartDatan50snrr3: Array<number> = [];
  public lineChartDatan50snrs1: Array<number> = [];
  public lineChartDatan50snrs2: Array<number> = [];
  public lineChartDatan50snrs3: Array<number> = [];
  public lineChartLabelsn50snrr1: Array<number> = [];
  public lineChartLabelsn50nrr3: Array<number> = [];
  public lineChartLabelsn50snrr2: Array<number> = [];
  public lineChartLabelsn50snrs1: Array<number> = [];
  public lineChartLabelsn50snrs2: Array<number> = [];
  public lineChartLabelsn50snrs3: Array<number> = [];
  public lineChartDatan50snrr1w: Array<number> = [];
  public lineChartDatan50snrr2w: Array<number> = [];
  public lineChartDatan50snrr3w: Array<number> = [];
  public lineChartDatan50snrs1w: Array<number> = [];
  public lineChartDatan50snrs2w: Array<number> = [];
  public lineChartDatan50snrs3w: Array<number> = [];
  public lineChartLabelsn50snrr1w: Array<number> = [];
  public lineChartLabelsn50nrr3w: Array<number> = [];
  public lineChartLabelsn50snrr2w: Array<number> = [];
  public lineChartLabelsn50snrs1w: Array<number> = [];
  public lineChartLabelsn50snrs2w: Array<number> = [];
  public lineChartLabelsn50snrs3w: Array<number> = [];
  public lineChartDatan50snrr1m: Array<number> = [];
  public lineChartDatan50snrr2m: Array<number> = [];
  public lineChartDatan50snrr3m: Array<number> = [];
  public lineChartDatan50snrs1m: Array<number> = [];
  public lineChartDatan50snrs2m: Array<number> = [];
  public lineChartDatan50snrs3m: Array<number> = [];
  public lineChartLabelsn50snrr1m: Array<number> = [];
  public lineChartLabelsn50nrr3m: Array<number> = [];
  public lineChartLabelsn50snrr2m: Array<number> = [];
  public lineChartLabelsn50snrs1m: Array<number> = [];
  public lineChartLabelsn50snrs2m: Array<number> = [];
  public lineChartLabelsn50snrs3m: Array<number> = [];
  public data2: object[] = [];
  public data3: object[] = [];
  
  
  stockList:Array<any>;
  indexid = '1887';
  duration: number;
  public lineChartColors = [
    {
      borderColor: '#2d0365'
    }
  ];
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
    responsive: true,
    // aspectRatio: 1,
    maintainAspectRatio: false,
    scales: {
    }, elements: {
      point: {
        radius: 0
      }
    }
  };
  async ngOnInit() {
    this.primengConfig.ripple = true;
    this.stockList = stocks.default.Data
    await Promise.all([
      this.getniftypcr(),
      this.getMcNifty50Stocks(),
      this.getnifty50smaema(),
      this.getnifty5d(),
      this.getnifty1m(),
      this.getnifty3m(),
      this.getnifty6m(),
      this.getniftytoday(),
      this.getniftytoday1(),
      this.getniftyvix(),
        this.gettlniftyparams(this.indexid,this.duration),
      this.getniftysentiments(),
      this.getnifty1yr(),
    ])
    setInterval(() => { this.getnifty50smaema() }, 30000);
    setInterval(() => { this.getMcNifty50Stocks() }, 30000);
    setInterval(() => { this.getniftyvix() }, 30000);
    setInterval(() => { this.getniftypcr() }, 30000);
    setInterval(() => { this.getniftytoday() }, 3000);
    setInterval(() => { this.getniftytoday1() }, 3000);
    setInterval(() => { this.gettlniftyparams(this.indexid,this.duration) }, 30000);
  }
  public annotations: ChartAnnotationSettingsModel[] = [
    {
      coordinateUnits: 'Point',
      verticalAlignment: 'Top',
    }, {
      coordinateUnits: 'Point',
      yAxisName: 'yAxis'
    }
  ];
  public primaryXAxis: object = {
    valueType: 'Category',
    interval: 1,
    labelIntersectAction: 'Rotate90',
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: object = {
    // minimum: 0, maximum: 2, interval: 0.1,
    lineStyle: { width: 0 },
    labelFormat: '{value}'
  };
  public chartArea: object = {
    border: {
      width: 0
    }
  };
  // custom code end
  public legend: object = {
    visible: false
  }
  public marker: object
  public marker1: object
  public axis: object[]
  public majorGridLines: object = {
    width: 0
  };
  public tooltip: object = {
    enable: true
  };
  public title = 'Nifty vs PCR';
  async gettlniftyparams(indexid, selectedValue) {
     this.indexid='17940';
     this.selectedValue='1m'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(async data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators1m.length = 0;
     
     
     
          this.investingindicators1m.push({ text1: nestedItems[0].summary})
        console.log(this.investingindicators1m)
     
    })
    await sleep(3000);
     this.selectedValue='5m'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators5m.length = 0;
     
     
     
          this.investingindicators5m.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
     this.selectedValue='15m'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators15m.length = 0;
     
     
     
          this.investingindicators15m.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
    this.selectedValue='30m'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators30m.length = 0;
     
     
     
          this.investingindicators30m.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
     this.selectedValue='1h'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators1h.length = 0;
     
     
     
          this.investingindicators1h.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
     this.selectedValue='5h'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators5h.length = 0;
     
     
     
          this.investingindicators5h.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
     this.selectedValue='1d'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators1d.length = 0;
     
     
     
          this.investingindicators1d.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
     this.selectedValue='1w'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators1w.length = 0;
     
     
     
          this.investingindicators1w.push({ text1: nestedItems[0].summary})
        
     
    })
    await sleep(3000);
     this.selectedValue='1mo'
    this.dataApi.getInvestingIndicators(this.indexid, this.selectedValue).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.investingindicators1mo.length = 0;
     
     
     
          this.investingindicators1mo.push({ text1: nestedItems[0].summary})
        
     
    })
  }
  onClick(event) {
    // this.gettlniftyparams(this.indexid, this.selectedValue)
  }
  getniftysentiments() {
    this.nifty50sentiments.length = 0;
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/in%3BNSX?field=RSI').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.nifty50sentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Daily" })
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/in%3BNSX?field=RSI').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.nifty50sentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Weekly" })
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/in%3BNSX?field=RSI').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.nifty50sentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Monthly" })
    }, err => {
      console.log(err)
    })
  }
  getniftyvix() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=36&range=1d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      /////////////////////Nifty Vix/////////////////////////////////
      this.niftyvixdata.length = 0;
      this.niftyvixtime.length = 0;
      for (const val in nestedItems[1]['values']) {
        this.niftyvixdata.push(nestedItems[1]['values'][val]['_value'])
        this.niftyvixtime.push(nestedItems[1]['values'][val]['_time'])
      }
      this.lineChartvixData = [{
        label: 'VIX',
        data: this.niftyvixdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChartvixLabels = this.niftyvixtime;
    }, err => {
      console.log(err)
    })
  }
  getniftypcr() {
   
     this.dataApi.getNtNiftyPcrDetails().subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      /////////////////////NIfty PCR from niftytraders////////////////////
      this.niftypcrdata.length = 0;
      this.niftypcrtime.length = 0;
      for (let val in nestedItems[0]['resultData']['data']) {
        this.niftypcrdata.push(nestedItems[0]['resultData']['data'][val]['pcr'])
        this.niftypcrtime.push(new Date(nestedItems[0]['resultData']['data'][val]['time']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
      }
      this.lineChartpcrData = [{
        label: 'PCR',
        data: this.niftypcrdata,
        borderWidth: 1,
        fill: false,
        maintainAspectRatio: false
      }];
      this.lineChartpcrLabels = this.niftypcrtime;
    }, err => {
      console.log(err)
    })
  }
  //     const nestedItems = Object.keys(data5).map(key => {
  //       return data5[key];
  //     });
  //     console.log(nestedItems)
  //     //      /////////////////////NIfty PCR from niftytraders////////////////////
  //     this.niftypcrdata.length = 0;
  //     this.niftypcrtime.length = 0;
  //     this.pcr.length = 0;
  //     this.nifty.length = 0;
  //     for (const val in nestedItems[0]['resultData']['data']) {
  //       this.pcr.push({ x: new Date(nestedItems[0]['resultData']['data'][val]['time']).getTime(), y: nestedItems[0]['resultData']['data'][val]['pcr'] })
  //       if (nestedItems[0]['resultData']['data'][val]['index_close'] > 18500) {
  //         this.nifty.push({ x: new Date(nestedItems[0]['resultData']['data'][val]['time']).getTime(), y: nestedItems[0]['resultData']['data'][val]['index_close'], color: 'red' })
  //         this.pointColorMapping = 'color';
  //         this.axis1 = [{
  //           majorGridLines: { width: 0 },
  //           majorTickLines: { width: 5 },
  //           rowIndex: 0, opposedPosition: true,
  //           minimum: this.a, maximum: this.b, interval: 30,
  //           lineStyle: { width: 10, color: 'red' },
  //           name: 'yAxis',
  //           labelFormat: '{value}'
  //         }];
  //         this.marker1 = {
  //           visible: true,
  //           width: 2,
  //           height: 2,
  //           border: { width: 2, color: 'red' }
  //         };
  //         this.marker = this.marker1;
  //         this.axis = this.axis1
  //       } else if (nestedItems[0]['resultData']['data'][val]['index_close'] < 18500) {
  //         this.nifty.push({ x: new Date(nestedItems[0]['resultData']['data'][val]['time']).getTime(), y: nestedItems[0]['resultData']['data'][val]['index_close'], color: 'green' })
  //         this.pointColorMapping = 'color';
  //         this.axis1 = [{
  //           majorGridLines: { width: 0 },
  //           majorTickLines: { width: 5 },
  //           rowIndex: 0, opposedPosition: true,
  //           minimum: this.a, maximum: this.b, interval: 30,
  //           lineStyle: { width: 10, color: 'green' },
  //           name: 'yAxis',
  //           labelFormat: '{value}'
  //         }];
  //         this.marker1 = {
  //           visible: true,
  //           width: 10,
  //           height: 10,
  //           border: { width: 5, color: 'green' }
  //         };
  //         this.marker1 = this.marker;
  //         this.axis = this.axis1
  //       }
  //       this.niftypcrdata.push(nestedItems[0]['resultData']['data'][val]['pcr'])
  //       this.niftypcrtime.push(new Date(nestedItems[0]['resultData']['data'][val]['time']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
  //       this.a = (nestedItems[0]['resultData']['data'][val]['index_close'] - 100)
  //       this.b = (nestedItems[0]['resultData']['data'][val]['index_close'] + 1000)
  //     }
  //     this.data2 = this.pcr;
  //     this.data3 = this.nifty;
  //     this.lineChartpcrData = [{
  //       label: 'PCR',
  //       data: this.niftypcrdata,
  //       borderWidth: 1,
  //       fill: false,
  //       maintainAspectRatio: false
  //     }];
  //     this.lineChartpcrLabels = this.niftypcrtime;
  //   }
  //     , err => {
  //       console.log(err)
  //     })
  // }
  getnifty50smaema() {
    this.http.get('https://mo.streak.tech/api/tech_analysis/?timeFrame=day&stock=INDICES%3ANIFTY%2050').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      /////////////////////////////EMA/SMA from Kite //////////////////////
      this.niftyema.length = 0;
      this.niftysma.length = 0;
      this.niftyema.push({ text1: nestedItems[10], text2: nestedItems[5], text3: nestedItems[7], text4: nestedItems[9], text5: nestedItems[11], text6: nestedItems[6], text7: nestedItems[8] })
      this.niftysma.push({ text1: nestedItems[37], text2: nestedItems[32], text3: nestedItems[34], text4: nestedItems[36], text5: nestedItems[38], text6: nestedItems[33], text7: nestedItems[35] })
    }, err => {
      console.log(err)
    })
  }
  getMcNifty50Stocks(){
    this.http.get('https://etmarketsapis.indiatimes.com/ET_Stats/getIndexByIds?pagesize=50&exchange=50&sortby=percentChange&sortorder=desc&indexid=2369&company=true&indexname=Nifty%2050&marketcap=&pageno=1').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
          
     
          //////////////////////////////Nifty 50 Stocks ////////////////////////
          this.nifty50Stocks = nestedItems[0][0]['companies'].map((company: any) => ({
            text1: company.companyShortName,
            text2: company.change,
            text3: company.percentChange,
            text4: company.current,
            text5: company.symbol,
          }));
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  getnifty1yr() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=1yr&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (const val in nestedItems[1].values) {
        this.nifty501yrdata.push(nestedItems[1].values[val]["_value"])
        this.nifty501yrLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart1yrData = [{
        label: 'Price',
        data: this.nifty501yrdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChart1yrLabels = this.nifty501yrLabels;
    }, err => {
      console.log(err)
    })
  }
  trackByFunctionnifty50Stocks(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50crossoverm(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50indicatorsm(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50crossoverw(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50indicatorsw(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionniftysma(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50sentiments(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionniftyema(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50crossover(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionnifty50indicators(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators1m(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators5m(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators15m(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators30m(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators1h(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators5h(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators1d(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators1w(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctioninvestingindicators1mo(index: number, item: any): any {
    return item.id; 
  }
 
  getnifty6m() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=6m&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (const val in nestedItems[1].values) {
        this.nifty506mdata.push(nestedItems[1].values[val]["_value"])
        this.nifty506mLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart6mData = [{
        label: 'Price',
        data: this.nifty506mdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChart6mLabels = this.nifty506mLabels;
    }, err => {
      console.log(err)
    })
  }
  getnifty3m() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=3m&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (const val in nestedItems[1].values) {
        this.nifty503mdata.push(nestedItems[1].values[val]["_value"])
        this.nifty503mLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart3mData = [{
        label: 'Price',
        data: this.nifty503mdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChart3mLabels = this.nifty503mLabels;
    }, err => {
      console.log(err)
    })
  }
  getnifty5d() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/in%3BNSX?field=RSI').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      ////////////To get Nifty 5day Resistances and Indicators/////////////
      let val5 = 0;
      while (val5 != 2400) {
        val5 = val5 + 1
        this.lineChartDatan50snrr1w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatan50snrr2w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatan50snrr3w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatan50snrs3w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatan50snrs2w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatan50snrs1w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.nifty50crossoverw.length = 0;
      for (const val in nestedItems[2]['crossover']) {
        this.nifty50crossoverw.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      this.nifty50indicatorsw.length = 0;
      for (const val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.nifty50indicatorsw.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
    }, err => {
      console.log(err)
    })
    ////////////To get Nifty 1 week Price///////////////////////
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=5d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.nifty505ddata.length = 0;
      this.nifty505dLabels.length = 0;
      for (const val in nestedItems[1].values) {
        this.nifty505ddata.push(nestedItems[1].values[val]["_value"])
        this.nifty505dLabels.push(nestedItems[1].values[val]["_time"].slice(0, 6))
      }
      this.lineChart5dData = [{
        label: 'Price',
        data: this.nifty505ddata,
        borderWidth: 1,
        fill: false
      }, {
        label: 'R1',
        data: this.lineChartDatan50snrr1w,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatan50snrr2w,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatan50snrr3w,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatan50snrs1w,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatan50snrs2w,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatan50snrs3w,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
      this.lineChart5dLabels = this.nifty505dLabels;
    }, err => {
      console.log(err)
    })
  }
  getnifty1m() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/in%3BNSX?field=RSI').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      ////////////To get Nifty 1 month Resistances and Indicators/////////////
      this.lineChartDatan50snrr1m.length = 0;
      this.lineChartDatan50snrr2m.length = 0;
      this.lineChartDatan50snrr3m.length = 0;
      this.lineChartDatan50snrs1m.length = 0;
      this.lineChartDatan50snrs2m.length = 0;
      this.lineChartDatan50snrs3m.length = 0;
      let val5 = 0;
      while (val5 != 2000) {
        val5 = val5 + 1
        this.lineChartDatan50snrr1m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatan50snrr2m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatan50snrr3m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatan50snrs3m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatan50snrs2m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatan50snrs1m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.nifty50crossoverm.length = 0;
      for (const val in nestedItems[2]['crossover']) {
        this.nifty50crossoverm.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      this.nifty50indicatorsm.length = 0;
      for (const val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.nifty50indicatorsm.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
    }, err => {
      console.log(err)
    })
    ////////////To get Nifty 1 month Price///////////////////////
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=1m&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.nifty501mdata.length = 0;
      this.nifty501mLabels.length = 0;
      for (const val in nestedItems[1].values) {
        this.nifty501mdata.push(nestedItems[1].values[val]["_value"])
        this.nifty501mLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart1mData = [{
        label: 'Price',
        data: this.nifty501mdata,
        borderWidth: 1,
        fill: false
      }, {
        label: 'R1',
        data: this.lineChartDatan50snrr1m,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatan50snrr2m,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatan50snrr3m,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatan50snrs1m,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatan50snrs2m,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatan50snrs3m,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
      this.lineChart1mLabels = this.nifty501mLabels;
    }, err => {
      console.log(err)
    })
  }
  getniftytoday1() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=1d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.dataValues.length = 0;
      this.stockhcdate1.length = 0;
      this.prev_close = (nestedItems[1]['prev_close'])
      for (const val in nestedItems[1].values) {
        this.stockhcdate1.push({ x: (nestedItems[1].values[val]["_time"]), y: (nestedItems[1].values[val]["_value"]) })
      }
      this.primaryYAxis1 = {
        rangePadding: 'None',
        // minimum: 12000,
        // maximum: 13000,
        title: 'Nifty',
        lineStyle: { width: 1 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
      };
      this.primaryXAxis1 = {
        valueType: 'DateTime',
        // labelFormat: 'hms',
        intervalType: 'Minutes',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
      };
      this.stockhcdate1.map((value: number, index: number) => {
        if (((value['x']).slice(0, 1)) == 0) {
          this.hours = ((value['x']).slice(1, 2))
          
        }
        else {
          this.hours = ((value['x']).slice(0, 2))
        }
        this.minutes = Number((value['x']).split(':').splice(1))
       
        const date = new Date()
        this.time = ((date.setHours(this.hours, this.minutes)))
       
        if ((Number(value['y'])) < this.prev_close) {
          this.dataValues.push({
            XValue: new Date(this.time), YValue: Number(value['y']),
            color: ['red']
          });
        }
        else if (Number(value['y']) > this.prev_close) {
          this.dataValues.push({
            XValue: new Date(this.time), YValue: Number(value['y']),
            color: ['green']
          });
        }
      });
    })
  }
  getniftytoday() {
    ////////////To get Nifty Today Price///////////////////////
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=9&range=1d&type=area').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.nifty50data.length = 0;
      this.nifty50Labels.length = 0;
      for (const val in nestedItems[1].values) {
        this.nifty50data.push(nestedItems[1].values[val]["_value"])
        this.nifty50Labels.push((nestedItems[1].values[val]["_time"]))
        this.stockhcdate.push({ x: (nestedItems[1].values[val]["_time"]), y: (nestedItems[1].values[val]["_value"]) })
      }
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/in%3BNSX?field=RSI').subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      ////////////To get Nifty Today Resistances and Indicators/////////////
      this.lineChartDatan50snrr1.length = 0;
      this.lineChartDatan50snrr2.length = 0;
      this.lineChartDatan50snrr3.length = 0;
      this.lineChartDatan50snrs1.length = 0;
      this.lineChartDatan50snrs2.length = 0;
      this.lineChartDatan50snrs3.length = 0;
      let val = 0;
      while (val != 400) {
        val = val + 1
        this.lineChartDatan50snrr1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatan50snrr2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatan50snrr3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatan50snrs3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatan50snrs2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatan50snrs1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.nifty50indicators.length = 0;
      this.nifty50crossover.length = 0;
      for (const val in nestedItems[2]['crossover']) {
        this.nifty50crossover.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      for (const val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.nifty50indicators.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
      this.lineChartData = [{
        label: 'Price',
        data: this.nifty50data,
        pointColorMapping: 'color',
        borderWidth: 1,
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatan50snrr2,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      },
      {
        label: 'R1',
        data: this.lineChartDatan50snrr1,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatan50snrr3,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatan50snrs1,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatan50snrs2,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatan50snrs3,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
      this.lineChartLabels = this.nifty50Labels;
    }, err => {
      console.log(err)
    })
  }
  changestockpage(symbol) {
    this.stockisin = this.stockList.filter(i => i.symbol == symbol)[0].isin
    this.window.open("/Share?stock=" + this.stockisin, "_blank")
  }
}


