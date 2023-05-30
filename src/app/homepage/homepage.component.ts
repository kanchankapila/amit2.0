import { Component, OnInit, ViewChild } from '@angular/core';

// import * as schedule from "node-schedule";
import { DataapiService } from '../../dataapi.service'
import { HttpClient} from "@angular/common/http";
interface Gainers {
text1?: string;
text2?: string;
text3?: string;
text4?: string;
text5?: string;
text6?: string;
text7?: string;
text8?: string;
text9?: string;
text10?: string;
text11?: string;

}
import {
ApexNonAxisChartSeries,
ApexResponsive,

ApexXAxis,

ApexStroke,

ApexYAxis,
ApexTooltip,
ApexFill,
ApexAxisChartSeries,
ApexTitleSubtitle,
ApexDataLabels,
ApexChart,
ApexPlotOptions,
ApexLegend,
ChartComponent



} from "ng-apexcharts";
export type ChartOptions1 = {
series: ApexAxisChartSeries;
chart: ApexChart;
dataLabels: ApexDataLabels;
plotOptions: ApexPlotOptions;
xaxis: ApexXAxis;
yaxis: ApexYAxis;
stroke: ApexStroke;
title: ApexTitleSubtitle;
tooltip: ApexTooltip;
fill: ApexFill;
legend: ApexLegend;

};

export type ChartOptions2 = {
series: ApexNonAxisChartSeries;
chart: ApexChart;
fill: ApexFill;
responsive: ApexResponsive[];
labels: any;
colors: string[];
};
export interface globalmarkettiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;

}

interface Losers {
text1?: string;
text2?: string;
text3?: string;
text4?: string;
text5?: string;
text6?: string;
text7?: string;
text8?: string;
text9?: string;
text10?: string;
text11?: string;

}
import {  ChartOptions, ChartConfiguration, ChartType } from 'chart.js';



import {RadioButton} from 'primeng/radiobutton';
import ApexCharts from 'apexcharts';



export type ChartOptions5 = {
series: ApexAxisChartSeries;
chart: ApexChart;
dataLabels: ApexDataLabels;
title: ApexTitleSubtitle;
plotOptions: ApexPlotOptions;
legend: ApexLegend;
};
export interface dealsdatatile { text1: string; text2: string; text3: string; text4: string, text5: string, text6: any; }


export interface globalmarkettiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;

}
export interface screenerGainerstiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
// text7:string;
// text8:string;
// text9:string;
// text10:string;
text11:string;

}
export interface screenerLoserstiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
// text7:string;
// text8:string;
// text9:string;
// text10:string;
text11:string;

}
export interface screenertiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
// text7:string;
// text8:string;
// text9:string;
// text10:string;
text11:string;

}
export interface pdstockstiles{
text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
text7:string;
text8:string;
text9:string;
text10:string;
text11:string;
text12:string;
}
export interface ssstockstiles{
text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
text7:string;
text8:string;
text9:string;
text10:string;
text11:string;
text12:string;
}
export interface screenerhourlyGainerstiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
// text7:string;
// text8:string;
// text9:string;
// text10:string;
text11:string;

}
export interface screenerhourlyLoserstiles {

text1: string;
text2: string;
text3: string;
text4: string;
text5: string;
text6: string;
// text7:string;
// text8:string;
// text9:string;
// text10:string;
text11:string;

}
export interface sectortiles {

x: string;
y: any;



}

//TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
@Component({
selector: 'app-homepage',
templateUrl: './homepage.component.html',
styleUrls: ['./homepage.component.scss']


})
export class HomepageComponent implements OnInit {
//@ViewChild(BaseChartDirective) chart?: BaseChartDirective;
@ViewChild("chart") chart: ChartComponent;
public chartOptions5: Partial<ChartOptions5>;
public chartOptions6:Partial<ChartOptions1>;
public chartOptions1: Partial<ChartOptions1>;
public chartOptions2: Partial<ChartOptions2>;
public indicesadvperc: Array<number> = [];
public indicesname: Array<string> = [];
public indicesdecperc: Array<number> = [];
public sectorsadvperc: Array<number> = [];
public sectorsname: Array<string> = [];
baseurl:any;
public sectorsdecperc: Array<number> = [];
// @ViewChild("chart") chart: ChartComponent;
@ViewChild("chart1") chart1: ChartComponent;
@ViewChild("chart2") chart2: ChartComponent;

  mcadvvalue: Array<any> = [];
  mcdecvalue: any
  user: string;
  mcsymbol1: any;
  public advData: Array<any> = [];
  public advLabels: Array<number> = [];
  public decData: Array<any> = [];


  public leafItemSettings: object
  public data: object[]
  public tooltipSettings: object
  
  screen:any;

tableDataGainers: Gainers[] = [];
tableDataLosers: Losers[] = [];
cols: any[] = [];
constructor(private http: HttpClient,private dataApi: DataapiService) {
  this.dialogVisible = this.pdstocks.map(() => false);
  if (window.location.hostname === "localhost") {
    this.baseurl = "http://localhost:9999"
  } else {
    this.baseurl = "https://stockinsights.netlify.app"
  } 

  }
selectedValue: string;
selectedValueGainers: string;
selectedValueLosers: string;
selectedValue3: string;
selectedValue4: string;
selectedValue5: string;
selectedValue6: string;
selectedValue7: string;
ngAfterViewInit() {
  RadioButton.prototype.select = function () {
    if (!this.disabled) {
        this.inputViewChild.nativeElement.checked = true;
        this.checked = true;
        this.onModelChange(this.value);
        this.onClick.emit(null);
    }
};
} 
globalmarket: globalmarkettiles[] = [];
pdstocks:pdstockstiles[]=[];
ssstocks:ssstockstiles[]=[];
screenerGainers: screenerGainerstiles[] = [];
screener: screenertiles[] = [];
screenerhourlyGainers: screenerhourlyGainerstiles[] = [];
screenerLosers: screenerLoserstiles[] = [];
screenerhourlyLosers: screenerhourlyLoserstiles[] = [];
sectors:sectortiles[] = [];
mcadvvalue1: Array<any> = [];



public advdecChartData: ChartConfiguration['data']
public dealsdata: dealsdatatile[] = [];
public advdecChartType: ChartType = 'line';

public advdecChartOptions:ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    // Add ,scales options if needed
  },
 

  elements: {
    point: {
      radius: 0
    }
  }
};


async  ngOnInit() {
  await Promise.all([
  this.getglobal(),
  this.getadvdec(),
  this.opstrafiidii(),
  this.getsectors(),
  this.getmcinsightview(),
  this.selectedValueGainers= "gainers,intraday,desc,1d",
  this.selectedValueLosers= "losers,intraday,desc,1d",
  this.getetscreenersGainers(this.selectedValueGainers),
  this.getetscreenersLosers(this.selectedValueLosers),
  this.getglobal(),
  this.getadvdec1(),
  this.getetindices(),
  this.getetsectors()])
  // this.getetstockscorescreeners();
  // this.getetpredefinedfilters
  setInterval(() => { this.getadvdec1() }, 30000);
  setInterval(() => { this.getglobal() }, 30000);
  setInterval(() => { this.getsectors() }, 30000);
  setInterval(() => { this.getetindices() }, 30000);
  setInterval(() => { this.getetsectors() }, 30000);
  setInterval(() => { this.getglobal() }, 30000);
  setInterval(() => { this.getadvdec() }, 30000);
  setInterval(() => { this.refreshtl() }, 432000000);
  
//  this.getetscreeners(this.selectedValue)








}

onClick(event) {
  
  this.getetscreenersGainers(this.selectedValueGainers)
  
}
onClick1(event) {
  this.getetscreenershourlyGainers(this.selectedValueGainers)
  
}
onClick2(event) {
  
  this.getetscreenersLosers(this.selectedValueLosers)
  
}
onClick3(event) {
  this.getetscreenershourlyLosers(this.selectedValueLosers)
  
}
onClick4(event) {
  this.getetpredefinedscreeners(this.selectedValue)
  
}
onClick5(event) {
  this.getetstockscorescreeners(this.selectedValue)
  
}
onClick6(event) {
  this.getetscreeners(this.selectedValue)
  
}

ReadMore:boolean = true

//hiding info box
visible:boolean = false
ReadMore1:boolean = true

//hiding info box
visible1:boolean = false
ReadMore2:boolean = true

//hiding info box
visible2:boolean = false
ReadMore3:boolean = true

//hiding info box
visible3:boolean = false

//onclick toggling both
onclick()
{
  this.ReadMore = !this.ReadMore; //not equal to condition
  this.visible = !this.visible
}
onclick1()
{
  this.ReadMore1 = !this.ReadMore1; //not equal to condition
  this.visible1 = !this.visible1
}
onclick2()
{
  this.ReadMore2 = !this.ReadMore2; //not equal to condition
  this.visible2 = !this.visible2
}
onclick3()
{
  this.ReadMore3 = !this.ReadMore3; //not equal to condition
  this.visible3 = !this.visible3
}
refreshtl() {

  this.http.get(this.baseurl+'/.netlify/functions/tlrefresh').subscribe(data5 => {
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    console.log(nestedItems)
// this.dataApi.getopstrarefresh();
  console.log("TLrefresh is hit")
});
}; 
dialogVisible: boolean[] = [];

trackByFunctionpdstocks(index, item) {
  return index;
}
trackByFunctionssstocks(index, item) {
  return index;
}
trackByFunctionscreener(index, item) {
  return index;
}
trackByFunctionglobalmarket(index, item) {
  return index;
}


maximizeDialog(index: number) {
  const dialog = document.getElementsByClassName('ui-dialog-content')[index] as HTMLElement;
  dialog.style.width = '100vw';
  dialog.style.height = '100vh';
  dialog.style.top = '0';
  dialog.style.left = '0';
  dialog.style.margin = '0';
  dialog.style.borderRadius = '0';
}
getadvdec1() {
  
  this.http.get<any>('https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value1?classic=true').subscribe(data5 => {
  
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    
    this.mcadvvalue1.length=0;
    for (let val in nestedItems[1]) {
      this.mcadvvalue1 = [Number(nestedItems[1][val].advValue),Number(nestedItems[1][val].decValue)]
      
      
      
    }
    
    var options = {
      chart: {
        type: 'donut',
        width: '75%', // Set the chart width to 100% for responsiveness
      },
      series: this.mcadvvalue1,
      labels: ["Advance", "Decline"],
      colors: ["#32cd32", "#ff4040"]
    };
    
    var chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();
    
  
    
  }, err => {
    console.log(err)
  })
  
}


// getglobal() {
//   this.dataApi.getntglobal().subscribe(data5 => {
//     let nestedItems = Object.keys(data5).map(key => {
//       return data5[key];
//     });
  
//   //  this.http.get<any>('https://api.niftytrader.in/webapi/Index/globalStock').subscribe(data5 => {
  
  
//     this.globalmarket.length = 0;
//     for (let val in nestedItems[0]['resultData']) {
//       for (let val1 in nestedItems[0]['resultData'][val]['data']) {
//         this.globalmarket.push({ text1: nestedItems[0]['resultData'][val]['data'][val1].symbol,text2:nestedItems[0]['resultData'][val]['data'][val1].country,text3:nestedItems[0]['resultData'][val]['data'][val1].change_per,text4:nestedItems[0]['resultData'][val]['data'][val1].change_value,text5:nestedItems[0]['resultData'][val]['data'][val1].timestamp })
//       }
//     }
//   })


// }

getetindices(){
this.dataApi.getetindicesdata().subscribe(data => {
  let nestedItems = Object.keys(data).map(key => {
    return data[key];
  });

  this.indicesadvperc.length=0;
  this.indicesdecperc.length=0;
  this.indicesname.length=0;
  for(let val in nestedItems[0].searchresult){
    this.indicesadvperc.push(nestedItems[0].searchresult[val].advancesPerChange)
    this.indicesdecperc.push(nestedItems[0].searchresult[val].declinesPerChange)
    this.indicesname.push(nestedItems[0].searchresult[val].indexName)
  }
  
  this.chartOptions6 = {
    series: [
      {
        name: "Advance",
        data: this.indicesadvperc,
        color:"#2dde98"
      },
      {
        name: "Decline",
        data: this.indicesdecperc,
        color:"#fd5c63"
      }
    ],
    chart: {
      type: "bar",
      height:'500',
    
      
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: false
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    title: {
      text: "NSE Indices"
    },
    xaxis: {
      categories: this.indicesname,
      labels: {
      
          
        
        
      },
    },dataLabels: {
      enabled: false // turn off data labels
    },
   
    tooltip: {
      y: {
        formatter: function (val) {
          return String(val).slice(0, 3);
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
      labels: {
        formatter: function (value) {
          return String(value).slice(0, 3);
        }
      }
    },
    fill: {
      opacity: 1
    },
    
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40
    }
  }
});

}
getetsectors(){
this.dataApi.getetallsectorsdata().subscribe(data => {
  let nestedItems = Object.keys(data).map(key => {
    return data[key];
  });

  this.sectorsadvperc.length=0;
  this.sectorsdecperc.length=0;
  this.sectorsname.length=0;
  for(let val in nestedItems[0].searchresult){
    this.sectorsadvperc.push(nestedItems[0].searchresult[val].advancePercentChange)
    this.sectorsdecperc.push(nestedItems[0].searchresult[val].declinePercentChange)
    this.sectorsname.push(nestedItems[0].searchresult[val].sectorName)
  }
  

  this.chartOptions1 = {
    
    series: [
      {
        name: "Advance",
        data: this.sectorsadvperc,
        color:"#2dde98"
      },
      {
        name: "Decline",
        data: this.sectorsdecperc,
        color:"#fd5c63"
      }
    ],
    chart: {
      type: "bar",
     
      height: '500', // Set the chart height to 100% for responsiveness
      
      
      
      stacked: true
    },
    plotOptions: {
      
      bar: {
        horizontal: false
      }
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    title: {
      text: "Sectors Performance"
    },
    xaxis: {
      categories: this.sectorsname,
      labels: {
      
          
        
        
      }
    },dataLabels: {
      enabled: false // turn off data labels
    },
    
    
    tooltip: {
      y: {
        formatter: function (val) {
          return String(val).slice(0, 3);
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
      labels: {
        formatter: function (value) {
          return String(value).slice(0, 3);
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      offsetX: 40
    }
  };
});

}

async getetscreeners(selectedValue) {
  
  try {

      const a = selectedValue.split(',');
      const response = await fetch(`https://etmarketsapis.indiatimes.com/ET_Stats/${a[0]}?pagesize=25&sort=${a[1]}&sortby=percentchange&sortorder=${a[2]}&marketcap=largecap%2Cmidcap%2Csmallcap&duration=${a[3]}&pageno=1&index=2346`, {
          method: 'GET',
          headers: {}
      });
      if (response.ok) {
          const result = await response.json();
          this.screener.length = 0;
          for (const key in result['searchresult']) {
              this.screener.push({
                  text1: result['searchresult'][key].companyShortName,
                  text2: result['searchresult'][key].current,
                  text3: result['searchresult'][key].open,
                  text4: result['searchresult'][key].percentChange,
                  text5: result['searchresult'][key].fiftyTwoWeekHighPrice,
                  text6: result['searchresult'][key].fiftyTwoWeekLowPrice,
                  
                  text11: result['searchresult'][key].volumeInThousand
              });
          }
        
          // this.tableDataGainers = this.screenerGainers
        
      }
  } catch (err) {
      console.error(err);
  }
}

async getetscreenersGainers(selectedValueGainers) {
  
    try {

        const a = selectedValueGainers.split(',');
        const response = await fetch(`https://etmarketsapis.indiatimes.com/ET_Stats/${a[0]}?pagesize=25&sort=${a[1]}&sortby=percentchange&sortorder=${a[2]}&marketcap=largecap%2Cmidcap%2Csmallcap&duration=${a[3]}&pageno=1&index=2346`, {
            method: 'GET',
            headers: {}
        });
        if (response.ok) {
            const result = await response.json();
            this.screenerGainers.length = 0;
            for (const key in result['searchresult']) {
                this.screenerGainers.push({
                    text1: result['searchresult'][key].companyShortName,
                    text2: result['searchresult'][key].current,
                    text3: result['searchresult'][key].open,
                    text4: result['searchresult'][key].percentChange,
                    text5: result['searchresult'][key].fiftyTwoWeekHighPrice,
                    text6: result['searchresult'][key].fiftyTwoWeekLowPrice,
                    
                    text11: result['searchresult'][key].volumeInThousand
                });
            }
            
            this.tableDataGainers = this.screenerGainers
          
        }
    } catch (err) {
        console.error(err);
    }
}

async getetscreenershourlyGainers(selectedValueGainers) {
    try {
        const b = selectedValueGainers.split(',');
        const response = await fetch(`https://etmarketsapis.indiatimes.com/ET_Stats/${b[0]}?pageno=1&pagesize=25&sortby=percentchange&sortorder=${b[1]}&service=${b[2]}&exchange=nse&marketcap=largecap%2Cmidcap&starttime=${b[3]}&endtime=${b[4]}`, {
            method: 'GET',
            headers: {}
        });     
        if (response.ok) {
            const result = await response.json();
            this.screenerhourlyGainers.length = 0;
            for (const key in result['searchresult']) {
                this.screenerhourlyGainers.push({
                    text1: result['searchresult'][key].companyShortName,
                    text2: result['searchresult'][key].current,
                    text3: result['searchresult'][key].open,
                    text4: result['searchresult'][key].percentChange,
                    text5: result['searchresult'][key].fiftyTwoWeekHighPrice,
                    text6: result['searchresult'][key].fiftyTwoWeekLowPrice,
                    
                    text11: result['searchresult'][key].volumeInThousand
                });
            }
            this.tableDataGainers = this.screenerhourlyGainers
        }
    } catch (err) {
      console.error(err);
    }
}
async getetscreenersLosers(selectedValueLosers) {
  
  try {

      const a = selectedValueLosers.split(',');
      const response = await fetch(`https://etmarketsapis.indiatimes.com/ET_Stats/${a[0]}?pagesize=25&sort=${a[1]}&sortby=percentchange&sortorder=${a[2]}&marketcap=largecap%2Cmidcap%2Csmallcap&duration=${a[3]}&pageno=1&index=2346`, {
          method: 'GET',
          headers: {}
      });
      if (response.ok) {
          const result = await response.json();
          this.screenerLosers.length = 0;
          for (const key in result['searchresult']) {
              this.screenerLosers.push({
                  text1: result['searchresult'][key].companyShortName,
                  text2: result['searchresult'][key].current,
                  text3: result['searchresult'][key].open,
                  text4: result['searchresult'][key].percentChange,
                  text5: result['searchresult'][key].fiftyTwoWeekHighPrice,
                  text6: result['searchresult'][key].fiftyTwoWeekLowPrice,
                
                  text11: result['searchresult'][key].volumeInThousand
              });
          }
          
          this.tableDataLosers = this.screenerLosers
        
      }
  } catch (err) {
      console.error(err);
  }
}

async getetscreenershourlyLosers(selectedValueLosers) {
  try {
      const b = selectedValueLosers.split(',');
      const response = await fetch(`https://etmarketsapis.indiatimes.com/ET_Stats/${b[0]}?pageno=1&pagesize=25&sortby=percentchange&sortorder=${b[1]}&service=${b[2]}&exchange=nse&marketcap=largecap%2Cmidcap&starttime=${b[3]}&endtime=${b[4]}`, {
          method: 'GET',
          headers: {}
      });     
      if (response.ok) {
          const result = await response.json();
          this.screenerhourlyLosers.length = 0;
          for (const key in result['searchresult']) {
              this.screenerhourlyLosers.push({
                  text1: result['searchresult'][key].companyShortName,
                  text2: result['searchresult'][key].current,
                  text3: result['searchresult'][key].open,
                  text4: result['searchresult'][key].percentChange,
                  text5: result['searchresult'][key].fiftyTwoWeekHighPrice,
                  text6: result['searchresult'][key].fiftyTwoWeekLowPrice,
                  
                  text11: result['searchresult'][key].volumeInThousand
              });
          }
          this.tableDataLosers = this.screenerhourlyLosers
      }
  } catch (err) {
    console.error(err);
  }
}

async getetpredefinedscreeners(selectedValue){
  try {
    var c=(selectedValue.split(','));
    this.dataApi.getetpredefinedfilters(c[0],c[1],c[2]).subscribe( async data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      
      this.pdstocks.length=0;
      for(let val in nestedItems[0]['page']){
      this.pdstocks.push({text1:nestedItems[0]['page'][val].companyShortName,text2:nestedItems[0]['page'][val].absoluteChange,text3:nestedItems[0]['page'][val].ltp,text4:nestedItems[0]['page'][val].priceTargetHigh,text5:nestedItems[0]['page'][val].priceTargetLow,text6:nestedItems[0]['page'][val].recStrongBuyCnt,text7:nestedItems[0]['page'][val].recSellCnt,text8:nestedItems[0]['page'][val].recHoldCnt,text9:nestedItems[0]['page'][val].recText,text10:nestedItems[0]['page'][val].riskScore,text11:nestedItems[0]['page'][val].techScore,text12:nestedItems[0]['page'][val].analystScore})
      }
    
  
    })
  } catch (err) {
    console.error(err);
    }
  
}
async getetstockscorescreeners(selectedValue){
  try {
    var d=(selectedValue.split(','));
    this.dataApi.getetstockscorescreeners(d[0],d[1],d[2]).subscribe( async data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      
      this.ssstocks.length=0;
      for(let val in nestedItems[0]['page']){
        this.ssstocks.push({text1:nestedItems[0]['page'][val].companyShortName,text2:nestedItems[0]['page'][val].absoluteChange,text3:nestedItems[0]['page'][val].ltp,text4:nestedItems[0]['page'][val].priceTargetHigh,text5:nestedItems[0]['page'][val].priceTargetLow,text6:nestedItems[0]['page'][val].recStrongBuyCnt,text7:nestedItems[0]['page'][val].recSellCnt,text8:nestedItems[0]['page'][val].recHoldCnt,text9:nestedItems[0]['page'][val].recText,text10:nestedItems[0]['page'][val].riskScore,text11:nestedItems[0]['page'][val].techScore,text12:nestedItems[0]['page'][val].analystScore})
      
        }
  
      
    })
  } catch (err) {
    console.error(err);
    }
  
}

getmcinsightview() {
  
  this.dataApi.getmcinsightview().subscribe( async data5 => {
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    
    this.dealsdata.length = 0;
    
      
    for (let val in nestedItems) {
      try {
        const response = await fetch("https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/" + this.mcsymbol1, {
          method: 'GET',
          headers: {
          
          }
          
        });
    
      if(response.ok) {
        const result = await response.json();
        
      
        this.mcsymbol1 = nestedItems[val].symbol
        
        this.dealsdata.push({ text1: nestedItems[val]['deals'].slice(nestedItems[val]['deals'].length - 33).slice(0, 3), text2: nestedItems[val].name, text3: nestedItems[val].date, text4: nestedItems[val].time, text5: nestedItems[val].symbol, text6: result.data['pricepercentchange'] })
        }
      } catch (err) {
        console.error(err);
        }
      
    }
  })
  
}

getglobal() {
  this.dataApi.getntglobal().subscribe(data5 => {
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
  
  // this.http.get<any>('https://api.niftytrader.in/webapi/Index/globalStock').subscribe(data5 => {
  
  
    this.globalmarket.length = 0;
    for (let val in nestedItems[0]['resultData']) {
      for (let val1 in nestedItems[0]['resultData'][val]['data']) {
        this.globalmarket.push({ text1: nestedItems[0]['resultData'][val]['data'][val1].symbol,text2:nestedItems[0]['resultData'][val]['data'][val1].country,text3:nestedItems[0]['resultData'][val]['data'][val1].change_per,text4:nestedItems[0]['resultData'][val]['data'][val1].change_value,text5:nestedItems[0]['resultData'][val]['data'][val1].timestamp })
      }
    }
  })


}



getsectors() {
  this.http.get<any>(' https://api.moneycontrol.com/mcapi/v1/indices/ad-ratio/heat-map?period=1D&type=MC&indexId=9&subType=SE').subscribe(data5 => {
  
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    
      this.sectors.length = 0;
    for (let val in nestedItems[1].chartData) {

      if (nestedItems[1].chartData[val].id) {
        this.sectors.push({ x: nestedItems[1].chartData[val].name, y: (nestedItems[1].chartData[val].changeP)})
                                            }
    }
    this.chartOptions5 = {
     

      series: [
        {
          data: this.sectors
        }
      ],
      legend: {
        show: false
      },
      chart: {
        width: '80%',
        type: 'treemap'
      },
    
      title: {
        text: "NIFTY 50",
        // style: {
        //   fontSize: width > 500 ? '2rem' : '1rem'
        // }
      },
      dataLabels: {
        enabled: true,
    
        offsetY: -3
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          // shadeIntensity: width > 500 ? 0.5 : 0.2,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: -20,
                to: 0,
                color: "#CD363A"
              },
              {
                from: 0.1,
                to: 20,
                color: "#52B12C"
              },
              {
                from: 20.1,
                to: 40,
                color: "#32ACFF"
              }
            ]
          }
        }
      }
    };   
  });        
}
getadvdec() {
  
  this.http.get<any>('https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value1?classic=true').subscribe(data5 => {
  
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    this.advData.length = 0;
    this.decData.length = 0;
    this.advLabels.length = 0;
    for (let val in nestedItems[1]) {
      this.mcadvvalue = nestedItems[1][val].advValue
      this.mcdecvalue = nestedItems[1][val].decValue
      this.advData.push(nestedItems[1][val].decValue)
      this.decData.push(nestedItems[1][val].advValue)
      
      this.advLabels.push((nestedItems[1][val].curDate).slice(-5).replace('-',':'))
      
      
    }
    this.advdecChartData = {
      
      datasets: [
        {
          label: 'advance',
          data: this.advData
        },
        {
          label: 'decline',
          data: this.decData
        }],
        labels:this.advLabels
          };
    
  }, err => {
    console.log(err)
  })
  
}




opstrafiidii() {
  
  //let headers: HttpHeaders = new HttpHeaders()
  //headers = headers.append('cookie','_ga=GA1.2.775644955.1603113261; __utma=185246956.775644955.1603113261.1614010114.1614018734.3; _gid=GA1.2.1569867014.1655128119; csrftoken=j1Eh0zadbXX2a6wxeWMsyiN8tqMSwOXK8TSXab1ceRJkqLb4aiWHtuYjRjIeTSIb; .trendlyne=a7juoxwv02x77mw4wynxk1g43sjy9f36; _gat=1');
  // headers = headers.append('cookie','_ga=GA1.2.775644955.1603113261; __utma=185246956.775644955.1603113261.1614010114.1614018734.3; _gid=GA1.2.1569867014.1655128119; csrftoken=Fpues3hutZZ3i8S6FShRiVvk4uOXbl9tHBfdqByuhssEAISHMY6G5fXkfmwGI4Ov; .trendlyne=e3qcvnv4pt6rsd5avmsbj26fe6lzd8uo')
  // console.log(headers)
  this.http.get<any>('https://trendlyne.com/equity/getStockMetricParameterList/71260').subscribe(data5 => {
  
    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    
    console.log(nestedItems)
    
    //   this.advdecChartData = {
      
    //     datasets: [
    //       {
    //         label: 'advance',
    //         data: this.advData
    //       },
    //       {
    //         label: 'decline',
    //         data: this.decData
    //       }],
    //       labels:this.advLabels
    //        };
    
    // }, err => {
    //   console.log(err)

    


  
      })
  
  }


}
