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
  tlchartList: Chart[] = [];
  tlchartList1: Chart[] = [];
  chartList: Chart[] = [];
  chartList1: Chart[] = [];
  chartList2: Chart[] = [];
  chartList3: Chart[] = [];

 
  time1: string;
  longbuildstockdata:  Array<number> = [];
  longbuildstocklabel:  Array<number> = [];
  lengtha: any;
  time3: any;
  tldvmmcname: any;
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
  // this.getttvolume(),
   this.getmcinsightreadshortcovering(),
   this.getmcinsightreadlongbuildup(),
   this.getmcinsightreadshortbuildup(),
  // this.getmcinsightreadlongunwinding(),
  // this.gettlscreener(this.screenercode),

  this.getntvolumeread()

    ])
    setInterval(() => { this.getntvolume() }, 120000);
    setInterval(() => { this.getntvolumeread() }, 125000);
  }
  
  displayMaximizable: boolean;
  showMaximizableDialog() {
    this.displayMaximizable = true;
} 
displayMaximizable1: boolean;
  showMaximizableDialog1() {
    this.displayMaximizable1 = true;
}
displayMaximizable2: boolean;
showMaximizableDialog2() {
  this.displayMaximizable = true;
} 
displayMaximizable3: boolean;
showMaximizableDialog3() {
  this.displayMaximizable1 = true;
}
displayMaximizable4: boolean;
showMaximizableDialog4() {
this.displayMaximizable = true;
} 
displayMaximizable5: boolean;
showMaximizableDialog5() {
this.displayMaximizable1 = true;
}
 
  trackByFunction1(index1, item1) {return item1.text3;}
  trackByFunction2(index2, item2) {return item2.text3;}
  getRandomNumber() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  }
  async gettldvm() {
   
    this.screenercode='9818'
      const data5 = await this.dataApi.gettlscreeners(this.screenercode).toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const tlcardprice = [];
      const tlcardpricecolor = [];
      const tlcardshareholding = [];
      const tlcardshareholdingcolor = [];
      try {
        console.log(nestedItems[0]['body']);
    
        for (let val in nestedItems[0]['body']['tableData']) {
          const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
    
          const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.name;
          if (tlscreenerstock !== '#N/A') {
            try {
              const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
              const nestedItems1 = Object.keys(data6).map(key => {
                return data6[key];
              });
              console.log(nestedItems1)
             
              const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
              const nestedItems = Object.keys(data5).map(key => {
                return data5[key];
              });
    
              const tlselectedstockdata = [];
              const tlselectedstocklabel = [];
              if (nestedItems[6][0].hasOwnProperty('value')) {
                for (let val in nestedItems[6]) {
                  tlselectedstockdata.push(nestedItems[6][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else if (nestedItems[5][0].hasOwnProperty('value')) {
                for (let val in nestedItems[5]) {
                  tlselectedstockdata.push(nestedItems[5][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else {
                console.log(nestedItems[0]['body']['tableData'][val][0]+"First")
                continue;
              }
    
              const tlchartContainer = document.getElementById('chart-containertldvmstock');
              
              // create a new card element
              const tlcard = document.createElement('div');
              tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
             
  const maximiseButton = document.createElement('button');
  maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
  maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
  maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
  const exitFullscreenButton = document.createElement('button');
  exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
  exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
  exitFullscreenButton.style.display = 'none'; // Hide the button initially
  exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
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
  function toggleFullscreen(element) {
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
  for (let val1 in nestedItems1[1]['insightData']['price']) {
    tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
    tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
  }
  
  console.log(tlcardpricecolor)
  
  for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
    tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
    tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
  }
  console.log(tlcardshareholdingcolor)
  
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
            console.log(nestedItems[0]['body']['tableData'][val][0]);
            continue;
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
   const tlcardprice = [];
   const tlcardpricecolor = [];
   const tlcardshareholding = [];
   const tlcardshareholdingcolor = [];
    this.time1=new Date(nestedItems[1]).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
    for (let val in nestedItems[0]) {

      const ttvolumemcsymbol = this.stockList.filter(i => i.name === nestedItems[0][val].name)[0]?.mcsymbol;
  const ttvolumemcname = this.stockList.filter(i => i.name === nestedItems[0][val].name)[0]?.name;
    
      if (ttvolumemcsymbol == '#N/A') {
        console.error(`No mcsymbol found for name: ${nestedItems[0][val].name}. Skipping to next iteration.`);
        continue;
      }
        try {
          const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' +  ttvolumemcsymbol + '&type=d').toPromise();
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
            for (let val in nestedItems[6]) {
              ttvolumemcstockdata.push(nestedItems[6][val]['value']);
              ttvolumemcstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              ttvolumemcstockdata.push(nestedItems[5][val]['value']);
              ttvolumemcstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else {
            console.log("First")
            continue;
          }

          const tlchartContainer = document.getElementById('chart-containerttvolbo');
          
          // create a new card element
          const tlcard = document.createElement('div');
          tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
         
const maximiseButton = document.createElement('button');
maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));

const exitFullscreenButton = document.createElement('button');
exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
exitFullscreenButton.style.display = 'none'; // Hide the button initially
exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));

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
function toggleFullscreen(element) {
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
for (let val1 in nestedItems1[1]['insightData']['price']) {
tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
}



for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
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
    this.screenercode='208626';
    this.dataApi.gettlscreeners(this.screenercode).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
   
      
    
      console.log(nestedItems)
    });
    
  }
  async getmcinsightreadshortcovering() {
    this.screenercode='208625'
      const data5 = await this.dataApi.gettlscreeners(this.screenercode).toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const tlcardprice = [];
      const tlcardpricecolor = [];
      const tlcardshareholding = [];
      const tlcardshareholdingcolor = [];
      try {
        console.log(nestedItems[0]['body']);
    
        for (let val in nestedItems[0]['body']['tableData']) {
          const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
    
          const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.name;
          if (tlscreenerstock !== '#N/A') {
            try {
              const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
              const nestedItems1 = Object.keys(data6).map(key => {
                return data6[key];
              });
              console.log(nestedItems1)
             
              const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
              const nestedItems = Object.keys(data5).map(key => {
                return data5[key];
              });
    
              const tlselectedstockdata = [];
              const tlselectedstocklabel = [];
              if (nestedItems[6][0].hasOwnProperty('value')) {
                for (let val in nestedItems[6]) {
                  tlselectedstockdata.push(nestedItems[6][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else if (nestedItems[5][0].hasOwnProperty('value')) {
                for (let val in nestedItems[5]) {
                  tlselectedstockdata.push(nestedItems[5][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else {
                console.log(nestedItems[0]['body']['tableData'][val][0]+"First")
                continue;
              }
    
              const tlchartContainer = document.getElementById('chart-containershortcovering');
              
              // create a new card element
              const tlcard = document.createElement('div');
              tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
             
  const maximiseButton = document.createElement('button');
  maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
  maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
  maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
  const exitFullscreenButton = document.createElement('button');
  exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
  exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
  exitFullscreenButton.style.display = 'none'; // Hide the button initially
  exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
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
  function toggleFullscreen(element) {
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
  for (let val1 in nestedItems1[1]['insightData']['price']) {
    tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
    tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
  }
  
  console.log(tlcardpricecolor)
  
  for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
    tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
    tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
  }
  console.log(tlcardshareholdingcolor)
  
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
            console.log(nestedItems[0]['body']['tableData'][val][0]);
            continue;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    
  
  async getmcinsightreadlongbuildup() {
    this.screenercode='208626'
      const data5 = await this.dataApi.gettlscreeners(this.screenercode).toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const tlcardprice = [];
      const tlcardpricecolor = [];
      const tlcardshareholding = [];
      const tlcardshareholdingcolor = [];
      try {
        console.log(nestedItems[0]['body']);
    
        for (let val in nestedItems[0]['body']['tableData']) {
          const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
    
          const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.name;
          if (tlscreenerstock !== '#N/A') {
            try {
              const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
              const nestedItems1 = Object.keys(data6).map(key => {
                return data6[key];
              });
              console.log(nestedItems1)
             
              const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
              const nestedItems = Object.keys(data5).map(key => {
                return data5[key];
              });
    
              const tlselectedstockdata = [];
              const tlselectedstocklabel = [];
              if (nestedItems[6][0].hasOwnProperty('value')) {
                for (let val in nestedItems[6]) {
                  tlselectedstockdata.push(nestedItems[6][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else if (nestedItems[5][0].hasOwnProperty('value')) {
                for (let val in nestedItems[5]) {
                  tlselectedstockdata.push(nestedItems[5][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else {
                console.log(nestedItems[0]['body']['tableData'][val][0]+"First")
                continue;
              }
    
              const tlchartContainer = document.getElementById('chart-containerlongbuildup');
              
              // create a new card element
              const tlcard = document.createElement('div');
              tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
             
  const maximiseButton = document.createElement('button');
  maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
  maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
  maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
  const exitFullscreenButton = document.createElement('button');
  exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
  exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
  exitFullscreenButton.style.display = 'none'; // Hide the button initially
  exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
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
  function toggleFullscreen(element) {
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
  for (let val1 in nestedItems1[1]['insightData']['price']) {
    tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
    tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
  }
  
  console.log(tlcardpricecolor)
  
  for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
    tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
    tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
  }
  console.log(tlcardshareholdingcolor)
  
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
            console.log(nestedItems[0]['body']['tableData'][val][0]);
            continue;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    
  
  async getmcinsightreadshortbuildup() {
    this.screenercode='208631'
      const data5 = await this.dataApi.gettlscreeners(this.screenercode).toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      const tlcardprice = [];
      const tlcardpricecolor = [];
      const tlcardshareholding = [];
      const tlcardshareholdingcolor = [];
      try {
        console.log(nestedItems[0]['body']);
    
        for (let val in nestedItems[0]['body']['tableData']) {
          const tlscreenerstock = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.mcsymbol;
    
          const tlscreenerstockname = this.stockList.filter(i => i.name === ((nestedItems[0]['body']['tableData'][val][0]).replace('Ltd.', 'Limited')))[0]?.name;
          if (tlscreenerstock !== '#N/A') {
            try {
              const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + tlscreenerstock + '&type=d').toPromise();
              const nestedItems1 = Object.keys(data6).map(key => {
                return data6[key];
              });
              console.log(nestedItems1)
             
              const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + tlscreenerstock + '&resolution=1D').toPromise();
              const nestedItems = Object.keys(data5).map(key => {
                return data5[key];
              });
    
              const tlselectedstockdata = [];
              const tlselectedstocklabel = [];
              if (nestedItems[6][0].hasOwnProperty('value')) {
                for (let val in nestedItems[6]) {
                  tlselectedstockdata.push(nestedItems[6][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else if (nestedItems[5][0].hasOwnProperty('value')) {
                for (let val in nestedItems[5]) {
                  tlselectedstockdata.push(nestedItems[5][val]['value']);
                  tlselectedstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
                }
              } else {
                console.log(nestedItems[0]['body']['tableData'][val][0]+"First")
                continue;
              }
    
              const tlchartContainer = document.getElementById('chart-containershortbuildup');
              
              // create a new card element
              const tlcard = document.createElement('div');
              tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
             
  const maximiseButton = document.createElement('button');
  maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
  maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
  maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
  const exitFullscreenButton = document.createElement('button');
  exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
  exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
  exitFullscreenButton.style.display = 'none'; // Hide the button initially
  exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));
  
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
  function toggleFullscreen(element) {
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
  for (let val1 in nestedItems1[1]['insightData']['price']) {
    tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
    tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
  }
  
  console.log(tlcardpricecolor)
  
  for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
    tlcardshareholding.push(nestedItems1[1]['insightData']['shareholding'][val2].shortDesc);
    tlcardshareholdingcolor.push(nestedItems1[1]['insightData']['shareholding'][val2].color);
  }
  console.log(tlcardshareholdingcolor)
  
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
            console.log(nestedItems[0]['body']['tableData'][val][0]);
            continue;
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
		 const tlcardprice = [];
		 const tlcardpricecolor = [];
		 const tlcardshareholding = [];
		 const tlcardshareholdingcolor = [];
      this.time3=new Date(nestedItems[1]).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
      
      for (let val in nestedItems[0]['longunwinding']) {
        const longunwindingstock = this.stockList.filter(i => i.name === nestedItems[0]['longunwinding'][val].name)[0]?.mcsymbol;
        const longunwindingstockname = this.stockList.filter(i => i.name === nestedItems[0]['longunwinding'][val].name)[0]?.name;
         
        if (longunwindingstock !== '#N/A') {
          try {
            const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' + longunwindingstock + '&type=d').toPromise();
            const nestedItems1 = Object.keys(data6).map(key => {
              return data6[key];
            });
            
           
            const data5 = await this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + longunwindingstock + '&resolution=1D').toPromise();
            const nestedItems = Object.keys(data5).map(key => {
              return data5[key];
            });
  
            const longunwindingstockdata = [];
            const longunwindingstocklabel = [];
            if (nestedItems[6][0].hasOwnProperty('value')) {
              for (let val in nestedItems[6]) {
                longunwindingstockdata.push(nestedItems[6][val]['value']);
                longunwindingstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else if (nestedItems[5][0].hasOwnProperty('value')) {
              for (let val in nestedItems[5]) {
                longunwindingstockdata.push(nestedItems[5][val]['value']);
                longunwindingstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
              }
            } else {
              console.log("First")
              continue;
            }
  
            const tlchartContainer = document.getElementById('chart-containerlongunwinding');
            
            // create a new card element
            const tlcard = document.createElement('div');
            tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
           
const maximiseButton = document.createElement('button');
maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));

const exitFullscreenButton = document.createElement('button');
exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
exitFullscreenButton.style.display = 'none'; // Hide the button initially
exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));

// Append the maximise and exit fullscreen buttons to the card body
tlcard.appendChild(maximiseButton);
tlcard.appendChild(exitFullscreenButton);
            // create a card body
            const tlcardBody = document.createElement('div');
            tlcardBody.classList.add('card-body');
            
            // create a card title
            const tlcardTitle = document.createElement('h5');
            tlcardTitle.classList.add('card-title');
            tlcardTitle.innerText = longunwindingstockname;
  
            // append the card title to the card body
            tlcardBody.appendChild(tlcardTitle);
  
            // create a new wrapper element for the canvas
            const tlchartWrapper = document.createElement('div');
            tlchartWrapper.classList.add('tlchart-wrapper');
  
            const tldata = {
              labels: longunwindingstocklabel,
              datasets: [{
                label: longunwindingstockname,
                data: longunwindingstockdata,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            };
  
            const tlcanvas = document.createElement('canvas');
            tlcanvas.id = 'chart' + longunwindingstock;
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
function toggleFullscreen(element) {
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
for (let val1 in nestedItems1[1]['insightData']['price']) {
  tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
  tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
}



for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
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
          console.log('error');
          continue;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
 

   async getntvolume() {
  
       await this.dataApi.getntvolume();
      

    }
  
	   
async getntvolumeread() {
  try {
   
  
  const data5 = await this.dataApi.getntvolumeread().toPromise(); // convert Observable to Promise

    let nestedItems = Object.keys(data5).map(key => {
      return data5[key];
    });
    console.log(nestedItems)
   const tlcardprice = [];
   const tlcardpricecolor = [];
   const tlcardshareholding = [];
   const tlcardshareholdingcolor = [];
    this.time1=new Date(nestedItems[1]).toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
    for (let val in nestedItems) {
      // console.log(nestedItems[val].name)
      const ntvolumemcsymbol = this.stockList.filter(i => i.symbol === nestedItems[val].symbol)[0]?.mcsymbol;
  const ntvolumemcname = this.stockList.filter(i => i.symbol === nestedItems[val].symbol)[0]?.name;
    
      if (ntvolumemcsymbol == '#N/A') {
        console.error(`No mcsymbol found for name: ${nestedItems[val].symbol}. Skipping to next iteration.`);
        continue;
      }
        try {
          const data6 = await this.http.get('https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId=' +  ntvolumemcsymbol + '&type=d').toPromise();
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
            for (let val in nestedItems[6]) {
              ntvolumemcstockdata.push(nestedItems[6][val]['value']);
              ntvolumemcstocklabel.push(((new Date(nestedItems[6][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else if (nestedItems[5][0].hasOwnProperty('value')) {
            for (let val in nestedItems[5]) {
              ntvolumemcstockdata.push(nestedItems[5][val]['value']);
              ntvolumemcstocklabel.push(((new Date(nestedItems[5][val]['time'] * 1000).toUTCString()).split(" ").slice(0, 6)[4]).slice(0, 5));
            }
          } else {
            console.log("First")
            continue;
          }

          const tlchartContainer = document.getElementById('chart-containerntvolbo');
          
          // create a new card element
          const tlcard = document.createElement('div');
          tlcard.classList.add('cardnew', 'col-md-3', 'my-3');
         
const maximiseButton = document.createElement('button');
maximiseButton.innerHTML = '<i class="pi pi-window-maximize"></i>'; // Use PrimeIcons maximise icon
maximiseButton.classList.add('p-button', 'p-button-text', 'p-button-rounded');
maximiseButton.addEventListener('click', () => toggleFullscreen(tlcard));

const exitFullscreenButton = document.createElement('button');
exitFullscreenButton.innerHTML = '<i class="pi pi-window-minimize"></i>'; // Use PrimeIcons exit fullscreen icon
exitFullscreenButton.classList.add('p-button', 'p-button-text', 'p-button-rounded', 'p-button-secondary');
exitFullscreenButton.style.display = 'none'; // Hide the button initially
exitFullscreenButton.addEventListener('click', () => toggleFullscreen(tlcard));

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
function toggleFullscreen(element) {
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
for (let val1 in nestedItems1[1]['insightData']['price']) {
tlcardprice.push(nestedItems1[1]['insightData']['price'][val1].shortDesc);
tlcardpricecolor.push(nestedItems1[1]['insightData']['price'][val1].color);
}



for (let val2 in nestedItems1[1]['insightData']['shareholding']) {
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
  }
