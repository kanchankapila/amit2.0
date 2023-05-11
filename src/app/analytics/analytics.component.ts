import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { DataapiService } from '../../dataapi.service';
import { HttpClient } from '@angular/common/http';
import * as  stocks from '../lists/stocklist'
import {  ChartOptions,  ChartType } from 'chart.js';
import { Chart } from 'chart.js';
export interface tldvmstockstile { text1: any; text2: any; text3: any; text4: any; text5: any; text6: any; text7: any; text8: any; }
export interface ttvolumestockstile { text1: any; text2: any; text3: any; text4: any; text5: any; text6: any; text7: any; text8: any; }
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnalyticsComponent implements OnInit{
  chartList: Chart[] = [];

 
  time1: string;
  longbuildstockdata:  Array<number> = [];
  longbuildstocklabel:  Array<number> = [];
  lengtha: any;
  constructor( private dataApi: DataapiService,private http: HttpClient,) {
    
  }
  

  time:any;
  currenttime:any;
  stockList: any;
  tldvmmcsymbol:any;
  ttvolumemcsymbol:any;
  screenercode:any;
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<number> = [];
  tldvmstocks: tldvmstockstile[] = [];
  ttvolumestocks: ttvolumestockstile[] = [];
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
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
 

  async ngOnInit() {
    
  
   
    await Promise.all([
  this.stockList = stocks.default.Data,
  this.gettldvm(),
  this.getttvolume(),
  this.getmcinsightread(),
  this.gettlscreener(this.screenercode)
    ])
   
  }
 
  trackByFunction1(index1, item1) {return item1.text3;}
  trackByFunction2(index2, item2) {return item2.text3;}
  getRandomNumber() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  }
  async gettldvm() {
    try {
      const data5 = await this.dataApi.gettldvm().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
     
      this.tldvmstocks.length=0;
      this.time=new Date(nestedItems[1]['time']).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
      
      for (let val in nestedItems[0][0]['output']) {
        this.tldvmmcsymbol = (this.stockList.filter(i => i.name == nestedItems[0][0]['output'][val].Name)[0].mcsymbol);
        if (this.tldvmmcsymbol == '#N/A') {
          console.error(`No mcsymbol found for name: ${nestedItems[0][0]['obj'][val].Name}. Skipping to next iteration.`);
          continue;
        }
  
        const response = await fetch("https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/" + this.tldvmmcsymbol, {
          method: 'GET',
          headers: {
  
          }
        });
  
        if (response.ok) {
          
          const result = await response.json();
          
          this.tldvmstocks.push({text1:result['data'].pricecurrent,text2:result['data'].pricechange,text3:result['data'].pricepercentchange,text4:result['data'].SC_FULLNM,text5:result['data']['52H'],text6:result['data']['52L'],text7:result['data'].lower_circuit_limit
          ,text8:result['data'].upper_circuit_limit
        })
        
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  async getttvolume() {
    try {
      const data5 = await this.dataApi.getttvolume().toPromise(); // convert Observable to Promise
  
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
      this.time1=new Date(nestedItems[1]['time']).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
      for (let val in nestedItems[0][0]['obj']) {
  
        const ttvolumemcsymbol = this.stockList.filter(i => i.name === nestedItems[0][0]['obj'][val].Name)[0]?.mcsymbol;
        if (ttvolumemcsymbol == '#N/A') {
          console.error(`No mcsymbol found for name: ${nestedItems[0][0]['obj'][val].Name}. Skipping to next iteration.`);
          continue;
        }
       
        const response = await fetch("https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/" + ttvolumemcsymbol, {
          method: 'GET',
          headers: {
  
          }
        });
  
        if (response.ok) {
  
          const result = await response.json();
  
          this.ttvolumestocks.push({
            text1: result['data'].pricecurrent,
            text2: result['data'].pricechange,
            text3: result['data'].pricepercentchange,
            text4: result['data'].SC_FULLNM,
            text5: result['data']['52H'],
            text6: result['data']['52L'],
            text7: result['data'].lower_circuit_limit,
            text8: result['data'].upper_circuit_limit
          });
  
        } else {
          console.error("Failed to fetch data: " + response.statusText);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
    
  async gettlscreener(screenercode) {
    this.screenercode='15697';
    this.dataApi.gettlscreeners(this.screenercode).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
   
      
    
      console.log(nestedItems)
    });
    
  }
  async getmcinsightread() {
    try {
      const data5 = await this.dataApi.getmcinsightread().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
  
      const chartContainer = document.getElementById('chart-container');
      for (let val in nestedItems[0]) {
        const longbuildstock = this.stockList.filter(i => i.name === nestedItems[0][val].Name)[0]?.mcsymbol;
  
        try {
          const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + longbuildstock + '&resolution=1D').toPromise();
          const nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
  
          const longbuildstockdata = [];
          const longbuildstocklabel = [];
          if (nestedItems[6][0].hasOwnProperty('value')) {
            for (let val in nestedItems[6]) {
              longbuildstockdata.push(nestedItems[6][val]['value']);
              longbuildstocklabel.push(nestedItems[6][val]['time']);
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              longbuildstockdata.push(nestedItems[5][val]['value']);
              longbuildstocklabel.push(nestedItems[5][val]['time']);
            }
          }
  
          const data = {
            labels: longbuildstocklabel,
            datasets: [{
              label: 'Dataset ' + longbuildstock,
              data: longbuildstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
  
          const canvas = document.createElement('canvas');
          canvas.id = 'chart' + longbuildstock;
          canvas.width = 400;
          canvas.height = 400;
  
          chartContainer.appendChild(canvas);
  
          const chart = new Chart(canvas, {
            type: 'line',
            data: data,
            options: {
              scales: {
                // yAxes: [{
                //   ticks: {
                //     beginAtZero: true
                //   }
                // }]
              }
            }
          });
  
          this.chartList.push(chart);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  
 
  }
