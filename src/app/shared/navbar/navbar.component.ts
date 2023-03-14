import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as stocks from '../../lists/stocklist';
import * as stocks1 from '../../lists/list1';
import { DatePipe } from '@angular/common';
import {SelectItem} from 'primeng/api';

import { PrimeNGConfig } from 'primeng/api';
import { DataapiService } from '../../../dataapi.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as sectors from '../../lists/mcsectorlist';
import * as fnostocks from '../../lists/fnostocks';
import * as bqstock from '../../lists/bqlist'
import * as etstock from '../../lists/etlist'









export interface pcrnseniftytile {
  text1: number;
}
export interface pcrnsebniftytile {
  text1: number;
}
export interface newscardtile {
  
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
}

export interface mcniftyrttiles {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  
 
  
}
export interface mcpniftyrttiles {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  
 
  
}

export interface mcbniftyrttiles {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  
}
export interface newscardtile {
  
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
}




export interface pcrnsebniftytile {
  text1: number;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  stock: any
  data: any
  pcrnsebnifty: pcrnsebniftytile[] = [];
  pcrnsenifty:pcrnseniftytile[] = [];
  datetoday:any
  stock_isin: any
  newscard: newscardtile[] = [];
  stock1: any;
  fnostock: any;
  stockid = [];
  mcsectorsymbol = [];
  items: SelectItem[];
  item: string;
  eqsymbol1 = [];
  tlid = [];
  n50optionssupport: any;
  n50optionsresistance: any;
  bnoptionssupport: any;
  bnoptionsresistance:any;
  companyid = [];
  mcsymbol = [];
  mcsymbol1 = [];
  optionwc = [];
  optionwp = [];
  optionbwc = [];
  optionbwp = [];
  mcadvvalue: any
  mcdecvalue: any
  mcadvvalue1: any
  mcdecvalue1: any
  mcpadvvalue: any
  mcpdecvalue: any
  mcniftyrt: mcniftyrttiles[] = [];
  mcpniftyrt: mcpniftyrttiles[] = [];
  mcbniftyrt: mcbniftyrttiles[] = [];
  bqstocks: any;
  sectorList: any;
  etstocks: any;
  bqsymbol = [];
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  visibleSidebar1;
  visibleSidebar2;
  visibleSidebar3;
  visibleSidebar4;
  visibleSidebar5;
  today: any;
  pcrnsenifty1length:any
  pcrnsenifty1:any
  pcrnsebnifty1length:any
  pcrnsebnifty1:any

  dateyesterday: any;
  dateday5: any;
  date5: any;
  res;

  constructor(private datePipe: DatePipe,private http: HttpClient,private primengConfig: PrimeNGConfig,config: NgbDropdownConfig, private window: Window,private dataApi: DataapiService) {
    config.placement = 'bottom-right'; this.items = [];
    this.stock = stocks.default.Data;
    

    

     for (let val in this.stock) {
     this.items.push({label: this.stock[val].name , value:this.stock[val].isin });
   }
  }


  ngOnInit() {
   
    
    this.today = new Date();
    this.datetoday = this.datePipe.transform(this.today, 'yyyy-MM-dd')
    this.dateyesterday = this.datePipe.transform(this.today.setDate(this.today.getDate() - 1), 'yyyy-MM-dd')
    this.dateday5 = this.datePipe.transform(this.today.setDate(this.today.getDate() - 5), 'yyyy-MM-dd')
    this.date5 = this.today.setDate(this.today.getDate() - 5)
    this.stock = stocks.default.Data
    this.item=stocks.default.Data['name']
    this.stock1 = stocks1.default.Data
    this.getniftypcr()
    this.getbankniftypcr()
    { setInterval(() => { this.getniftypcr() }, 30000); }
     { setInterval(() => { this.getbankniftypcr() }, 30000); }
    {
      setInterval(() => { this.getmcniftyrealtime() }, 5000);
      setInterval(() => { this.getmcbankniftyrealtime() }, 5000);
      setInterval(() => { this.getmcpharmaniftyrealtime() }, 5000);
    }
    this.sectorList = sectors.default.Data
    this.getmcniftyrealtime()
    this.getmcbankniftyrealtime()
    this.getmcpharmaniftyrealtime()
    this.fnostock = fnostocks.default.Data
    this.etstocks = etstock.default.Data
    this.bqstocks=bqstock.default.Data
    this.toggleSidebar()
    this.data = this.stock
    
    this.primengConfig.ripple = true;
    
  }
 
  keyword = 'name';
  selectEvent(stock_isin) {
    
       
   window.open('/Share?stock='+stock_isin)
   }

  onChangeSearch(val: string) {

  
  }

  onFocused(abc) {

    // do something when input is focused
  }





  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
    getniftypcr() {
    
      this.dataApi.getntniftypcrdetails().subscribe(data5 => {
        let nestedItems= Object.keys(data5).map(key => {
          return data5[key];
        });

        this.pcrnsenifty1length=(((nestedItems[0]['resultData']['data']).length)-1)
        this.pcrnsenifty1=nestedItems[0]['resultData']['data'][this.pcrnsenifty1length].pcr
      })
    }
    getbankniftypcr() {
    
      this.dataApi.getntbankniftypcrdetails().subscribe(data5 => {
        let nestedItems= Object.keys(data5).map(key => {
          return data5[key];
        });
       
        this.pcrnsebnifty1length=(((nestedItems[0]['resultData']['data']).length)-1)
        this.pcrnsebnifty1=nestedItems[0]['resultData']['data'][this.pcrnsebnifty1length].pcr
        
         
      })
    }

   

  nsedataniftyoi() {
    this.dataApi.getnsedataniftyoi().subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
   
      

      this.optionwc.length = 0;
     
      this.optionwp.length = 0;
    

      //console.log(nestedItems[1]['CE'].totOI)
      //console.log(nestedItems[1]['PE'].totOI)
      this.pcrnsenifty.length=0;
      this.pcrnsenifty.push({ text1: nestedItems[1]['PE'].totOI / nestedItems[1]['CE'].totOI })
      for (let val in nestedItems[1]['data']) {
        if (nestedItems[1]['data'][val]['CE']) {
          if ((nestedItems[1]['data'][val]['CE']).length !== 0) {
        
        this.optionwc.push(nestedItems[1]['data'][val]['CE'].openInterest);
          }
        }
      }
      for (let val in nestedItems[1]['data']) {
        if (nestedItems[1]['data'][val]['CE']) {
          var maxc = this.optionwc.reduce((a, b) => Math.max(a, b));  // 5
        }
      }
     
            for (let val in nestedItems[1]['data']) {
              if (nestedItems[1]['data'][val]['CE']) {
              if (nestedItems[1]['data'][val]['CE'].openInterest == maxc) {
                this.n50optionsresistance= nestedItems[1]['data'][val]['CE'].strikePrice 
             }
              }
            
          
        if (nestedItems[1]['data'][val]['PE']) {
          if ((nestedItems[1]['data'][val]['PE']).length !== 0) {
        
            this.optionwp.push(nestedItems[1]['data'][val]['PE'].openInterest);
          }
        }
      }
      
        const maxp = this.optionwp.reduce((a, b) => Math.max(a, b));  // 5
       // console.log("maximum"+maxp)
     for (let val in nestedItems[1]['data']) {
       if (nestedItems[1]['data'][val]['PE']) {
         if ((nestedItems[1]['data'][val]['PE']).length !== 0) {
     
           if (nestedItems[1]['data'][val]['PE'].openInterest == maxp) {
             this.n50optionssupport= nestedItems[1]['data'][val]['PE'].strikePrice 
            
           }
         }
       }
     }
        
      
      
    }, err => {
      console.log(err)
    })
  }
 

  nsedatabniftyoi() {
 
    this.dataApi.getnsedatabniftyoi().subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      this.optionbwc.length = 0;
     
      this.optionbwp.length = 0;
      this.pcrnsebnifty.length=0;
      this.pcrnsebnifty.push({ text1: nestedItems[1]['PE'].totOI / nestedItems[1]['CE'].totOI })
    
     
      for (let val in nestedItems[1]['data']) {
        if (nestedItems[1]['data'][val]['CE']) {
          if ((nestedItems[1]['data'][val]['CE']).length !== 0) {
        
        this.optionbwc.push(nestedItems[1]['data'][val]['CE'].openInterest);
          }
        }
      }
      for (let val in nestedItems[1]['data']) {
        if (nestedItems[1]['data'][val]['CE']) {
          var maxbc = this.optionbwc.reduce((a, b) => Math.max(a, b));  // 5
        }
      }
            for (let val in nestedItems[1]['data']) {
              if (nestedItems[1]['data'][val]['CE']) {
              if (nestedItems[1]['data'][val]['CE'].openInterest == maxbc) {
                this.bnoptionsresistance= nestedItems[1]['data'][val]['CE'].strikePrice 
             }
              }
            
          
        if (nestedItems[1]['data'][val]['PE']) {
          if ((nestedItems[1]['data'][val]['PE']).length !== 0) {
            this.optionbwp.push(nestedItems[1]['data'][val]['PE'].openInterest);
          }
        }
      }
      
        const maxbp = this.optionbwp.reduce((a, b) => Math.max(a, b));  // 5
        //console.log("maximum"+maxbp)
     for (let val in nestedItems[1]['data']) {
       if (nestedItems[1]['data'][val]['PE']) {
         if ((nestedItems[1]['data'][val]['PE']).length !== 0) {
     
           if (nestedItems[1]['data'][val]['PE'].openInterest == maxbp) {
             this.bnoptionssupport= nestedItems[1]['data'][val]['PE'].strikePrice 
            
           }
         }
       }
     }
        
      
      
    }, err => {
      console.log(err)
    })
  }
  
  getmcniftyrealtime() {
   
      this.http.get('https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX').subscribe(data5 => {
        let nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
        
    
      this.mcniftyrt.length = 0;
      
      this.mcniftyrt.push({ text1: nestedItems[2]['pricecurrent'], text2: nestedItems[2]['pricecurrent'], text3: nestedItems[2]['pricechange'], text4: nestedItems[2]['pricepercentchange'], text5: nestedItems[2]['adv'], text6: nestedItems[2]['decl'] })
      this.mcadvvalue1 = nestedItems[2]['adv'];
      this.mcdecvalue1 = nestedItems[2]['decl'];
      
     
    }, err => {
      console.log(err)
    })
  }
  getmcpharmaniftyrealtime() {
   
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3Bcpr').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
  
    this.mcpniftyrt.length = 0;
    
    this.mcpniftyrt.push({ text1: nestedItems[2]['pricecurrent'], text2: nestedItems[2]['pricecurrent'], text3: nestedItems[2]['pricechange'], text4: nestedItems[2]['pricepercentchange'], text5: nestedItems[2]['adv'], text6: nestedItems[2]['decl'] })
    this.mcpadvvalue = nestedItems[2]['adv'];
    this.mcpdecvalue = nestedItems[2]['decl'];
    
   
  }, err => {
    console.log(err)
  })
}
  getmcbankniftyrealtime() {
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3Bnbx').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
  
    this.mcbniftyrt.length = 0;
      
      this.mcbniftyrt.push({text1: nestedItems[2]['pricecurrent'], text2: nestedItems[2]['pricecurrent'], text3: nestedItems[2]['pricechange'], text4: nestedItems[2]['pricepercentchange'], text5: nestedItems[2]['adv'], text6: nestedItems[2]['decl'] })
    }, err => {
      console.log(err)
    })
  }
  
 
 
      
   
   navigatenifty() {
    this.window.open("/nifty", "_blank") 
  }
  navigatescreeners() {
    this.window.open("/screeners", "_blank") 
  }
  
  navigatebanknifty() {
    this.window.open("/banknifty", "_blank") 
  }
  navigatepnifty() {
    this.window.open("/pharmanifty", "_blank") 
  }
  
  // chartink() {
  //   console.log("chartink start")
  //   this.datetoday = formatDate(new Date(), 'ddMMyyyy', 'en');
  //  // console.log('Date is'+ this.datetoday)
    
  //     this.abc.push({ name:'copy-buy-100-accuracy-morning-scanner-scan-at-9-30-4002',Date:this.datetoday })
      
    
   
  //   this.dataApi.chartink(this.abc).subscribe(data5 => {


  //   }, err => {
  //     console.log(err)
  //   }
  //   )
  // }
 
  // getmcsectorcombine() {
  //   console.log("mc sector combine start")
  //   for (let val in this.sectorList) {
  //     this.datetoday = formatDate(new Date(), 'ddMMyyyy', 'en');
  //   //  console.log('Date is'+ this.datetoday)
  //     this.mcsectorsymbol.push({ mcsectorsymbol: this.sectorList[val].mcsectorsymbol, sectorid: this.sectorList[val].mcsectorid, name: this.sectorList[val].name,Date:this.datetoday })
  //   //  console.log(this.sectorList[val].mcsectorsymbol)
  //   }
   
  //   this.dataApi.getmcsectorcombine(this.mcsectorsymbol).subscribe(data5 => {


  //   }, err => {
  //     console.log(err)
  //   }
  //   )
  // }
 
  nsepostdata1() {
    console.log("eq sector combine start")
    for (let val in this.stock) {
      this.datetoday = formatDate(new Date(), 'ddMMyyyy', 'en');
    
      this.eqsymbol1.push({ eqsymbol1: this.stock[val].symbol,name: this.stock[val].name,Date:this.datetoday })
      
    }
   
    this.dataApi.nsepostdata1(this.eqsymbol1).subscribe(data5 => {


    }, err => {
      console.log(err)
    }
    )
  }
  nsepostdata2() {
    console.log("eq sector combine start")
    for (let val in this.fnostock) {
      this.datetoday = formatDate(new Date(), 'ddMMyyyy', 'en');
    
      this.eqsymbol1.push({ eqsymbol1: this.fnostock[val].symbol,Date:this.datetoday })
      
    }
   
    this.dataApi.nsepostdata2(this.eqsymbol1).subscribe(data5 => {


    }, err => {
      console.log(err)
    }
    )
  }
 
 
}
