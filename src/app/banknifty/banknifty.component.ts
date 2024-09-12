import { Component, ViewChild, ElementRef, OnInit, } from '@angular/core';
import { DataapiService } from '../../dataapi.service';
import { RadioButton } from 'primeng/radiobutton';
import { PrimeNGConfig } from 'primeng/api';
import { ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import * as  stocks from '../lists/stocklist'
import { ChartOptions } from 'chart.js';
export interface bankniftystockstiles {
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
export interface bankniftycrossovertile {
  text1: any;
  text2: any;
  text3: any;
  text4: any;
}
export interface tlindexparamtile {
  text1: string;
  text2: string;
  text3: string;
}
export interface bankniftycrossoverwtile {
  text1: any;
  text2: any;
  text3: any;
  text4: any;
}
export interface bankniftycrossovermtile {
  text1: any;
  text2: any;
  text3: any;
  text4: any;
}
export interface bankniftyindicatorstile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface bankniftyindicatorswtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface bankniftyindicatorsmtile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface bankniftysentimentstiles {
  text1: string;
  text2: string;
}
export interface bankniftybbtile {
  text1: string;
  text2: string;
}
export interface bniftyematile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
}
export interface bniftysmatile {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
}
@Component({
  selector: 'app-banknifty',
  templateUrl: './banknifty.component.html',
  styleUrls: ['./banknifty.component.scss']
})
export class BankniftyComponent implements OnInit {
  @ViewChild('TradingViewWidget', { static: true }) TradingViewWidget: ElementRef;
  @ViewChild('trendlyneWidget', { static: true }) trendlyneWidget: ElementRef;
  constructor(private http: HttpClient, private dataApi: DataapiService, private window: Window, private primengConfig: PrimeNGConfig) {
  }
  selectedValue: string;
  ngAfterViewInit() {
    RadioButton.prototype.select = function () {
      if (!this.disabled) {
        this.inputViewChild.nativeElement.checked = true;
        this.checked = true;
        this.onModelChange(this.value);
        this.onClick.emit(null);
      }
    };
    // const script = document.createElement('script');
    // script.async = true;
    // script.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
    // script.charset = 'utf-8';
    // this.trendlyneWidget.nativeElement.appendChild(script);
    // const script1 = document.createElement('script');
    // script1.async = true;
    // script1.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
    // script1.charset = 'utf-8';
    // script1.text = JSON.stringify({
    //   "interval": "1m",
    //   "width": "100%",
    //   "isTransparent": false,
    //   "height": "100%",
    //   "symbol": "NSE:BANKNIFTY",
    //   "showIntervalTabs": true,
    //   "locale": "in",
    //   "colorTheme": "light"
    // });
    // this.TradingViewWidget.nativeElement.appendChild(script1);
  }
  abc: any;
  indexid = '1898';
  public stockhcdate: Array<any> = [];
  public bankniftydata: Array<number> = [];
  public bankniftyLabels: Array<any> = [];
  public niftypcrdata: Array<number> = [];
  public niftypcrtime: Array<any> = [];
  public niftyvixdata: Array<number> = [];
  public niftyvixtime: Array<any> = [];
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<number> = [];
  public banknifty5ddata: Array<number> = [];
  public banknifty5dLabels: Array<any> = [];
  public lineChart5dData: Array<any> = [];
  public lineChart5dLabels: Array<number> = [];
  public banknifty1mdata: Array<number> = [];
  public banknifty1mLabels: Array<any> = [];
  public lineChart1mData: Array<any> = [];
  public lineChart1mLabels: Array<number> = [];
  public banknifty3mdata: Array<number> = [];
  public banknifty3mLabels: Array<any> = [];
  public lineChart3mData: Array<any> = [];
  public lineChart3mLabels: Array<number> = [];
  public banknifty6mdata: Array<number> = [];
  public banknifty6mLabels: Array<any> = [];
  public lineChart6mData: Array<any> = [];
  public lineChart6mLabels: Array<number> = [];
  public banknifty1yrdata: Array<number> = [];
  public banknifty1yrLabels: Array<any> = [];
  public lineChart1yrData: Array<any> = [];
  public lineChart1yrLabels: Array<number> = [];
  public lineChartpcrData: Array<any> = [];
  public lineChartpcrLabels: Array<number> = [];
  public lineChartpcrOptions: any;
  public lineChartvixData: Array<any> = [];
  public lineChartvixLabels: Array<number> = [];
  public lineChartvixOptions: any;
  stockisin: any;
  stockList: any
  basicData: any;
  basicOptions: any;
  basicData1: any;
  basicOptions1: any;
  chart: any;
  date: any;
  // indexid:1898;
  duration: any;
  bankniftysentiments: bankniftysentimentstiles[] = [];
  tlindexparam: tlindexparamtile[] = [];
  bankniftystocks: bankniftystockstiles[] = [];
  bankniftycrossover: bankniftycrossovertile[] = [];
  bankniftycrossoverw: bankniftycrossoverwtile[] = [];
  bankniftycrossoverm: bankniftycrossovermtile[] = [];
  bankniftyindicators: bankniftyindicatorstile[] = [];
  bankniftyindicatorsw: bankniftyindicatorswtile[] = [];
  bankniftyindicatorsm: bankniftyindicatorsmtile[] = [];
  bankniftybb: bankniftybbtile[] = [];
  bniftyema: bniftyematile[] = [];
  bniftysma: bniftysmatile[] = [];
  public lineChartDatabnsnrr1: Array<number> = [];
  public lineChartDatabnsnrr2: Array<number> = [];
  public lineChartDatabnsnrr3: Array<number> = [];
  public lineChartDatabnsnrs1: Array<number> = [];
  public lineChartDatabnsnrs2: Array<number> = [];
  public lineChartDatabnsnrs3: Array<number> = [];
  public lineChartLabelsbnsnrr1: Array<any> = [];
  public lineChartLabelsbnnrr3: Array<any> = [];
  public lineChartLabelsbnsnrr2: Array<any> = [];
  public lineChartLabelsbnsnrs1: Array<any> = [];
  public lineChartLabelsbnsnrs2: Array<any> = [];
  public lineChartLabelsbnsnrs3: Array<any> = [];
  public lineChartDatabnsnrr1w: Array<number> = [];
  public lineChartDatabnsnrr2w: Array<number> = [];
  public lineChartDatabnsnrr3w: Array<number> = [];
  public lineChartDatabnsnrs1w: Array<number> = [];
  public lineChartDatabnsnrs2w: Array<number> = [];
  public lineChartDatabnsnrs3w: Array<number> = [];
  public lineChartLabelsbnsnrr1w: Array<any> = [];
  public lineChartLabelsbnnrr3w: Array<any> = [];
  public lineChartLabelsbnsnrr2w: Array<any> = [];
  public lineChartLabelsbnsnrs1w: Array<any> = [];
  public lineChartLabelsbnsnrs2w: Array<any> = [];
  public lineChartLabelsbnsnrs3w: Array<any> = [];
  public lineChartDatabnsnrr1m: Array<number> = [];
  public lineChartDatabnsnrr2m: Array<number> = [];
  public lineChartDatabnsnrr3m: Array<number> = [];
  public lineChartDatabnsnrs1m: Array<number> = [];
  public lineChartDatabnsnrs2m: Array<number> = [];
  public lineChartDatabnsnrs3m: Array<number> = [];
  public lineChartLabelsbnsnrr1m: Array<any> = [];
  public lineChartLabelsbnnrr3m: Array<any> = [];
  public lineChartLabelsbnsnrr2m: Array<any> = [];
  public lineChartLabelsbnsnrs1m: Array<any> = [];
  public lineChartLabelsbnsnrs2m: Array<any> = [];
  public lineChartLabelsbnsnrs3m: Array<any> = [];
  basicData3: any;
  basicOptions3: any;
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
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };
  async ngOnInit() {
    this.primengConfig.ripple = true;
    this.stockList = stocks.default.Data
    // this.gettlbniftyparams(this.indexid)
    await Promise.all([
      this.getmcbankniftystocks(),
      this.getbankniftysmaema(),
      this.getbanknifty5d(),
      this.getbanknifty1m(),
      this.getbanknifty3m(),
      this.getbanknifty6m(),
      this.getbankniftytoday(),
      this.getbankniftyvix(),
      this.getbankniftypcr(),
      this.getbankniftysentiments(),
      this.getbanknifty1yr()])
    setInterval(() => { this.getbankniftysmaema() }, 30000);
    setInterval(() => { this.getmcbankniftystocks() }, 30000);
    setInterval(() => { this.getbankniftyvix() }, 30000);
    setInterval(() => { this.getbankniftypcr() }, 30000);
    setInterval(() => { this.getbankniftytoday() }, 30000);
  }
  getbankniftysentiments() {
    this.bankniftysentiments.length = 0;
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/in%3Bnbx?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.bankniftysentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Daily" })
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/in%3Bnbx?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.bankniftysentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Weekly" })
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/in%3Bnbx?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.bankniftysentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Monthly" })
    }, err => {
      console.log(err)
    })
  }
  gettlbniftyparams(indexid) {
    // this.indexid='1898';
    this.dataApi.getTlIndexParams(this.indexid).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.tlindexparam.length = 0;
      console.log(nestedItems);
      for (let val in nestedItems[0].body.parameters) {
        if (nestedItems[0].body.parameters[val].hasOwnProperty('name')) {
          this.tlindexparam.push({ text1: nestedItems[0].body.parameters[val].name, text2: nestedItems[0].body.parameters[val].value, text3: nestedItems[0].body.parameters[val].color })
        } else { continue; }
      };
    })
  }
  getbankniftyvix() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=36&range=1d&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      /////////////////////Nifty Vix/////////////////////////////////
      this.niftyvixdata.length = 0;
      this.niftyvixtime.length = 0;
      for (let val in nestedItems[1]['values']) {
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
  getbankniftypcr() {
    // this.http.get('https://api.niftytrader.in/api/FinNiftyOI/niftypcrData?reqType=bankniftypcr').subscribe(data5 => {
    //   let nestedItems = Object.keys(data5).map(key => {
    //     return data5[key];
    //   });
    this.dataApi.getNtBankNiftyPcrDetails().subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      console.log(nestedItems[0]['resultData'])
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
  getbankniftysmaema() {
    this.http.get('https://mo.streak.tech/api/tech_analysis/?timeFrame=day&stock=INDICES%3ANIFTY%20BANK').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      /////////////////////////////EMA/SMA from Kite //////////////////////
      this.bniftyema.length = 0;
      this.bniftysma.length = 0;
      this.bniftyema.push({ text1: nestedItems[10], text2: nestedItems[5], text3: nestedItems[7], text4: nestedItems[9], text5: nestedItems[11], text6: nestedItems[6], text7: nestedItems[8] })
      this.bniftysma.push({ text1: nestedItems[37], text2: nestedItems[32], text3: nestedItems[34], text4: nestedItems[36], text5: nestedItems[38], text6: nestedItems[33], text7: nestedItems[35] })
    }, err => {
      console.log(err)
    })
  }
  getmcbankniftystocks() {
    this.http.get('https://etmarketsapis.indiatimes.com/ET_Stats/getIndexByIds?pagesize=50&exchange=50&sortby=currentprice&sortorder=desc&indexid=1913&company=true&indexname=Nifty%20Bank&marketcap=&pageno=1').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      //////////////////////////////Nifty 50 Stocks ////////////////////////
      this.bankniftystocks.length = 0;
      for (let val in nestedItems[0][0]['companies']) {
        this.bankniftystocks.push({ text1: nestedItems[0][0]['companies'][val].companyShortName, text2: nestedItems[0][0]['companies'][val].change, text3: nestedItems[0][0]['companies'][val].percentChange, text4: nestedItems[0][0]['companies'][val].current, text5: nestedItems[0][0]['companies'][val].symbol })
      }
    }, err => {
      console.log(err)
    })
  }
  getbanknifty1yr() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=1yr&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[1].values) {
        this.banknifty1yrdata.push(nestedItems[1].values[val]["_value"])
        this.banknifty1yrLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart1yrData = [{
        label: 'Price',
        data: this.banknifty1yrdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChart1yrLabels = this.banknifty1yrLabels;
    }, err => {
      console.log(err)
    })
  }
 
  trackByFunctionbankniftyindicators(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftycrossover(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbniftyema(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftysentiments(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbniftysma(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftyindicatorsw(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftycrossoverw(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftyindicatorsm(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftycrossoverm(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctionbankniftystocks(index: number, item: any): any {
    return item.id; 
  }
  trackByFunctiontlindexparambn(index: number, item: any): any {
    return item.id; 
  }
  getbanknifty6m() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=6m&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[1].values) {
        this.banknifty6mdata.push(nestedItems[1].values[val]["_value"])
        this.banknifty6mLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart6mData = [{
        label: 'Price',
        data: this.banknifty6mdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChart6mLabels = this.banknifty6mLabels;
    }, err => {
      console.log(err)
    })
  }
  onClick(event) {
    this.gettlbniftyparams(this.indexid)
  }
  getbanknifty3m() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=3m&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[1].values) {
        this.banknifty3mdata.push(nestedItems[1].values[val]["_value"])
        this.banknifty3mLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart3mData = [{
        label: 'Price',
        data: this.banknifty3mdata,
        borderWidth: 1,
        fill: false
      }];
      this.lineChart3mLabels = this.banknifty3mLabels;
    }, err => {
      console.log(err)
    })
  }
  getbanknifty5d() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/in%3Bnbx?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      ////////////To get Nifty 5day Resistances and Indicators/////////////
      let val5 = 0;
      while (val5 != 2400) {
        val5 = val5 + 1
        this.lineChartDatabnsnrr1w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatabnsnrr2w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatabnsnrr3w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatabnsnrs3w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatabnsnrs2w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatabnsnrs1w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.bankniftycrossoverw.length = 0;
      for (let val in nestedItems[2]['crossover']) {
        this.bankniftycrossoverw.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      this.bankniftyindicatorsw.length = 0;
      for (let val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.bankniftyindicatorsw.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
    }, err => {
      console.log(err)
    })
    ////////////To get Nifty 1 week Price///////////////////////
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=5d&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.banknifty5ddata.length = 0;
      this.banknifty5dLabels.length = 0;
      for (let val in nestedItems[1].values) {
        this.banknifty5ddata.push(nestedItems[1].values[val]["_value"])
        this.banknifty5dLabels.push(nestedItems[1].values[val]["_time"].slice(0, 6))
      }
      this.lineChart5dData = [{
        label: 'Price',
        data: this.banknifty5ddata,
        borderWidth: 1,
        fill: false
      }, {
        label: 'R1',
        data: this.lineChartDatabnsnrr1w,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatabnsnrr2w,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatabnsnrr3w,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatabnsnrs1w,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatabnsnrs2w,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatabnsnrs3w,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
      this.lineChart5dLabels = this.banknifty5dLabels;
    }, err => {
      console.log(err)
    })
  }
  getbanknifty1m() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/in%3Bnbx?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      ////////////To get Nifty 1 month Resistances and Indicators/////////////
      this.lineChartDatabnsnrr1m.length = 0;
      this.lineChartDatabnsnrr2m.length = 0;
      this.lineChartDatabnsnrr3m.length = 0;
      this.lineChartDatabnsnrs1m.length = 0;
      this.lineChartDatabnsnrs2m.length = 0;
      this.lineChartDatabnsnrs3m.length = 0;
      let val5 = 0;
      while (val5 != 2000) {
        val5 = val5 + 1
        this.lineChartDatabnsnrr1m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatabnsnrr2m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatabnsnrr3m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatabnsnrs3m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatabnsnrs2m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatabnsnrs1m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.bankniftycrossoverm.length = 0;
      for (let val in nestedItems[2]['crossover']) {
        this.bankniftycrossoverm.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      this.bankniftyindicatorsm.length = 0;
      for (let val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.bankniftyindicatorsm.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
    }, err => {
      console.log(err)
    })
    ////////////To get Nifty 1 month Price///////////////////////
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=1m&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.banknifty1mdata.length = 0;
      this.banknifty1mLabels.length = 0;
      for (let val in nestedItems[1].values) {
        this.banknifty1mdata.push(nestedItems[1].values[val]["_value"])
        this.banknifty1mLabels.push(nestedItems[1].values[val]["_time"])
      }
      this.lineChart1mData = [{
        label: 'Price',
        data: this.banknifty1mdata,
        borderWidth: 1,
        fill: false
      }, {
        label: 'R1',
        data: this.lineChartDatabnsnrr1m,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatabnsnrr2m,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatabnsnrr3m,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatabnsnrs1m,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatabnsnrs2m,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatabnsnrs3m,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
      this.lineChart1mLabels = this.banknifty1mLabels;
    }, err => {
      console.log(err)
    })
  }
  getbankniftytoday() {
    ////////////To get Nifty Today Price///////////////////////
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=23&range=1d&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.bankniftydata.length = 0;
      this.bankniftyLabels.length = 0;
      for (let val in nestedItems[1].values) {
        this.bankniftydata.push(nestedItems[1].values[val]["_value"])
        this.bankniftyLabels.push((nestedItems[1].values[val]["_time"]))
        this.stockhcdate.push({ x: (nestedItems[1].values[val]["_time"]), y: (nestedItems[1].values[val]["_value"]) })
      }
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/in%3Bnbx?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      ////////////To get Nifty Today Resistances and Indicators/////////////
      this.lineChartDatabnsnrr1.length = 0;
      this.lineChartDatabnsnrr2.length = 0;
      this.lineChartDatabnsnrr3.length = 0;
      this.lineChartDatabnsnrs1.length = 0;
      this.lineChartDatabnsnrs2.length = 0;
      this.lineChartDatabnsnrs3.length = 0;
      let val = 0;
      while (val != 400) {
        val = val + 1
        this.lineChartDatabnsnrr1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatabnsnrr2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatabnsnrr3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatabnsnrs3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatabnsnrs2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatabnsnrs1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.bankniftyindicators.length = 0;
      this.bankniftycrossover.length = 0;
      for (let val in nestedItems[2]['crossover']) {
        this.bankniftycrossover.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      for (let val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.bankniftyindicators.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
      this.lineChartData = [{
        label: 'Price',
        data: this.bankniftydata,
        borderWidth: 1,
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatabnsnrr2,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      },
      {
        label: 'R1',
        data: this.lineChartDatabnsnrr1,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatabnsnrr3,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatabnsnrs1,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatabnsnrs2,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatabnsnrs3,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
      this.lineChartLabels = this.bankniftyLabels;
    }, err => {
      console.log(err)
    })
  }
  changestockpage(symbol) {
    this.stockisin = this.stockList.filter(i => i.symbol == symbol)[0].isin
    this.window.open("/Share?stock=" + this.stockisin, "_blank")
  }
}
