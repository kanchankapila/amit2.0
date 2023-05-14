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
  chartList1: Chart[] = [];
  chartList2: Chart[] = [];
  chartList3: Chart[] = [];

 
  time1: string;
  longbuildstockdata:  Array<number> = [];
  longbuildstocklabel:  Array<number> = [];
  lengtha: any;
  time3: any;
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
  this.getmcinsightreadshortcovering(),
  this.getmcinsightreadlongbuild(),
  this.getmcinsightreadshortbuild(),
  this.getmcinsightreadlongunwinding(),
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
  async getmcinsightreadshortcovering() {
    try {
      const data5 = await this.dataApi.getmcinsightread().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
  
      this.time3=new Date(nestedItems[1]['time']).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
      console.log( this.time3)
      for (let val in nestedItems[0]['shortcovering']) {
        const shortcoveringstock = this.stockList.filter(i => i.name === nestedItems[0]['shortcovering'][val].Name)[0]?.mcsymbol;
        const shortcoveringstockname = this.stockList.filter(i => i.name === nestedItems[0]['shortcovering'][val].Name)[0]?.name;
        
        try {
          const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + shortcoveringstock + '&resolution=1D').toPromise();
          const nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
          
          const shortcoveringstockdata = [];
          const shortcoveringstocklabel = [];
        
          if (nestedItems[6][0].hasOwnProperty('value')) {
            for (let val in nestedItems[6]) {
             
              shortcoveringstockdata.push(nestedItems[6][val]['value']);
              shortcoveringstocklabel.push(((new Date(nestedItems[6][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              shortcoveringstockdata.push(nestedItems[5][val]['value']);
              shortcoveringstocklabel.push(((new Date(nestedItems[5][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          }
          const chartContainer = document.getElementById('chart-containershortcovering');

          // create a new wrapper element for the canvas
          const chartWrappershortcovering = document.createElement('div');
          chartWrappershortcovering.classList.add('chart-wrappershortcovering');
          
          const datashortcovering = {
            labels: shortcoveringstocklabel,
            datasets: [{
              label: shortcoveringstockname,
              data: shortcoveringstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
          
          const canvasshortcovering = document.createElement('canvas');
          canvasshortcovering.id = 'chart' + shortcoveringstock;
          canvasshortcovering.width = 300;
          canvasshortcovering.height = 300;
          
          // append the canvas to the new wrapper element
          chartWrappershortcovering.appendChild(canvasshortcovering);
          
          // append the wrapper element to the chart container
          chartContainer.appendChild(chartWrappershortcovering);
          
          const chartshortcovering = new Chart(canvasshortcovering, {
            type: 'line',
            data: datashortcovering,
            options: {
              maintainAspectRatio: true,
              scales: {
                // yAxes: [{
                //   ticks: {
                //     beginAtZero: true
                //   }
                // }]
              }
            }
          });
          
          this.chartList.push(chartshortcovering);
          
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getmcinsightreadlongbuild() {
    try {
      const data5 = await this.dataApi.getmcinsightread().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
  
      
      for (let val in nestedItems[0]['longbuildup']) {
        const longbuildstock = this.stockList.filter(i => i.name === nestedItems[0]['longbuildup'][val].Name)[0]?.mcsymbol;
        const longbuildstockname = this.stockList.filter(i => i.name === nestedItems[0]['longbuildup'][val].Name)[0]?.name;
        
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
              longbuildstocklabel.push(((new Date(nestedItems[6][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              longbuildstockdata.push(nestedItems[5][val]['value']);
              longbuildstocklabel.push(((new Date(nestedItems[5][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          }
          const chartContainer = document.getElementById('chart-containerlongbuild');

          // create a new wrapper element for the canvas
          const chartWrapperlongbuild = document.createElement('div');
          chartWrapperlongbuild.classList.add('chart-wrapperlongbuild');
          
          const datalongbuild = {
            labels: longbuildstocklabel,
            datasets: [{
              label: longbuildstockname,
              data: longbuildstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
          
          const canvaslongbuild = document.createElement('canvas');
          canvaslongbuild.id = 'chart' + longbuildstock;
          canvaslongbuild.width = 300;
          canvaslongbuild.height = 300;
          
          // append the canvas to the new wrapper element
          chartWrapperlongbuild.appendChild(canvaslongbuild);
          
          // append the wrapper element to the chart container
          chartContainer.appendChild(chartWrapperlongbuild);
          
          const chartlongbuild = new Chart(canvaslongbuild, {
            type: 'line',
            data: datalongbuild,
            options: {
              maintainAspectRatio: true,
              scales: {
                // yAxes: [{
                //   ticks: {
                //     beginAtZero: true
                //   }
                // }]
              }
            }
          });
          
          this.chartList1.push(chartlongbuild);
          
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getmcinsightreadshortbuild() {
    try {
      const data5 = await this.dataApi.getmcinsightread().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
  
      
      for (let val in nestedItems[0]['shortbuildup']) {
        const shortbuildstock = this.stockList.filter(i => i.name === nestedItems[0]['shortbuildup'][val].Name)[0]?.mcsymbol;
        const shortbuildstockname = this.stockList.filter(i => i.name === nestedItems[0]['shortbuildup'][val].Name)[0]?.name;
        
        try {
          const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + shortbuildstock + '&resolution=1D').toPromise();
          const nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
        
          const shortbuildstockdata = [];
          const shortbuildstocklabel = [];
          if (nestedItems[6][0].hasOwnProperty('value')) {
            for (let val in nestedItems[6]) {
             
              shortbuildstockdata.push(nestedItems[6][val]['value']);
              shortbuildstocklabel.push(((new Date(nestedItems[6][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              shortbuildstockdata.push(nestedItems[5][val]['value']);
              shortbuildstocklabel.push(((new Date(nestedItems[5][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          }
          const chartContainershortbuild = document.getElementById('chart-containershortbuild');

          // create a new wrapper element for the canvas
          const chartWrappershortbuild = document.createElement('div');
          chartWrappershortbuild.classList.add('chart-wrappershortbuild');
          
          const data = {
            labels: shortbuildstocklabel,
            datasets: [{
              label: shortbuildstockname,
              data: shortbuildstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
          
          const canvasshortbuild = document.createElement('canvas');
          canvasshortbuild.id = 'chart' + shortbuildstock;
          canvasshortbuild.width = 300;
          canvasshortbuild.height = 300;
          
          // append the canvas to the new wrapper element
          chartWrappershortbuild.appendChild(canvasshortbuild);
          
          // append the wrapper element to the chart container
          chartContainershortbuild.appendChild(chartWrappershortbuild);
          
          const chartshortbuild = new Chart(canvasshortbuild, {
            type: 'line',
            data: data,
            options: {
              maintainAspectRatio: true,
              scales: {
                // yAxes: [{
                //   ticks: {
                //     beginAtZero: true
                //   }
                // }]
              }
            }
          });
          
          this.chartList2.push(chartshortbuild);
          
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getmcinsightreadlongunwinding() {
    try {
      const data5 = await this.dataApi.getmcinsightread().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
  
     
      for (let val in nestedItems[0]['longunwinding']) {
        const longunwindingstock = this.stockList.filter(i => i.name === nestedItems[0]['longunwinding'][val].Name)[0]?.mcsymbol;
        const longunwindingstockname = this.stockList.filter(i => i.name === nestedItems[0]['longunwinding'][val].Name)[0]?.name;
        
        try {
          const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + longunwindingstock + '&resolution=1D').toPromise();
          const nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
          
          const longunwindingstockdata = [];
          const longunwindingstocklabel = [];
          if (nestedItems[6][0].hasOwnProperty('value')) {
            for (let val in nestedItems[6]) {
             
              longunwindingstockdata.push(nestedItems[6][val]['value']);
              longunwindingstocklabel.push(((new Date(nestedItems[6][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              longunwindingstockdata.push(nestedItems[5][val]['value']);
              longunwindingstocklabel.push(((new Date(nestedItems[5][val]['time']* 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5));
            }
          }
          const chartContainer = document.getElementById('chart-containerlongunwinding');

          // create a new wrapper element for the canvas
          const chartWrapper = document.createElement('div');
          chartWrapper.classList.add('chart-wrapper');
          
          const data = {
            labels: longunwindingstocklabel,
            datasets: [{
              label: longunwindingstockname,
              data: longunwindingstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
          
          const canvas = document.createElement('canvas');
          canvas.id = 'chart' + longunwindingstock;
          canvas.width = 300;
          canvas.height = 300;
          
          // append the canvas to the new wrapper element
          chartWrapper.appendChild(canvas);
          
          // append the wrapper element to the chart container
          chartContainer.appendChild(chartWrapper);
          
          const chart = new Chart(canvas, {
            type: 'line',
            data: data,
            options: {
              maintainAspectRatio: true,
              scales: {
                // yAxes: [{
                //   ticks: {
                //     beginAtZero: true
                //   }
                // }]
              }
            }
          });
          
          this.chartList3.push(chart);
          
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
 
  }
