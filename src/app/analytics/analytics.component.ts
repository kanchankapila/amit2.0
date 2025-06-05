<<<<<<< Updated upstream
import { Component , ViewEncapsulation, OnInit } from '@angular/core';
import { DataapiService } from '../../dataapi.service';
import { HttpClient } from '@angular/common/http';
import * as  stocks from '../lists/stocklist'
import { ChartOptions, ChartType } from 'chart.js';
import { Chart } from 'chart.js';
=======
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DataApiService } from '../core/services/data-api.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

>>>>>>> Stashed changes
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
<<<<<<< Updated upstream
  encapsulation: ViewEncapsulation.None,
 
})
export class AnalyticsComponent implements OnInit {
  tlchartList: Chart[] = [];
  tlchartList1: Chart[] = [];
  chartList: Chart[] = [];
  chartList1: Chart[] = [];
  chartList2: Chart[] = [];
  chartList3: Chart[] = [];
  time1: string;
  longbuildstockdata: Array<number> = [];
  longbuildstocklabel: Array<number> = [];
  lengtha: any;
  time3: any;
  tldvmmcname: any;
  constructor(private dataApi: DataapiService, private http: HttpClient,) {
  }
  time: any;
  currenttime: any;
  stockList: any;
  tldvmmcsymbol: any;
  ttvolumemcsymbol: any;
  screenercode: any;
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<number> = [];
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
    await Promise.all([
      this.stockList = stocks.default.Data,
     
      //  this.getTlScreeners(this.screenercode),
      this.getntvolume1()
    ])
    { setInterval(() => { this.getntvolume1() }, 60000); }
   
    // setInterval(() => { this.getntvolumeread() }, 125000);
  }
  displayMaximizable1: boolean;
  showMaximizableDialog1() {
    this.displayMaximizable1 = true;
    this.getmcinsightreadlongbuildup()
  }
  displayMaximizable2: boolean;
  showMaximizableDialog2() {
    this.displayMaximizable2 = true;
    this.getmcinsightreadshortcovering()
  }
  displayMaximizable3: boolean;
  showMaximizableDialog3() {
    this.displayMaximizable3 = true;
    this.getmcinsightreadshortbuildup()
  }
  displayMaximizable4: boolean;
  showMaximizableDialog4() {
    this.displayMaximizable4 = true;
    this.gettldvm()
  }
  displayMaximizable5: boolean;
  showMaximizableDialog5() {
    this.displayMaximizable5 = true;
    this.getTtVolume()
  }
  displayMaximizable6: boolean;
  showMaximizableDialog6() {
    this.displayMaximizable6 = true;
    this.getntvolume1()
    this.getntvolumeread()
  }
  
  getRandomNumber() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  }
  async gettldvm() {
    this.screenercode = '9818'
    const data5 = await this.dataApi.getTlScreeners(this.screenercode).toPromise();
    const nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });

    const tlcardprice = [];
    const tlcardpricecolor = [];
    const tlcardshareholding = [];
    const tlcardshareholdingcolor = [];
    try {
      for (const val in nestedItems[0]['body']['tableData']) {
        const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
        const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.name;
        if (tlscreenerstock !== '#N/A') {
          try {
            const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
            const nestedItems1 = Object.keys(data6).map(key => {
              return data6[key];
            });
            const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
            const nestedItems = Object.keys(data5).map(key => {
              return data5[key];
            });
            const tlselectedstockdata = [];
            const tlselectedstocklabel = [];
            if (nestedItems[6][0].hasOwnProperty('value')) {
              for (const val in nestedItems[6]) {
                tlselectedstockdata.push(nestedItems[6][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else if (nestedItems[5][0].hasOwnProperty('value')) {
              for (const val in nestedItems[5]) {
                tlselectedstockdata.push(nestedItems[5][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else {
              console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
              continue;
            }
            const tlchartContainer = document.getElementById('chart-containertldvmstock');
            // create a new card element
            const tlcard = document.createElement('div');
            tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
            const maximiseButton = document.createElement('button');
            maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
            maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
            maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            const exitFullscreenButton = document.createElement('button');
            exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
            exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
            exitFullscreenButton.style.display = 'none'; // Hide the button initially
            exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            // Append the maximise and exit fullscreen buttons to the card body
            tlcard.appendChild(maximiseButton);
            tlcard.appendChild(exitFullscreenButton);
            // create a card body
            const tlcardBody = document.createElement('div');
            tlcardBody.classList.add('card-body');
            // create a card title
            const tlcardTitle = document.createElement('h5');
            tlcardTitle.classList.add('card-title');
            tlcardTitle.innerText = tlscreenerstockname;
            // append the card title to the card body
            tlcardBody.appendChild(tlcardTitle);
            // create a new wrapper element for the canvas
            const tlchartWrapper = document.createElement('div');
            tlchartWrapper.classList.add('tlchart-wrapper');
            const tldata = {
              labels: tlselectedstocklabel,
              datasets: [{
                label: tlscreenerstockname,
                data: tlselectedstockdata,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            };
            const tlcanvas = document.createElement('canvas');
            tlcanvas.id = 'chart' + tlscreenerstock;
            tlcanvas.width = 300;
            tlcanvas.height = 300;
            // append the canvas to the new wrapper element
            tlchartWrapper.appendChild(tlcanvas);
            // append the wrapper element to the card body
            tlcardBody.appendChild(tlchartWrapper);
            // create tlcardPrice element
            tlcardprice.length = 0; // Clear the tlcardprice array
            tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
            tlcardshareholding.length = 0; // Clear the tlcardshareholding array
            tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
            for (const val1 in nestedItems1[1]['insightData']['price']) {
              tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
              tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
            }
            for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
              tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
              tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
            }
            // const tlcardBody = document.createElement('div');
            for (let i = 0; i < tlcardprice.length; i++) {
              const tlcardPrice = document.createElement('div');
              tlcardPrice.innerText = tlcardprice[i];
              if (tlcardpricecolor[i] === 'positive') {
                tlcardPrice.style.color = 'green';
              } else if (tlcardpricecolor[i] === 'neutral') {
                tlcardPrice.style.color = 'blue';
              } else if (tlcardpricecolor[i] === 'negative') {
                tlcardPrice.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardPrice);
            }
            for (let i = 0; i < tlcardshareholding.length; i++) {
              const tlcardShareholding = document.createElement('div');
              tlcardShareholding.innerText = tlcardshareholding[i];
              if (tlcardshareholdingcolor[i] === 'positive') {
                tlcardShareholding.style.color = 'green';
              } else if (tlcardshareholdingcolor[i] === 'neutral') {
                tlcardShareholding.style.color = 'blue';
              } else if (tlcardshareholdingcolor[i] === 'negative') {
                tlcardShareholding.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardShareholding);
            }
            // Append the card body to the card
            tlcard.appendChild(tlcardBody);
            // append the card to the chart container
            tlchartContainer.appendChild(tlcard);
            const tlchart = new Chart(tlcanvas, {
              type: 'line',
              data: tldata,
              options: {
                maintainAspectRatio: true,
                scales: {}
              }
            });
            this.tlchartList.push(tlchart);
          } catch (err) {
            console.error(err);
          }
        } else {
          console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
          continue;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  toggleFullscreen(element) {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error(err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
 
  async getTtVolume() {
    try {
      const data5 = await this.dataApi.getTtVolume().toPromise(); // convert Observable to Promise
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      console.log(nestedItems)
      const tlcardprice = [];
      const tlcardpricecolor = [];
      const tlcardshareholding = [];
      const tlcardshareholdingcolor = [];
      this.time1 = new Date(nestedItems[1]).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      for (const val in nestedItems[0]) {
        const ttvolumemcsymbol = this.stockList.filter(i => i.name === nestedItems[0][val].Name)[0]?.mcsymbol;
        const ttvolumemcname = this.stockList.filter(i => i.name === nestedItems[0][val].Name)[0]?.name;
        if (ttvolumemcsymbol == '#N/A') {
          console.error(`No mcsymbol found for name: ${nestedItems[0][val].Name}. Skipping to next iteration.`);
          continue;
        }
        try {
          const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + ttvolumemcsymbol + '&type=d').toPromise();
          const nestedItems1 = Object.keys(data6).map(key => {
            return data6[key];
          });
          const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + ttvolumemcsymbol + '&resolution=1D').toPromise();
          const nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
          const ttvolumemcstockdata = [];
          const ttvolumemcstocklabel = [];
          if (nestedItems[6][0].hasOwnProperty('value')) {
            for (const val in nestedItems[6]) {
              ttvolumemcstockdata.push(nestedItems[6][val]['value']);
              ttvolumemcstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (const val in nestedItems[5]) {
              ttvolumemcstockdata.push(nestedItems[5][val]['value']);
              ttvolumemcstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else {
            console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
            continue;
          }
          const tlchartContainer = document.getElementById('chart-containerttvolbo');
          // create a new card element
          const tlcard = document.createElement('div');
          tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
          const maximiseButton = document.createElement('button');
          maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
          maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
          maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
          const exitFullscreenButton = document.createElement('button');
          exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
          exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
          exitFullscreenButton.style.display = 'none'; // Hide the button initially
          exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
          // Append the maximise and exit fullscreen buttons to the card body
          tlcard.appendChild(maximiseButton);
          tlcard.appendChild(exitFullscreenButton);
          // create a card body
          const tlcardBody = document.createElement('div');
          tlcardBody.classList.add('card-body');
          // create a card title
          const tlcardTitle = document.createElement('h5');
          tlcardTitle.classList.add('card-title');
          tlcardTitle.innerText = ttvolumemcname;
          // append the card title to the card body
          tlcardBody.appendChild(tlcardTitle);
          // create a new wrapper element for the canvas
          const tlchartWrapper = document.createElement('div');
          tlchartWrapper.classList.add('tlchart-wrapper');
          const tldata = {
            labels: ttvolumemcstocklabel,
            datasets: [{
              label: ttvolumemcname,
              data: ttvolumemcstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
          const tlcanvas = document.createElement('canvas');
          tlcanvas.id = 'chart' + ttvolumemcname;
          tlcanvas.width = 300;
          tlcanvas.height = 300;
          // append the canvas to the new wrapper element
          tlchartWrapper.appendChild(tlcanvas);
          // append the wrapper element to the card body
          tlcardBody.appendChild(tlchartWrapper);
          // create tlcardPrice element
          tlcardprice.length = 0; // Clear the tlcardprice array
          tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
          tlcardshareholding.length = 0; // Clear the tlcardshareholding array
          tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
         
          for (const val1 in nestedItems1[1]['insightData']['price']) {
            tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
            tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
          }
          for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
            tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
            tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
          }
          // const tlcardBody = document.createElement('div');
          for (let i = 0; i < tlcardprice.length; i++) {
            const tlcardPrice = document.createElement('div');
            tlcardPrice.innerText = tlcardprice[i];
            if (tlcardpricecolor[i] === 'positive') {
              tlcardPrice.style.color = 'green';
            } else if (tlcardpricecolor[i] === 'neutral') {
              tlcardPrice.style.color = 'blue';
            } else if (tlcardpricecolor[i] === 'negative') {
              tlcardPrice.style.color = 'red';
            }
            tlcardBody.appendChild(tlcardPrice);
          }
          for (let i = 0; i < tlcardshareholding.length; i++) {
            const tlcardShareholding = document.createElement('div');
            tlcardShareholding.innerText = tlcardshareholding[i];
            if (tlcardshareholdingcolor[i] === 'positive') {
              tlcardShareholding.style.color = 'green';
            } else if (tlcardshareholdingcolor[i] === 'neutral') {
              tlcardShareholding.style.color = 'blue';
            } else if (tlcardshareholdingcolor[i] === 'negative') {
              tlcardShareholding.style.color = 'red';
            }
            tlcardBody.appendChild(tlcardShareholding);
          }
          // Append the card body to the card
          tlcard.appendChild(tlcardBody);
          // append the card to the chart container
          tlchartContainer.appendChild(tlcard);
          const tlchart = new Chart(tlcanvas, {
            type: 'line',
            data: tldata,
            options: {
              maintainAspectRatio: true,
              scales: {}
            }
          });
          this.tlchartList.push(tlchart);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  async gettlscreener(screenercode) {
    this.screenercode = '208626';
    this.dataApi.getTlScreeners(this.screenercode).subscribe(data5 => {
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      console.log(nestedItems)
    });
  }
  async getmcinsightreadshortcovering() {
    this.screenercode = '208625'
    const data5 = await this.dataApi.getTlScreeners(this.screenercode).toPromise();
    const nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    const tlcardprice = [];
    const tlcardpricecolor = [];
    const tlcardshareholding = [];
    const tlcardshareholdingcolor = [];
    try {
      for (const val in nestedItems[0]['body']['tableData']) {
        const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
        const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.name;
        if (tlscreenerstock !== '#N/A') {
          try {
            const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
            const nestedItems1 = Object.keys(data6).map(key => {
              return data6[key];
            });
            const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
            const nestedItems = Object.keys(data5).map(key => {
              return data5[key];
            });
            const tlselectedstockdata = [];
            const tlselectedstocklabel = [];
            if (nestedItems[6][0].hasOwnProperty('value')) {
              for (const val in nestedItems[6]) {
                tlselectedstockdata.push(nestedItems[6][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else if (nestedItems[5][0].hasOwnProperty('value')) {
              for (const val in nestedItems[5]) {
                tlselectedstockdata.push(nestedItems[5][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else {
              console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
              continue;
            }
            const tlchartContainer = document.getElementById('chart-containershortcovering');
            // create a new card element
            const tlcard = document.createElement('div');
            tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
            const maximiseButton = document.createElement('button');
            maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
            maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
            maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            const exitFullscreenButton = document.createElement('button');
            exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
            exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
            exitFullscreenButton.style.display = 'none'; // Hide the button initially
            exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            // Append the maximise and exit fullscreen buttons to the card body
            tlcard.appendChild(maximiseButton);
            tlcard.appendChild(exitFullscreenButton);
            // create a card body
            const tlcardBody = document.createElement('div');
            tlcardBody.classList.add('card-body');
            // create a card title
            const tlcardTitle = document.createElement('h5');
            tlcardTitle.classList.add('card-title');
            tlcardTitle.innerText = tlscreenerstockname;
            // append the card title to the card body
            tlcardBody.appendChild(tlcardTitle);
            // create a new wrapper element for the canvas
            const tlchartWrapper = document.createElement('div');
            tlchartWrapper.classList.add('tlchart-wrapper');
            const tldata = {
              labels: tlselectedstocklabel,
              datasets: [{
                label: tlscreenerstockname,
                data: tlselectedstockdata,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            };
            const tlcanvas = document.createElement('canvas');
            tlcanvas.id = 'chart' + tlscreenerstock;
            tlcanvas.width = 300;
            tlcanvas.height = 300;
            // append the canvas to the new wrapper element
            tlchartWrapper.appendChild(tlcanvas);
            // append the wrapper element to the card body
            tlcardBody.appendChild(tlchartWrapper);
            // create tlcardPrice element
            tlcardprice.length = 0; // Clear the tlcardprice array
            tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
            tlcardshareholding.length = 0; // Clear the tlcardshareholding array
            tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
          
            for (const val1 in nestedItems1[1]['insightData']['price']) {
              tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
              tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
            }
            for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
              tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
              tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
            }
            // const tlcardBody = document.createElement('div');
            for (let i = 0; i < tlcardprice.length; i++) {
              const tlcardPrice = document.createElement('div');
              tlcardPrice.innerText = tlcardprice[i];
              if (tlcardpricecolor[i] === 'positive') {
                tlcardPrice.style.color = 'green';
              } else if (tlcardpricecolor[i] === 'neutral') {
                tlcardPrice.style.color = 'blue';
              } else if (tlcardpricecolor[i] === 'negative') {
                tlcardPrice.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardPrice);
            }
            for (let i = 0; i < tlcardshareholding.length; i++) {
              const tlcardShareholding = document.createElement('div');
              tlcardShareholding.innerText = tlcardshareholding[i];
              if (tlcardshareholdingcolor[i] === 'positive') {
                tlcardShareholding.style.color = 'green';
              } else if (tlcardshareholdingcolor[i] === 'neutral') {
                tlcardShareholding.style.color = 'blue';
              } else if (tlcardshareholdingcolor[i] === 'negative') {
                tlcardShareholding.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardShareholding);
            }
            // Append the card body to the card
            tlcard.appendChild(tlcardBody);
            // append the card to the chart container
            tlchartContainer.appendChild(tlcard);
            const tlchart = new Chart(tlcanvas, {
              type: 'line',
              data: tldata,
              options: {
                maintainAspectRatio: true,
                scales: {}
              }
            });
            this.tlchartList.push(tlchart);
          } catch (err) {
            console.error(err);
          }
        } else {
          console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
          continue;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getmcinsightreadlongbuildup() {
    this.screenercode = '208626'
    const data5 = await this.dataApi.getTlScreeners(this.screenercode).toPromise();
    const nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    const tlcardprice = [];
    const tlcardpricecolor = [];
    const tlcardshareholding = [];
    const tlcardshareholdingcolor = [];
    try {
      for (const val in nestedItems[0]['body']['tableData']) {
        const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
        const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.name;
        if (tlscreenerstock !== '#N/A') {
          try {
            const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
            const nestedItems1 = Object.keys(data6).map(key => {
              return data6[key];
            });
            const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
            const nestedItems = Object.keys(data5).map(key => {
              return data5[key];
            });
            const tlselectedstockdata = [];
            const tlselectedstocklabel = [];
            if (nestedItems[6][0].hasOwnProperty('value')) {
              for (const val in nestedItems[6]) {
                tlselectedstockdata.push(nestedItems[6][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else if (nestedItems[5][0].hasOwnProperty('value')) {
              for (const val in nestedItems[5]) {
                tlselectedstockdata.push(nestedItems[5][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else {
              console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
              continue;
            }
            const tlchartContainer = document.getElementById('chart-containerlongbuildup');
            // create a new card element
            const tlcard = document.createElement('div');
            tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
            const maximiseButton = document.createElement('button');
            maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
            maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
            maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            const exitFullscreenButton = document.createElement('button');
            exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
            exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
            exitFullscreenButton.style.display = 'none'; // Hide the button initially
            exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            // Append the maximise and exit fullscreen buttons to the card body
            tlcard.appendChild(maximiseButton);
            tlcard.appendChild(exitFullscreenButton);
            // create a card body
            const tlcardBody = document.createElement('div');
            tlcardBody.classList.add('card-body');
            // create a card title
            const tlcardTitle = document.createElement('h5');
            tlcardTitle.classList.add('card-title');
            tlcardTitle.innerText = tlscreenerstockname;
            // append the card title to the card body
            tlcardBody.appendChild(tlcardTitle);
            // create a new wrapper element for the canvas
            const tlchartWrapper = document.createElement('div');
            tlchartWrapper.classList.add('tlchart-wrapper');
            const tldata = {
              labels: tlselectedstocklabel,
              datasets: [{
                label: tlscreenerstockname,
                data: tlselectedstockdata,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            };
            const tlcanvas = document.createElement('canvas');
            tlcanvas.id = 'chart' + tlscreenerstock;
            tlcanvas.width = 300;
            tlcanvas.height = 300;
            // append the canvas to the new wrapper element
            tlchartWrapper.appendChild(tlcanvas);
            // append the wrapper element to the card body
            tlcardBody.appendChild(tlchartWrapper);
            // create tlcardPrice element
            tlcardprice.length = 0; // Clear the tlcardprice array
            tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
            tlcardshareholding.length = 0; // Clear the tlcardshareholding array
            tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
           
            for (const val1 in nestedItems1[1]['insightData']['price']) {
              tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
              tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
            }
            for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
              tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
              tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
            }
            // const tlcardBody = document.createElement('div');
            for (let i = 0; i < tlcardprice.length; i++) {
              const tlcardPrice = document.createElement('div');
              tlcardPrice.innerText = tlcardprice[i];
              if (tlcardpricecolor[i] === 'positive') {
                tlcardPrice.style.color = 'green';
              } else if (tlcardpricecolor[i] === 'neutral') {
                tlcardPrice.style.color = 'blue';
              } else if (tlcardpricecolor[i] === 'negative') {
                tlcardPrice.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardPrice);
            }
            for (let i = 0; i < tlcardshareholding.length; i++) {
              const tlcardShareholding = document.createElement('div');
              tlcardShareholding.innerText = tlcardshareholding[i];
              if (tlcardshareholdingcolor[i] === 'positive') {
                tlcardShareholding.style.color = 'green';
              } else if (tlcardshareholdingcolor[i] === 'neutral') {
                tlcardShareholding.style.color = 'blue';
              } else if (tlcardshareholdingcolor[i] === 'negative') {
                tlcardShareholding.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardShareholding);
            }
            // Append the card body to the card
            tlcard.appendChild(tlcardBody);
            // append the card to the chart container
            tlchartContainer.appendChild(tlcard);
            const tlchart = new Chart(tlcanvas, {
              type: 'line',
              data: tldata,
              options: {
                maintainAspectRatio: true,
                scales: {}
              }
            });
            this.tlchartList.push(tlchart);
          } catch (err) {
            console.error(err);
          }
        } else {
          console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
          continue;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getmcinsightreadshortbuildup() {
    this.screenercode = '208631'
    const data5 = await this.dataApi.getTlScreeners(this.screenercode).toPromise();
    const nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    const tlcardprice = [];
    const tlcardpricecolor = [];
    const tlcardshareholding = [];
    const tlcardshareholdingcolor = [];
    try {
      for (const val in nestedItems[0]['body']['tableData']) {
        const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
        const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.name;
        if (tlscreenerstock !== '#N/A') {
          try {
            const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
            const nestedItems1 = Object.keys(data6).map(key => {
              return data6[key];
            });
            const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
            const nestedItems = Object.keys(data5).map(key => {
              return data5[key];
            });
            const tlselectedstockdata = [];
            const tlselectedstocklabel = [];
            if (nestedItems[6][0].hasOwnProperty('value')) {
              for (const val in nestedItems[6]) {
                tlselectedstockdata.push(nestedItems[6][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else if (nestedItems[5][0].hasOwnProperty('value')) {
              for (const val in nestedItems[5]) {
                tlselectedstockdata.push(nestedItems[5][val]['value']);
                tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else {
              console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
              continue;
            }
            const tlchartContainer = document.getElementById('chart-containershortbuildup');
            // create a new card element
            const tlcard = document.createElement('div');
            tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
            const maximiseButton = document.createElement('button');
            maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
            maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
            maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            const exitFullscreenButton = document.createElement('button');
            exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
            exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
            exitFullscreenButton.style.display = 'none'; // Hide the button initially
            exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
            // Append the maximise and exit fullscreen buttons to the card body
            tlcard.appendChild(maximiseButton);
            tlcard.appendChild(exitFullscreenButton);
            // create a card body
            const tlcardBody = document.createElement('div');
            tlcardBody.classList.add('card-body');
            // create a card title
            const tlcardTitle = document.createElement('h5');
            tlcardTitle.classList.add('card-title');
            tlcardTitle.innerText = tlscreenerstockname;
            // append the card title to the card body
            tlcardBody.appendChild(tlcardTitle);
            // create a new wrapper element for the canvas
            const tlchartWrapper = document.createElement('div');
            tlchartWrapper.classList.add('tlchart-wrapper');
            const tldata = {
              labels: tlselectedstocklabel,
              datasets: [{
                label: tlscreenerstockname,
                data: tlselectedstockdata,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            };
            const tlcanvas = document.createElement('canvas');
            tlcanvas.id = 'chart' + tlscreenerstock;
            tlcanvas.width = 300;
            tlcanvas.height = 300;
            // append the canvas to the new wrapper element
            tlchartWrapper.appendChild(tlcanvas);
            // append the wrapper element to the card body
            tlcardBody.appendChild(tlchartWrapper);
            // create tlcardPrice element
            tlcardprice.length = 0; // Clear the tlcardprice array
            tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
            tlcardshareholding.length = 0; // Clear the tlcardshareholding array
            tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
          
            for (const val1 in nestedItems1[1]['insightData']['price']) {
              tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
              tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
            }
            for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
              tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
              tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
            }
            // const tlcardBody = document.createElement('div');
            for (let i = 0; i < tlcardprice.length; i++) {
              const tlcardPrice = document.createElement('div');
              tlcardPrice.innerText = tlcardprice[i];
              if (tlcardpricecolor[i] === 'positive') {
                tlcardPrice.style.color = 'green';
              } else if (tlcardpricecolor[i] === 'neutral') {
                tlcardPrice.style.color = 'blue';
              } else if (tlcardpricecolor[i] === 'negative') {
                tlcardPrice.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardPrice);
            }
            for (let i = 0; i < tlcardshareholding.length; i++) {
              const tlcardShareholding = document.createElement('div');
              tlcardShareholding.innerText = tlcardshareholding[i];
              if (tlcardshareholdingcolor[i] === 'positive') {
                tlcardShareholding.style.color = 'green';
              } else if (tlcardshareholdingcolor[i] === 'neutral') {
                tlcardShareholding.style.color = 'blue';
              } else if (tlcardshareholdingcolor[i] === 'negative') {
                tlcardShareholding.style.color = 'red';
              }
              tlcardBody.appendChild(tlcardShareholding);
            }
            // Append the card body to the card
            tlcard.appendChild(tlcardBody);
            // append the card to the chart container
            tlchartContainer.appendChild(tlcard);
            const tlchart = new Chart(tlcanvas, {
              type: 'line',
              data: tldata,
              options: {
                maintainAspectRatio: true,
                scales: {}
              }
            });
            this.tlchartList.push(tlchart);
          } catch (err) {
            console.error(err);
          }
        } else {
          console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
          continue;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  // async getmcinsightreadlongunwinding() {
  //   this.screenercode = '208631'
  //   const data5 = await this.dataApi.getTlScreenerss(this.screenercode).toPromise();
  //   const nestedItems = Object.keys(data5).map(key => {
  //     return data5[key];
  //   });
  //   const tlcardprice = [];
  //   const tlcardpricecolor = [];
  //   const tlcardshareholding = [];
  //   const tlcardshareholdingcolor = [];
  //   try {
  //     for (const val in nestedItems[0]['body']['tableData']) {
  //       const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
  //       const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][2]).replace('Ltd.', 'Limited')))[0]?.name;
  //       if (tlscreenerstock !== '#N/A') {
  //         try {
  //           const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
  //           const nestedItems1 = Object.keys(data6).map(key => {
  //             return data6[key];
  //           });
  //           const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
  //           const nestedItems = Object.keys(data5).map(key => {
  //             return data5[key];
  //           });
  //           const tlselectedstockdata = [];
  //           const tlselectedstocklabel = [];
  //           if (nestedItems[6][0].hasOwnProperty('value')) {
  //             for (const val in nestedItems[6]) {
  //               tlselectedstockdata.push(nestedItems[6][val]['value']);
  //               tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
  //             }
  //           } else if (nestedItems[5][0].hasOwnProperty('value')) {
  //             for (const val in nestedItems[5]) {
  //               tlselectedstockdata.push(nestedItems[5][val]['value']);
  //               tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
  //             }
  //           } else {
  //             console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
  //             continue;
  //           }
  //           const tlchartContainer = document.getElementById('chart-containershortbuildup');
  //           // create a new card element
  //           const tlcard = document.createElement('div');
  //           tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
  //           const maximiseButton = document.createElement('button');
  //           maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
  //           maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
  //           maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
  //           const exitFullscreenButton = document.createElement('button');
  //           exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
  //           exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
  //           exitFullscreenButton.style.display = 'none'; // Hide the button initially
  //           exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
  //           // Append the maximise and exit fullscreen buttons to the card body
  //           tlcard.appendChild(maximiseButton);
  //           tlcard.appendChild(exitFullscreenButton);
  //           // create a card body
  //           const tlcardBody = document.createElement('div');
  //           tlcardBody.classList.add('card-body');
  //           // create a card title
  //           const tlcardTitle = document.createElement('h5');
  //           tlcardTitle.classList.add('card-title');
  //           tlcardTitle.innerText = tlscreenerstockname;
  //           // append the card title to the card body
  //           tlcardBody.appendChild(tlcardTitle);
  //           // create a new wrapper element for the canvas
  //           const tlchartWrapper = document.createElement('div');
  //           tlchartWrapper.classList.add('tlchart-wrapper');
  //           const tldata = {
  //             labels: tlselectedstocklabel,
  //             datasets: [{
  //               label: tlscreenerstockname,
  //               data: tlselectedstockdata,
  //               backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //               borderColor: 'rgba(255, 99, 132, 1)',
  //               borderWidth: 1
  //             }]
  //           };
  //           const tlcanvas = document.createElement('canvas');
  //           tlcanvas.id = 'chart' + tlscreenerstock;
  //           tlcanvas.width = 300;
  //           tlcanvas.height = 300;
  //           // append the canvas to the new wrapper element
  //           tlchartWrapper.appendChild(tlcanvas);
  //           // append the wrapper element to the card body
  //           tlcardBody.appendChild(tlchartWrapper);
  //           // create tlcardPrice element
  //           tlcardprice.length = 0; // Clear the tlcardprice array
  //           tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
  //           tlcardshareholding.length = 0; // Clear the tlcardshareholding array
  //           tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
          
  //           for (const val1 in nestedItems1[1]['insightData']['price']) {
  //             tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
  //             tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
  //           }
  //           for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
  //             tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
  //             tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
  //           }
  //           // const tlcardBody = document.createElement('div');
  //           for (let i = 0; i < tlcardprice.length; i++) {
  //             const tlcardPrice = document.createElement('div');
  //             tlcardPrice.innerText = tlcardprice[i];
  //             if (tlcardpricecolor[i] === 'positive') {
  //               tlcardPrice.style.color = 'green';
  //             } else if (tlcardpricecolor[i] === 'neutral') {
  //               tlcardPrice.style.color = 'blue';
  //             } else if (tlcardpricecolor[i] === 'negative') {
  //               tlcardPrice.style.color = 'red';
  //             }
  //             tlcardBody.appendChild(tlcardPrice);
  //           }
  //           for (let i = 0; i < tlcardshareholding.length; i++) {
  //             const tlcardShareholding = document.createElement('div');
  //             tlcardShareholding.innerText = tlcardshareholding[i];
  //             if (tlcardshareholdingcolor[i] === 'positive') {
  //               tlcardShareholding.style.color = 'green';
  //             } else if (tlcardshareholdingcolor[i] === 'neutral') {
  //               tlcardShareholding.style.color = 'blue';
  //             } else if (tlcardshareholdingcolor[i] === 'negative') {
  //               tlcardShareholding.style.color = 'red';
  //             }
  //             tlcardBody.appendChild(tlcardShareholding);
  //           }
  //           // Append the card body to the card
  //           tlcard.appendChild(tlcardBody);
  //           // append the card to the chart container
  //           tlchartContainer.appendChild(tlcard);
  //           const tlchart = new Chart(tlcanvas, {
  //             type: 'line',
  //             data: tldata,
  //             options: {
  //               maintainAspectRatio: true,
  //               scales: {}
  //             }
  //           });
  //           this.tlchartList.push(tlchart);
  //         } catch (err) {
  //           console.error(err);
  //         }
  //       } else {
  //         console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
  //         continue;
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  
  // }
  async getntvolume1() {
    console.log("NT Volume is hit!!! on analytic components")
    const data6 = await this.http.get('https://stockinsights.netlify.app/.netlify/functions/ntvolume').toPromise();
    const nestedItems = Object.keys(data6).map(key => {
      return data6[key];
    });
    console.log(nestedItems)
  }
  async getntvolumeread() {
    try {
      const data5 = await this.dataApi.getNtVolumeRead().toPromise(); // convert Observable to Promise
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      const tlcardprice = [];
      const tlcardpricecolor = [];
      const tlcardshareholding = [];
      const tlcardshareholdingcolor = [];
      this.time1 = new Date(nestedItems[1]).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      for (const val in nestedItems[0]) {
        // console.log(nestedItems[val].name)
        const ntvolumemcsymbol = this.stockList.filter(i => i.symbol === nestedItems[0][val].symbol)[0]?.mcsymbol;
        const ntvolumemcname = this.stockList.filter(i => i.symbol === nestedItems[0][val].symbol)[0]?.name;
        if (ntvolumemcsymbol == '#N/A') {
          console.error(`No mcsymbol found for name: ${nestedItems[0][val].symbol}. Skipping to next iteration.`);
          continue;
        }
        try {
          const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + ntvolumemcsymbol + '&type=d').toPromise();
          const nestedItems1 = Object.keys(data6).map(key => {
            return data6[key];
          });
          const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + ntvolumemcsymbol + '&resolution=1D').toPromise();
          const nestedItems = Object.keys(data5).map(key => {
            return data5[key];
          });
          const ntvolumemcstockdata = [];
          const ntvolumemcstocklabel = [];
          if (nestedItems[6][0].hasOwnProperty('value')) {
            for (const val in nestedItems[6]) {
              ntvolumemcstockdata.push(nestedItems[6][val]['value']);
              ntvolumemcstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (const val in nestedItems[5]) {
              ntvolumemcstockdata.push(nestedItems[5][val]['value']);
              ntvolumemcstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else {
            console.log(nestedItems[0]['body']['tableData'][val][2] + "not found")
            continue;
          }
          const tlchartContainer = document.getElementById('chart-containerntvolbo');
          // create a new card element
          const tlcard = document.createElement('div');
          tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
          const maximiseButton = document.createElement('button');
          maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
          maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
          maximiseButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
          const exitFullscreenButton = document.createElement('button');
          exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
          exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
          exitFullscreenButton.style.display = 'none'; // Hide the button initially
          exitFullscreenButton.addEventListener('click', () => this.toggleFullscreen(tlcard));
          // Append the maximise and exit fullscreen buttons to the card body
          tlcard.appendChild(maximiseButton);
          tlcard.appendChild(exitFullscreenButton);
          // create a card body
          const tlcardBody = document.createElement('div');
          tlcardBody.classList.add('card-body');
          // create a card title
          const tlcardTitle = document.createElement('h5');
          tlcardTitle.classList.add('card-title');
          tlcardTitle.innerText = ntvolumemcname;
          // append the card title to the card body
          tlcardBody.appendChild(tlcardTitle);
          // create a new wrapper element for the canvas
          const tlchartWrapper = document.createElement('div');
          tlchartWrapper.classList.add('tlchart-wrapper');
          const tldata = {
            labels: ntvolumemcstocklabel,
            datasets: [{
              label: ntvolumemcname,
              data: ntvolumemcstockdata,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };
          const tlcanvas = document.createElement('canvas');
          tlcanvas.id = 'chart' + ntvolumemcname;
          tlcanvas.width = 300;
          tlcanvas.height = 300;
          // append the canvas to the new wrapper element
          tlchartWrapper.appendChild(tlcanvas);
          // append the wrapper element to the card body
          tlcardBody.appendChild(tlchartWrapper);
          // create tlcardPrice element
          tlcardprice.length = 0; // Clear the tlcardprice array
          tlcardshareholdingcolor.length = 0; // Clear the tlcardshareholdingcolor array
          tlcardshareholding.length = 0; // Clear the tlcardshareholding array
          tlcardpricecolor.length = 0; // Clear the tlcardpricecolor array
         
          for (const val1 in nestedItems1[1]['insightData']['price']) {
            tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
            tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
          }
          for (const val2 in nestedItems1[1]['insightData']['shareholding']) {
            tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
            tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
          }
          // const tlcardBody = document.createElement('div');
          for (let i = 0; i < tlcardprice.length; i++) {
            const tlcardPrice = document.createElement('div');
            tlcardPrice.innerText = tlcardprice[i];
            if (tlcardpricecolor[i] === 'positive') {
              tlcardPrice.style.color = 'green';
            } else if (tlcardpricecolor[i] === 'neutral') {
              tlcardPrice.style.color = 'blue';
            } else if (tlcardpricecolor[i] === 'negative') {
              tlcardPrice.style.color = 'red';
            }
            tlcardBody.appendChild(tlcardPrice);
          }
          for (let i = 0; i < tlcardshareholding.length; i++) {
            const tlcardShareholding = document.createElement('div');
            tlcardShareholding.innerText = tlcardshareholding[i];
            if (tlcardshareholdingcolor[i] === 'positive') {
              tlcardShareholding.style.color = 'green';
            } else if (tlcardshareholdingcolor[i] === 'neutral') {
              tlcardShareholding.style.color = 'blue';
            } else if (tlcardshareholdingcolor[i] === 'negative') {
              tlcardShareholding.style.color = 'red';
            }
            tlcardBody.appendChild(tlcardShareholding);
          }
          // Append the card body to the card
          tlcard.appendChild(tlcardBody);
          // append the card to the chart container
          tlchartContainer.appendChild(tlcard);
          const tlchart = new Chart(tlcanvas, {
            type: 'line',
            data: tldata,
            options: {
              maintainAspectRatio: true,
              scales: {}
            }
          });
          this.tlchartList.push(tlchart);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
=======
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ButtonModule,
    DialogModule,
    TabViewModule
  ]
})
export class AnalyticsComponent implements OnInit {
  loading = true;
  error = false;
  displayMaximizable1 = false;
  displayMaximizable2 = false;
  displayMaximizable3 = false;
  displayMaximizable4 = false;
  displayMaximizable5 = false;
  displayMaximizable6 = false;

  constructor(private dataApiService: DataApiService) {}

  ngOnInit(): void {
    this.loadAnalyticsData();
  }

  private loadAnalyticsData(): void {
    this.loading = true;
    this.error = false;
    this.dataApiService.getAnalyticsData().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  showMaximizableDialog1() {
    this.displayMaximizable1 = true;
  }

  showMaximizableDialog2() {
    this.displayMaximizable2 = true;
  }

  showMaximizableDialog3() {
    this.displayMaximizable3 = true;
  }

  showMaximizableDialog4() {
    this.displayMaximizable4 = true;
  }

  showMaximizableDialog5() {
    this.displayMaximizable5 = true;
  }

  showMaximizableDialog6() {
    this.displayMaximizable6 = true;
>>>>>>> Stashed changes
  }
}
