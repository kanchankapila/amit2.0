
import { Component, ViewChild,ElementRef ,OnInit } from '@angular/core';
import { DataapiService } from '../../dataapi.service'
import { PrimeNGConfig } from 'primeng/api';
import * as  stocks from '../lists/stocklist'

import { HttpClient  } from '@angular/common/http';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts/esm2020/src/chart/annotations.directive.mjs';
// import { Browser } from '@syncfusion/ej2-base';
import {RadioButton} from 'primeng/radiobutton';
import { ChartType, ChartOptions } from 'chart.js';

export interface pharmaniftystockstiles {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  
}
export interface tlindexparamtile{
  text1: string;
  text2: string;
  text3: string;
  
 
}
export interface stockhcdatatile{
  x: number;
  y: number;
}
export interface pharmaniftycrossovertile {

  text1: any;
  text2: any;
  text3: any;
  text4: any;
  
}
export interface pharmaniftycrossoverwtile {

  text1: any;
  text2: any;
  text3: any;
  text4: any;
  
}
export interface pharmaniftycrossovermtile {

  text1: any;
  text2: any;
  text3: any;
  text4: any;
  
}
export interface pharmaniftyindicatorstile{
  text1: string;
  text2: string;
  text3: string;
  text4: string;
 
}
export interface pharmaniftyindicatorswtile{
  text1: string;
  text2: string;
  text3: string;
  text4: string;
 
}
export interface pharmaniftyindicatorsmtile{
  text1: string;
  text2: string;
  text3: string;
  text4: string;
 
}
export interface pharmaniftysentimentstiles
{
    text1: string;
  text2: string;
}

export interface pharmaniftybbtile{
  text1: string;
  text2: string;
  
 
}
export interface pniftyematile{
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
}
export interface pniftysmatile{
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
  
 
}


@Component({
  selector: 'app-pharmanifty',
  templateUrl: './pharmanifty.component.html',
  styleUrls: ['./pharmanifty.component.scss']
})
export class PharmaniftyComponent implements OnInit {
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
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
  script.charset = 'utf-8';
  this.trendlyneWidget.nativeElement.appendChild(script);

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
  script1.charset = 'utf-8';
  script1.text = JSON.stringify({
    "interval": "1m",
    "width": "100%",
    "isTransparent": false,
    "height": "100%",
    "symbol": "NSE:CNXPHARMA",
    "showIntervalTabs": true,
    "locale": "in",
    "colorTheme": "light"
  });
  this.TradingViewWidget.nativeElement.appendChild(script1);
  } 
  //stockhighcharts: StockChart;
  public stockhcdate: Array<any> = [];
  public stockhcdate1: Array<any> = [];
  public pharmaniftydata: Array<number> = [];
  public pharmaniftydata1: Array<number> = [];
  public pharmaniftyLabels: Array<any> = [];
  public niftyvixdata: Array<number> = [];
  public niftyvixtime: Array<any> = [];
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<number> = [];
  public pharmanifty5ddata: Array<number> = [];
  public pharmanifty5dLabels: Array<any> = [];
  public lineChart5dData: Array<any> = [];
  public lineChart5dLabels: Array<number> = [];
  public pharmanifty1mdata: Array<number> = [];
  public pharmanifty1mLabels: Array<any> = [];
  public lineChart1mData: Array<any> = [];
  public lineChart1mLabels: Array<number> = [];
  public pharmanifty3mdata: Array<number> = [];
  public pharmanifty3mLabels: Array<any> = [];
  public lineChart3mData: Array<any> = [];
  public lineChart3mLabels: Array<number> = [];
  public pharmanifty6mdata: Array<number> = [];
  public pharmanifty6mLabels: Array<any> = [];
  public lineChart6mData: Array<any> = [];
  public lineChart6mLabels: Array<number> = [];
  public pharmanifty1yrdata: Array<number> = [];
  public pharmanifty1yrLabels: Array<any> = [];
  public lineChart1yrData: Array<any> = [];
  public lineChart1yrLabels: Array<number> = [];
  
  public lineChartvixData: Array<any> = [];
  public lineChartvixLabels: Array<number> = [];
  public lineChartvixOptions: any;
  prev_close:number;
  stockisin: any;
  stockList: any
  basicData: any;
  basicOptions: any;
  basicData1: any;
  basicOptions1: any;
  chart: any;
  date: any;
  hours:any;
  minutes:any;
  time:any;
  pharmaniftysentiments: pharmaniftysentimentstiles[] = [];
  indexid='1905';
  pharmaniftystocks: pharmaniftystockstiles[] = [];
  pharmaniftycrossover: pharmaniftycrossovertile[] = [];
  pharmaniftycrossoverw: pharmaniftycrossoverwtile[] = [];
  pharmaniftycrossoverm: pharmaniftycrossovermtile[] = [];
  pharmaniftyindicators: pharmaniftyindicatorstile[] = [];
  pharmaniftyindicatorsw: pharmaniftyindicatorswtile[] = [];
  pharmaniftyindicatorsm: pharmaniftyindicatorsmtile[] = [];
  pharmaniftybb: pharmaniftybbtile[] = [];
  pniftyema: pniftyematile[] = [];
  pniftysma: pniftysmatile[] = [];
  tlindexparam:tlindexparamtile[]=[];
  public lineChartDatapnsnrr1: Array<number> = [];
  public lineChartDatapnsnrr2: Array<number> = [];
  public lineChartDatapnsnrr3: Array<number> = [];
  public lineChartDatapnsnrs1: Array<number> = [];
  public lineChartDatapnsnrs2: Array<number> = [];
  public lineChartDatapnsnrs3: Array<number> = [];
  public lineChartLabelspnsnrr1: Array<any> = [];
  public lineChartLabelspnnrr3: Array<any> = [];
  public lineChartLabelspnsnrr2: Array<any> = [];
  public lineChartLabelspnsnrs1: Array<any> = [];
  public lineChartLabelspnsnrs2: Array<any> = [];
  public lineChartLabelspnsnrs3: Array<any> = [];
  public lineChartDatapnsnrr1w: Array<number> = [];
  public lineChartDatapnsnrr2w: Array<number> = [];
  public lineChartDatapnsnrr3w: Array<number> = [];
  public lineChartDatapnsnrs1w: Array<number> = [];
  public lineChartDatapnsnrs2w: Array<number> = [];
  public lineChartDatapnsnrs3w: Array<number> = [];
  public lineChartLabelspnsnrr1w: Array<any> = [];
  public lineChartLabelspnnrr3w: Array<any> = [];
  public lineChartLabelspnsnrr2w: Array<any> = [];
  public lineChartLabelspnsnrs1w: Array<any> = [];
  public lineChartLabelspnsnrs2w: Array<any> = [];
  public lineChartLabelspnsnrs3w: Array<any> = [];
  public lineChartDatapnsnrr1m: Array<number> = [];
  public lineChartDatapnsnrr2m: Array<number> = [];
  public lineChartDatapnsnrr3m: Array<number> = [];
  public lineChartDatapnsnrs1m: Array<number> = [];
  public lineChartDatapnsnrs2m: Array<number> = [];
  public lineChartDatapnsnrs3m: Array<number> = [];
  public lineChartLabelspnsnrr1m: Array<any> = [];
  public lineChartLabelspnnrr3m: Array<any> = [];
  public lineChartLabelspnsnrr2m: Array<any> = [];
  public lineChartLabelspnsnrs1m: Array<any> = [];
  public lineChartLabelspnsnrs2m: Array<any> = [];
  public lineChartLabelspnsnrs3m: Array<any> = [];
  basicData3: any;
  basicOptions3: any;
  
  duration:any;
  public  lineChartColors = [
    {
      borderColor: '#2d0365'
    }
  ];
  public lineChartType: ChartType = 'line';
  public lineChartOptions:ChartOptions = {
    responsive: true,
    // aspectRatio: 1,
     maintainAspectRatio:false,
    scales: {
      
    },
   
    
    elements: {
      point: {
        radius: 0
      }
    }
   
  };
 
  
 
  async ngOnInit(){
    this.primengConfig.ripple = true;
    this.stockList = stocks.default.Data
    await Promise.all([
    // this.gettlpharmaparams(this.indexid,this.duration)
    this.getpharmaniftytoday(),
    this.getpharmaniftytoday1(),
    
    this.getmcpharmaniftystocks(),
    this.getpharmaniftysmaema(),
    this.getpharmanifty5d(),
    this.getpharmanifty1m(),
    this.getpharmanifty3m(),
    this.getpharmanifty6m(),
    
    this.getpharmaniftyvix(),
 
    this.getpharmaniftysentiments(),
   
    this.getpharmanifty1yr()
  ])
    setInterval(() => { this.getpharmaniftytoday1()}, 30000);
    setInterval(() => { this.getpharmaniftysmaema() }, 30000);
    setInterval(() => { this.getmcpharmaniftystocks()}, 30000);
    setInterval(() => { this.getpharmaniftyvix() }, 30000);
    
    
    setInterval(() => { this.getpharmaniftytoday() }, 30000);

  
  }
  public dataValues: Object[] = [];
    // public colors: string[] = ['red', 'green'];
    //Initializing Primary X Axis
    // public primaryXAxis: Object = {
    //     valueType: 'DateTime',
    //     //  labelFormat: 'hms',
    //      intervalType: 'Minutes',
    //     edgeLabelPlacement: 'Shift',
    //     majorGridLines: { width: 0 }
    // };
    //Initializing Primary Y Axis
    public primaryXAxis: Object;
    public primaryYAxis: Object;
    // public primaryYAxis: Object = {
    //     rangePadding: 'None',
    //     minimum: 12000,
    //     maximum: 15000,
    //     title: 'Pharma Nifty',
    //     lineStyle: { width: 1 },
    //     majorTickLines: { width: 1 },
    //     minorTickLines: { width: 1 }
    // };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    
    public width: string 
    public legend: Object = { visible: true };
   
    public tooltip: Object = {
        enable: true, shared: true
    };
    public load(args: ILoadedEventArgs):void {
      
      
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        
  }
    public title: string = ('Pharma');
   
  
 
  getpharmaniftysentiments() {
    this.pharmaniftysentiments.length = 0;
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/in%3Bcpr?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      this.pharmaniftysentiments.push({ text1: nestedItems[2]['sentiments']['indication'],text2:"Daily"})
    }, err => {
      console.log(err)
    })

      this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/in%3Bcpr?field=RSI').subscribe(data5 => {
        let nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
        
    this.pharmaniftysentiments.push({ text1: nestedItems[2]['sentiments']['indication'],text2:"Weekly"}) 
     
  }, err => {
    console.log(err)
  })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/in%3Bcpr?field=RSI').subscribe(data5 => {
    let nestedItems = Object.keys(data5).map(key => {
    return data5[key];
    });
    
      
      this.pharmaniftysentiments.push({ text1: nestedItems[2]['sentiments']['indication'],text2:"Monthly"})
    }, err => {
      console.log(err)
    })
  }
  
  gettlpharmaparams(indexid,selectedValue){
    // this.indexid='1898';
   
    this.dataApi.gettlindexparams(this.indexid,this.selectedValue).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
   
      this.tlindexparam.length=0;
      console.log(nestedItems);

      for(let val in nestedItems[0].body.parameters){
        if(nestedItems[0].body.parameters[val].hasOwnProperty('name')){
        this.tlindexparam.push({ text1:nestedItems[0].body.parameters[val].name,text2:nestedItems[0].body.parameters[val].value,text3:nestedItems[0].body.parameters[val].color})
      }else{continue;}
    };
     })
     
  }
  onClick(event) {
    this.gettlpharmaparams(this.indexid,this.selectedValue)
    
  }
  getpharmaniftyvix() {
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
   getpharmaniftysmaema() {
    this.http.get('https://mo.streak.tech/api/tech_analysis/?timeFrame=day&stock=INDICES%3ANIFTY%20PHARMA').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      /////////////////////////////EMA/SMA from Kite //////////////////////
    
      this.pniftyema.length = 0;
      this.pniftysma.length = 0;

      this.pniftyema.push({ text1: nestedItems[10], text2: nestedItems[5], text3: nestedItems[7], text4: nestedItems[9], text5: nestedItems[11], text6: nestedItems[6], text7: nestedItems[8] })
      this.pniftysma.push({ text1: nestedItems[37], text2: nestedItems[32], text3: nestedItems[34], text4: nestedItems[36], text5: nestedItems[38], text6: nestedItems[33], text7: nestedItems[35] })

     
    }, err => {
      console.log(err)
    })
  }
 
 
 
  getmcpharmaniftystocks() {
    this.http.get('https://etmarketsapis.indiatimes.com/ET_Stats/getIndexByIds?pagesize=25&exchange=NSE&sortby=percentChange&sortorder=desc&indexid=13017&company=true&indexname=Nifty%20Pharma&marketcap=').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      

        //////////////////////////////Nifty 50 Stocks ////////////////////////
        this.pharmaniftystocks.length = 0;
        for (let val in nestedItems[0][0]['companies']) {
          this.pharmaniftystocks.push({ text1: nestedItems[0][0]['companies'][val].companyShortName, text2: nestedItems[0][0]['companies'][val].change, text3: nestedItems[0][0]['companies'][val].percentChange, text4: nestedItems[0][0]['companies'][val].current,text5: nestedItems[0][0]['companies'][val].symbol })
        }
  
     
    }, err => {
      console.log(err)
    })
  }
   getpharmanifty1yr() {
    
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=1yr&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[1].values) {
        this.pharmanifty1yrdata.push(nestedItems[1].values[val]["_value"])
        this.pharmanifty1yrLabels.push(nestedItems[1].values[val]["_time"])
   
      }
  
      this.lineChart1yrData = [{
        label: 'Price',
        data: this.pharmanifty1yrdata,
        borderWidth: 1,
        fill: false
      }];

      this.lineChart1yrLabels = this.pharmanifty1yrLabels;
    
      
    }, err => {
      console.log(err)
    })
   
   
  }
  trackByFunction(index, item) {
   // console.log( 'TrackBy:', item.text2, 'at index', index );
    return item.text2
  }
  trackByFunction1(index1, item1) {
    //console.log( 'TrackBy:', item1.text1, 'at index', index1);
    return item1.text1
   }
  trackByFunction2(index2, item2) {
    //console.log( 'TrackBy:', item2.text1, 'at index', index2 );
    return item2.text1
   }
  trackByFunction3(index3, item3) {
    //console.log( 'TrackBy:', item3.text1, 'at index', index3 );
    return item3.text1;
   }
  trackByFunction4(index4, item4) {
    //console.log( 'TrackBy:', item4.text2, 'at index', index4 );
    item4.text2;
   }
  trackByFunction5(index5, item5) {
    //console.log( 'TrackBy:', item5.text1, 'at index', index5 );
    return item5.text1;
   }
  trackByFunction6(index6, item6) {
    //console.log( 'TrackBy:', item6.text1, 'at index', index6 );
     return item6.text1;
   }
  trackByFunction7(index7, item7) {
    //console.log( 'TrackBy:', item7.text1, 'at index', index7 );
    return item7.text1;
   }
  trackByFunction8(index8, item8) {
    //console.log( 'TrackBy:', item8.text3, 'at index', index8 );
    return item8.text3 ;
  }
  trackByFunction9(index9, item9) {
    //console.log( 'TrackBy:', item8.text3, 'at index', index8 );
    return item9.text3 ;
  }
  trackByFunction10(index10, item10) {
    //console.log( 'TrackBy:', item8.text3, 'at index', index8 );
    return item10.text3 ;
  }
  trackByFunction11(index11, item11) {
    //console.log( 'TrackBy:', item8.text3, 'at index', index8 );
    return item11.text3 ;
   }
   trackByFunction12(index12, item12) {
    //console.log( 'TrackBy:', item8.text3, 'at index', index8 );
    return item12.text2 ;
   }
  

  getpharmanifty6m() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=6m&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[1].values) {
        this.pharmanifty6mdata.push(nestedItems[1].values[val]["_value"])
        this.pharmanifty6mLabels.push(nestedItems[1].values[val]["_time"])
   
      }
  

      this.lineChart6mData = [{
        label: 'Price',
        data: this.pharmanifty6mdata,
        borderWidth: 1,
        fill: false
      }];

      this.lineChart6mLabels = this.pharmanifty6mLabels;
    
      
    }, err => {
      console.log(err)
    })
  
  }
  getpharmanifty3m() {
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=3m&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[1].values) {
        this.pharmanifty3mdata.push(nestedItems[1].values[val]["_value"])
        this.pharmanifty3mLabels.push(nestedItems[1].values[val]["_time"])
   
      }
  

      this.lineChart3mData = [{
        label: 'Price',
        data: this.pharmanifty3mdata,
        borderWidth: 1,
        fill: false
      }];

      this.lineChart3mLabels = this.pharmanifty3mLabels;
    
     
    }, err => {
      console.log(err)
    })
  
  }
  getpharmanifty5d() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/in%3Bcpr?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      ////////////To get Nifty 5day Resistances and Indicators/////////////
      
      let val5 = 0;
      while (val5 != 2400) {
        val5 = val5 + 1
        this.lineChartDatapnsnrr1w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.lineChartDatapnsnrr2w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.lineChartDatapnsnrr3w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.lineChartDatapnsnrs3w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.lineChartDatapnsnrs2w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.lineChartDatapnsnrs1w.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
   
      this.pharmaniftycrossoverw.length = 0;
      for (let val in nestedItems[2]['crossover']) {
        this.pharmaniftycrossoverw.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      this.pharmaniftyindicatorsw.length = 0;
      for (let val1 in nestedItems[2]['indicators']) {
        if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
          this.pharmaniftyindicatorsw.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
      
      
    }, err => {
      console.log(err)
    })
     ////////////To get Nifty 1 week Price///////////////////////
      
     this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=5d&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
  this.pharmanifty5ddata.length = 0;
  this.pharmanifty5dLabels.length = 0;
  for (let val in nestedItems[1].values) {
    this.pharmanifty5ddata.push(nestedItems[1].values[val]["_value"])
    this.pharmanifty5dLabels.push(nestedItems[1].values[val]["_time"].slice(0,6))
  
  }
 

  this.lineChart5dData = [{
    label: 'Price',
    data: this.pharmanifty5ddata,
    borderWidth: 1,
    fill: false
  }, {
    label: 'R1',
    data: this.lineChartDatapnsnrr1w,
    borderWidth: 1,
    bordercolor: '#d3766c',
    fill: false
  },
  {
    label: 'R2',
    data: this.lineChartDatapnsnrr2w,
    borderWidth: 1,
    borderColor: '#e3256b',
    fill: false
  }
    , {
    label: 'R3',
    data: this.lineChartDatapnsnrr3w,
    borderWidth: 1,
    borderColor: '#c84343',
    fill: false
  }, {
    label: 'S1',
    data: this.lineChartDatapnsnrs1w,
    borderWidth: 1,
    borderColor: '#90b590',
    fill: false
  }, {
    label: 'S2',
    data: this.lineChartDatapnsnrs2w,
    borderWidth: 1,
    borderColor: '#09c51b',
    fill: false
  }, {
    label: 'S3',
    data: this.lineChartDatapnsnrs3w,
    borderWidth: 1,
    borderColor: '#375f00',
    fill: false
  }];

  this.lineChart5dLabels = this.pharmanifty5dLabels;
 

}, err => {
  console.log(err)
})
 
  }  
   
    getpharmanifty1m() {
      this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/in%3Bcpr?field=RSI').subscribe(data5 => {
        let nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
       
        ////////////To get Nifty 1 month Resistances and Indicators/////////////
        this.lineChartDatapnsnrr1m.length = 0;
        this.lineChartDatapnsnrr2m.length = 0;
        this.lineChartDatapnsnrr3m.length = 0;
        this.lineChartDatapnsnrs1m.length = 0;
        this.lineChartDatapnsnrs2m.length = 0;
        this.lineChartDatapnsnrs3m.length = 0;
        let val5 = 0;
        while (val5 != 2000) {
          val5 = val5 + 1
          this.lineChartDatapnsnrr1m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
            this.lineChartDatapnsnrr2m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
            this.lineChartDatapnsnrr3m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
            this.lineChartDatapnsnrs3m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
            this.lineChartDatapnsnrs2m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
            this.lineChartDatapnsnrs1m.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
        }
   
        this.pharmaniftycrossoverm.length = 0;
       
        for (let val in nestedItems[2]['crossover']) {
          this.pharmaniftycrossoverm.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
        }
        this.pharmaniftyindicatorsm.length = 0;
       
        for (let val1 in nestedItems[2]['indicators']) {
          if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
            this.pharmaniftyindicatorsm.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
          }
        }
       
      }, err => {
        console.log(err)
      })
       
      
     
  

      ////////////To get Nifty 1 month Price///////////////////////
      
        this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=1m&type=area').subscribe(data5 => {
          let nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
         
      this.pharmanifty1mdata.length = 0;
      this.pharmanifty1mLabels.length = 0;
      for (let val in nestedItems[1].values) {
        this.pharmanifty1mdata.push(nestedItems[1].values[val]["_value"])
        this.pharmanifty1mLabels.push(nestedItems[1].values[val]["_time"])
      
      }
     
    
      this.lineChart1mData = [{
        label: 'Price',
        data: this.pharmanifty1mdata,
        borderWidth: 1,
        fill: false
      }, {
        label: 'R1',
        data: this.lineChartDatapnsnrr1m,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      },
      {
        label: 'R2',
        data: this.lineChartDatapnsnrr2m,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatapnsnrr3m,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatapnsnrs1m,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatapnsnrs2m,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatapnsnrs3m,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
   
      this.lineChart1mLabels = this.pharmanifty1mLabels;
    
    }, err => {
      console.log(err)
    })
  }
  getpharmaniftytoday1(){ 
   

    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=1d&type=area').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
      this.dataValues.length=0;  
       this.stockhcdate1.length=0; 
       this.prev_close=(nestedItems[1]['prev_close'])
       
      for (let val in nestedItems[1].values) {
       
        this.stockhcdate1.push({x:(nestedItems[1].values[val]["_time"]),y:(nestedItems[1].values[val]["_value"])})     
      }
     
      
    

 
this.primaryYAxis = {
  rangePadding: 'None',
  // minimum: 12000,
  // maximum: 13000,
  title: 'Pharma Nifty',
  lineStyle: { width: 1 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 }
};
this.primaryXAxis={
valueType: 'DateTime',
  // labelFormat: 'hms',
  intervalType: 'Minutes',
edgeLabelPlacement: 'Shift',
majorGridLines: { width: 0 }
};
      
this.stockhcdate1.map((value: number, index: number) => {
  

  if (((value['x']).slice(0,1)) == 0){ 

  this.hours=((value['x']).slice(1,2))
}
  else { this.hours=((value['x']).slice(0,2))
  }
 this.minutes=Number((value['x']).split(':').splice(1))
  let date=new Date()
  this.time=((date.setHours(this.hours,this.minutes)))
  
  

   if ( (Number(value['y'])) < this.prev_close){
    this.dataValues.push({
       
          XValue:new Date(this.time), YValue: Number(value['y']),
        color: ['red']
    });
   }
  else if (Number(value['y']) > this.prev_close ) {
    
     
    this.dataValues.push({
       
        XValue:new Date(this.time), YValue: Number(value['y']),
        color: ['green']
    });}
   
  
  });  

})
}
  
  

 
  getpharmaniftytoday() {
        ////////////To get Nifty Today Price///////////////////////
    
    // 
    // this.dataValues.length=0; 
    // rainFallData.map((value: number, index: number) => {
    //   console.log(index)
    //   console.log(new Date(2017, -index, 1),(value))
    //   if ( Number(value) > 12650 ){
    //     this.dataValues.push({
    //         XValue: (new Date(2017, -index, 1)), YValue: (value),
    //         color: ['green']
    //     });}
    //   else if ( Number(value) < 12650 ) {
    //     this.dataValues.push({
    //       XValue: new Date(2017, -index, 1), YValue: (value),
    //         color: ['red']
    //     });}
        
    // });
    // console.log( this.dataValues)
   
    this.http.get('https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=41&range=1d&type=area').subscribe(data5 => {
        let nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
      
        this.pharmaniftydata.length = 0;
        this.pharmaniftyLabels.length = 0;
         this.stockhcdate.length=0; 
         this.dataValues.length=0;
        for (let val in nestedItems[1].values) {
          this.pharmaniftydata.push(nestedItems[1].values[val]["_value"])
          
          this.pharmaniftyLabels.push((nestedItems[1].values[val]["_time"]))
          this.stockhcdate.push({x:(nestedItems[1].values[val]["_time"]),y:(nestedItems[1].values[val]["_value"])})     
        }
        
        
      }, err => {
        console.log(err)
      })
      this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/in%3Bcpr?field=RSI').subscribe(data5 => {
        let nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
      
        ////////////To get Nifty Today Resistances and Indicators/////////////
        this.lineChartDatapnsnrr1.length = 0;
        this.lineChartDatapnsnrr2.length = 0;
        this.lineChartDatapnsnrr3.length = 0;
        this.lineChartDatapnsnrs1.length = 0;
        this.lineChartDatapnsnrs2.length = 0;
        this.lineChartDatapnsnrs3.length = 0;
   
        let val = 0;
        while (val != 400) {
          val = val + 1
          this.lineChartDatapnsnrr1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
            this.lineChartDatapnsnrr2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
            this.lineChartDatapnsnrr3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
            this.lineChartDatapnsnrs3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
            this.lineChartDatapnsnrs2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
            this.lineChartDatapnsnrs1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
        }
         
        this.pharmaniftyindicators.length = 0;
        this.pharmaniftycrossover.length = 0;
        for (let val in nestedItems[2]['crossover']) {
          this.pharmaniftycrossover.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
        }
         
        for (let val1 in nestedItems[2]['indicators']) {
          if (nestedItems[2]['indicators'][val1]['id'] != 'bollinger') {
            this.pharmaniftyindicators.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
          }
        }
          
        
      
      
     
    
      this.lineChartData = [{
        label: 'Price',
        data: this.pharmaniftydata,
        borderWidth: 1,
        fill: false
      }, 
      {
        label: 'R2',
        data: this.lineChartDatapnsnrr2,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      },
      {
        label: 'R1',
        data: this.lineChartDatapnsnrr1,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      }
        , {
        label: 'R3',
        data: this.lineChartDatapnsnrr3,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.lineChartDatapnsnrs1,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.lineChartDatapnsnrs2,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.lineChartDatapnsnrs3,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      }];
   
      this.lineChartLabels = this.pharmaniftyLabels;
   
   
      
    }, err => {
      console.log(err)
    })
    }
  changestockpage(symbol) {
     

    this.stockisin = this.stockList.filter(i => i.symbol == symbol)[0].isin
    this.window.open("/Share?stock=" + this.stockisin, "_blank")
  }
}



 



 
