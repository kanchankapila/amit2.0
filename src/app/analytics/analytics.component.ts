import { Component } from '@angular/core';
import { DataapiService } from '../../dataapi.service';
// import { HttpClient } from '@angular/common/http';
import * as  stocks from '../lists/stocklist'
export interface tldvmstockstile { text1: any; text2: any; text3: any; text4: any; text5: any; text6: any; text7: any; text8: any; }
export interface ttvolumestockstile { text1: any; text2: any; text3: any; text4: any; text5: any; text6: any; text7: any; text8: any; }
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  constructor( private dataApi: DataapiService) {
    
  }
  stockList: any;
  tldvmmcsymbol:any;
  ttvolumemcsymbol:any;
  tldvmstocks: tldvmstockstile[] = [];
  ttvolumestocks: ttvolumestockstile[] = [];
  async ngOnInit() {
    await Promise.all([
  this.stockList = stocks.default.Data,
  this.gettldvm(),
  this.getttvolume()
    ])
  }

  trackByFunction1(index1, item1) {return item1.text3;}
  trackByFunction2(index2, item2) {return item2.text3;}
  async gettldvm() {
    try {
      const data5 = await this.dataApi.gettldvm().toPromise();
      const nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.tldvmstocks.length=0;
      for (let val in nestedItems[0]['output']) {
        this.tldvmmcsymbol = (this.stockList.filter(i => i.name == nestedItems[0]['output'][val].Name)[0].mcsymbol);
        if (this.tldvmmcsymbol == '#N/A') {
          console.error(`No mcsymbol found for name: ${nestedItems[0]['obj'][val].Name}. Skipping to next iteration.`);
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
      console.log(nestedItems)
      for (let val in nestedItems[0]['obj']) {
  
        const ttvolumemcsymbol = this.stockList.filter(i => i.name === nestedItems[0]['obj'][val].Name)[0]?.mcsymbol;
        if (ttvolumemcsymbol == '#N/A') {
          console.error(`No mcsymbol found for name: ${nestedItems[0]['obj'][val].Name}. Skipping to next iteration.`);
          continue;
        }
        console.log(ttvolumemcsymbol)
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
    
  
 

}
