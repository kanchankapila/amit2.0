import { Component, OnInit } from '@angular/core';
import { DataapiService } from '../../dataapi.service'
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import * as  stocks from '../lists/stocklist'
import {Chart} from 'chart.js';

export interface screenerstockstile {
  text1: any; text2: any; text3: any; text4: any; text5: any; text6: any; text7: any; text8: any; text9: any;
  text10: any;text11: any;text12: any;}
@Component({
  selector: 'app-screeners',
  templateUrl: './screeners.component.html',
  styleUrls: ['./screeners.component.scss']
})
export class ScreenersComponent implements OnInit {
  tlchartList: Chart[] = [];
  options = [
    { name: 'Amit', value: '15697', label: "Stock screener for upcoming results, identifying stocks whose share prices are heading in the positive direction compared to month performance" },
    { name: 'color', value: '11793', label: 'DVM - High Performing, Highly Durable Companies' },
    { name: 'color', value: '9818', label: 'Strong Performers - High DVM Stocks' },
    { name: 'size', value: '9896', label: 'Await Turnaround (DVM)' },
    { name: 'size', value: '19746', label: 'High DVM Mid and Small Caps' },
    { name: 'size', value: '764', label: 'Profit making Companies with High ROCE and Low PE' },
    { name: 'Amit', value: '24', label: "Street Favorite: High Analyst Rating with at least 20% upside" },
    { name: 'color', value: '24716', label: 'High volume, High Gain' },
    { name: 'color', value: '280337', label: 'High Momentum - Stocks with Highest Trendlyne Momentum Scores and High Volumes' },
    { name: 'size', value: '6160', label: 'Rising Momentum: Momentum Score Weekly Gainers' },
    { name: 'size', value: '207497', label: 'Forecaster Consensus Estimates: Stocks with Strong Buy Calls from Analysts' },
    { name: 'size', value: '208614', label: 'Stocks with high FnO put to call ratio or PCR, indicating a bullish sentiment' },
    { name: 'size', value: '208626', label: 'Securities seeing a long buildup' },
    { name: 'size', value: '82566', label: 'Rising Delivery Percentage Compared to Previous Day and Month, Strong Volumes' },
    { name: 'size', value: '11122', label: 'Newly Affordable Stocks with Good Financials and Durability' }
  ];
  selectedOption: string;
  stockList: any;
  symbol: any;
  
  SMA = this._formBuilder.group({
   "_20_day_sma_below":false,
    "_20_day_sma_above":false,
    "_50_day_sma_below":false,
    "_50_day_sma_above":false,
    "_100_day_sma_below":false,
    "_100_day_sma_above":false,
    "_200_day_sma_below":false,
    "_200_day_sma_above":false,
    "_5_day_ema_below":false,
    "_5_day_ema_above":false,
    "_8_day_ema_below":false,
    "_8_day_ema_above":false,
    "_20_day_ema_below":false,
    "_20_day_ema_above":false,
    "_26_day_ema_below":false,
    "_26_day_ema_above":false,
    "_50_day_ema_below":false,
    "_50_day_ema_above":false,
    "_200_day_ema_below":false,
    "_200_day_ema_above":false,
    "_5_20_sma_crossover_below":false,
    "_5_20_sma_crossover_above":false,
    "_20_50_sma_crossover_below":false,
    "_20_50_sma_crossover_above":false,
    "_20_100_sma_crossover_below":false,
    "_20_100_sma_crossover_above":false,
    "_50_100_sma_crossover_below":false,
    "_50_100_sma_crossover_above":false,
    "_50_200_sma_crossover_below":false,
    "_50_200_sma_crossover_above":false,
    "_5_20_ema_crossover_below":false,
    "_5_20_ema_crossover_above":false,
    "_8_20_ema_crossover_below":false,
    "_8_20_ema_crossover_above":false,
    "_12_26_ema_crossover_below":false,
    "_12_26_ema_crossover_above":false,
    "_9_30_ema_crossover_below":false,
    "_9_30_ema_crossover_above":false,
    "_20_50_ema_crossover_below":false,
    "_20_50_ema_crossover_above":false,
    "_50_200_ema_crossover_below":false,
    "_50_200_ema_crossover_above":false,
    "ema5_sma20_cross_below":false,
    "ema5_sma20_cross_above":false,
    "ema20_sma50_cross_below":false,
    "ema20_sma50_cross_above":false,
    "ema50_sma100_cross_below":false,
    "ema50_sma100_cross_above":false,
    "nr4":false,
    "nr7":false,
    "_5_days_high_above":false,
    "_5_days_high_below":false,
    "_5_days_high_2_above":false,
    "_5_days_high_2_below":false,
    "new_5_days_high_above":false,
    "new_5_days_low_below":false,
    "_20_days_high_above":false,
    "_20_days_high_below":false,
    "_20_days_high_2_above":false,
    "_20_days_high_2_below":false,
    "new_20_days_high_above":false,
    "new_20_days_low_below":false,
    "_50_days_high_above":false,
    "_50_days_high_below":false,
    "_50_days_high_2_above":false,
    "_50_days_high_2_below":false,
    "new_50_days_high_above":false,
    "new_50_days_low_below":false,
    "_100_days_high_above":false,
    "_100_days_high_below":false,
    "_100_days_high_2_above":false,
    "_100_days_high_2_below":false,
    "new_100_days_high_above":false,
    "new_100_days_low_below":false,
    "_200_days_high_above":false,
    "_200_days_high_below":false,
    "_200_days_high_2_above":false,
    "_200_days_high_2_below":false,
    "new_200_days_high_above":false,
    "new_200_days_low_below":false,
    "cci_100_above":false,
    "cci_100_below":false,
    "cci_200_above":false,
    "cci_200_below":false,
    "cci_cross_100_above":false,
    "cci_cross_100_below":false,
    "cci_cross_neg_100_above":false,
    "cci_cross_neg_100_below":false,
    "rsi_cross_30_below":false,
    "rsi_cross_70_above":false,
    "rsi_cross_20_below":false,
    "rsi_cross_80_above":false,
    "rsi_2_70_above":false,
    "rsi_2_70_below":false,
    "macd_cross_below":false,
    "macd_cross_above":false,
    "macd_cross_above_zero":false,
    "macd_cross_below_zero":false,
    "mfi_above_80":false,
    "mfi_below_20":false,
    "mfi_above_90":false,
    "mfi_below_10":false,
    "up_adx_between_25_50":false,
    "strong_up_adx_above_50":false,
    "down_adx_between_25_50":false,
    "strong_down_adx_above_50":false,
    "adx_below_50":false,
    "supr_buy":false,
    "supr_sell":false,
    "upper_bb_below":false,
    "upper_bb_above":false,
    "lower_bb_below":false,
    "lower_bb_above":false,
    "atr_inc_3":false,
    "atr_dec_3":false,
    "atr_inc_5":false,
    "atr_dec_5":false,
    "close_gainers":false,
    "close_losers":false,
    "close_more_5_gain":false,
    "close_more_5_down":false,
    "same_open_high":false,
    "same_open_low":false,
    "same_approx_open_high":false,
    "same_approx_open_low":false,
    "close_nearday_high":false,
    "close_nearday_low":false,
    "close_near_open":false,
    "higher_high":false,
    "higher_low":false,
    "higher_high_higher_low":false,
    "lower_high":false,
    "lower_low":false,
    "lower_high_lower_low":false,
    "inside_day":false,
    "outside_day":false,
    "high_delivery_age":false,
    "lower_high_delivery_qty":false,
    "high_delivery_age_qty":false,
    "high_trade_qty":false,
    "above_r2":false,
    "between_r1_r2":false,
    "above_pivot":false,
    "below_pivot":false,
    "between_s2_s1":false,
    "s2_support":false,
    "gap_up_opening":false,
    "gap_up_opening_fill":false,
    "gap_up_opening_unfill":false,
    "gap_down_opening":false,
    "gap_down_opening_fill":false,
    "gap_down_opening_unfill":false,
    "watchlist":false,
    "watchlist_id":0,
    "watchlist_name": "",
    "screener_group": false,
    "screener_group_id": 0,
    "screener_group_name": "",
    "doji_bullish":false,
    "doji_bearish":false,
    "doji_star_bullish":false,
    "doji_star_bearish":false,
    "engul_fing_bullish":false,
    "engul_fing_bearish":false,
    "harami_bullish":false,
    "harami_bearish":false,
    "harami_cross_bullish":false,
    "harami_cross_bearish":false,
    "evening_star_bearish":false,
    "inverted_hammer_bullish":false,
    "inverted_hammer_bearish":false,
    "hammer_bullish":false,
    "hammer_bearish":false,
    "marubozu_bullish":false,
    "marubozu_bearish":false,
    "morning_star_bullish":false,
    "dark_cloud_cover_bearish":false,
    "tasuki_gap_bullish":false,
    "tasuki_gap_bearish":false,
    "dragon_fly_doji_bullish":false,
    "dragon_fly_doji_bearish":false,
    "piercing_line_bullish":false,
    "piercing_line_bearish":false,
    "grave_stone_doji_bullish":false,
    "grave_stone_doji_bearish":false,
    "three_black_crows_bearish":false,
    "three_white_soldiers_bullish":false,
    "is_candle":false
  });
  stockisin: any;
  ntoptions: any;
 // postId: any;
 SMA1: string = '';
  screenercode: string;

 setValue(SMA1:string) {
   console.log('SMA Name: ',SMA1);
 }
 setValue1(selectedOption:string) {
  console.log('selectedOption: ',selectedOption);
}

  screenerstocks: screenerstockstile[] = [];
  constructor(private dataApi: DataapiService,private http: HttpClient,private _formBuilder: UntypedFormBuilder, private window: Window) { }
  templateForm(value: any) {
   
    
    //  let data = (value)
    let object = {};
    for (let val in value) {
      
     
      if (value[val] == 'true') {
        object[val]=value[val]
        
      }
     
    }
    this.ntoptions = (object)
    console.log(this.ntoptions)
   
    this.getnteodscreeners(this.ntoptions)
  }

  ngOnInit(): void {
    this.stockList = stocks.default.Data
  }
  displayMaximizable: boolean;
  showMaximizableDialog() {
    this.displayMaximizable = true;
} 
displayMaximizable1: boolean;
  showMaximizableDialog1() {
    this.displayMaximizable1 = true;
} 
  trackByFunction42(index42, item42) {
    // console.log( 'TrackBy:', item.text2, 'at index', index );
     return item42.text2
   }
   async gettlscreeners(selectedOption: string) {
    this.screenercode = selectedOption;
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
  
            const tlchartContainer = document.getElementById('tlchart-container');
            
            // create a new card element
            const tlcard = document.createElement('div');
            tlcard.classList.add('card', 'col-md-3', 'my-3');
           
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
  

  
  getnteodscreeners(SMA1:string) {

    this.dataApi.getnteodscreeners(SMA1).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.screenerstocks.length = 0;
      console.log(SMA1)
      console.log(nestedItems)
      for (let val in nestedItems[0]['resultData']) {this.screenerstocks.push({ text1: nestedItems[0]['resultData'][val].symbol,text2: nestedItems[0]['resultData'][val].priceChange,text3: nestedItems[0]['resultData'][val].t0_20avgVolume,text4: nestedItems[0]['resultData'][val].t0_volume,text5: nestedItems[0]['resultData'][val].t0_close,text6: nestedItems[0]['resultData'][val].t0_date,text7: nestedItems[0]['resultData'][val].t0_deliveryPercentage,text8: nestedItems[0]['resultData'][val].t0_high,text9: nestedItems[0]['resultData'][val].t0_low,text10: nestedItems[0]['resultData'][val].t0_open,text11: nestedItems[0]['resultData'][val].t0_rsi,text12:nestedItems[0]['resultData'][val]._52week_range })}
      });
  }
  refresh(){
    window.location.reload()
  }
 
  changestockpage(symbol) {
     

    this.stockisin = this.stockList.filter(i => i.symbol == symbol)[0].isin
    this.window.open("/Share?stock=" + this.stockisin, "_blank")
  }
}
