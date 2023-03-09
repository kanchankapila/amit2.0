
import { Component, ViewChild } from "@angular/core";
import { DataapiService } from '../../dataapi.service';
import { HttpClient} from "@angular/common/http";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
 
 
} from "ng-apexcharts";


export type ChartOptions = {
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
};
export interface globalmarkettiles {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  public indicesadvperc: Array<number> = [];
  public indicesname: Array<string> = [];
  public indicesdecperc: Array<number> = [];
  public sectorsadvperc: Array<number> = [];
  public sectorsname: Array<string> = [];
  public sectorsdecperc: Array<number> = [];
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("chart1") chart1: ChartComponent;
  @ViewChild("chart2") chart2: ChartComponent;
  
  public chartOptions:ChartOptions;
   public chartOptions1: ChartOptions1;
   public chartOptions2: ChartOptions2;
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
  
constructor(private http: HttpClient,private dataApi: DataapiService){
  }
  async ngOnInit() {

    await Promise.all([
      this.getglobal(),
      this.getadvdec(),
      this.getetindices(),
      this.getetsectors()
     
      
    ])
    setInterval(() => { this.getetindices() }, 30000);
    setInterval(() => { this.getetsectors() }, 30000);
    setInterval(() => { this.getglobal() }, 30000);
    setInterval(() => { this.getadvdec() }, 30000);
  }
  globalmarket: globalmarkettiles[] = [];

  trackByFunction1(index1, item1) {
    return item1.text1
 }
  // getadvdec() {
   
  //   this.http.get<any>('https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value1?classic=true').subscribe(data5 => {
    
  //     let nestedItems = Object.keys(data5).map(key => {
  //       return data5[key];
  //     });
  //     this.advData.length = 0;
  //     this.decData.length = 0;
  //     this.advLabels.length = 0;
  //     this.mcadvvalue.length=0;
  //     for (let val in nestedItems[1]) {
  //       this.mcadvvalue = [Number(nestedItems[1][val].advValue),Number(nestedItems[1][val].decValue)]
  //       this.mcdecvalue = nestedItems[1][val].decValue
  //       this.advData.push(nestedItems[1][val].decValue)
  //       this.decData.push(nestedItems[1][val].advValue)
        
  //       this.advLabels.push((nestedItems[1][val].curDate).slice(-5).replace('-',':'))
        
       
  //     }
     
      
      
  //     this.chartOptions2 = {
  //       series: this.mcadvvalue,
  //       chart: {
  //         type: "donut"
  //       },
  //       fill: {
  //         type: "gradient"
  //       },
  //       labels: ["Advance", "Decline"],
  //       responsive: [
  //         {
  //           breakpoint: 480,
  //           options: {
  //             chart: {
  //               width: 200
  //             },
  //             legend: {
  //               position: "bottom"
  //             }
  //           }
  //         }
  //       ]
  //     };
    
    
  
  
    
  
     
     
  //   }, err => {
  //     console.log(err)
  //   })
    
  // }
   getadvdec() {
   
    this.http.get<any>('https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value1?classic=true').subscribe(data5 => {
    
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.advData.length = 0;
      this.decData.length = 0;
      this.advLabels.length = 0;
      this.mcadvvalue.length=0;
      for (let val in nestedItems[1]) {
        this.mcadvvalue = [Number(nestedItems[1][val].advValue),Number(nestedItems[1][val].decValue)]
        this.mcdecvalue = nestedItems[1][val].decValue
        this.advData.push(nestedItems[1][val].decValue)
        this.decData.push(nestedItems[1][val].advValue)
        
        this.advLabels.push((nestedItems[1][val].curDate).slice(-5).replace('-',':'))
        
       
      }
     
      
      
      this.chartOptions2 = {
        series: this.mcadvvalue,
        chart: {
          type: "donut"
        },
        fill: {
          type: "gradient"
        },
        labels: ["Advance", "Decline"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    
    
  
  
    
  
     
     
    }, err => {
      console.log(err)
    })
    
  }


  getglobal() {
    this.dataApi.getntglobal().subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
   
    //  this.http.get<any>('https://api.niftytrader.in/webapi/Index/globalStock').subscribe(data5 => {
    
    
      this.globalmarket.length = 0;
      for (let val in nestedItems[0]['resultData']) {
        for (let val1 in nestedItems[0]['resultData'][val]['data']) {
          this.globalmarket.push({ text1: nestedItems[0]['resultData'][val]['data'][val1].symbol,text2:nestedItems[0]['resultData'][val]['data'][val1].country,text3:nestedItems[0]['resultData'][val]['data'][val1].change_per,text4:nestedItems[0]['resultData'][val]['data'][val1].change_value,text5:nestedItems[0]['resultData'][val]['data'][val1].timestamp })
        }
      }
    })
  

  }
 
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
   
    this.chartOptions = {
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
          horizontal: true
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
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + "";
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
    console.log(nestedItems)
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
        height:'500',
       
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
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
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + "";
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
    };
  });

}
}

