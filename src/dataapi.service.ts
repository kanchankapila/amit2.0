import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataapiService {
  public href: string = "";
  baseurl: string;

  constructor(private http: HttpClient) {
    this.setBaseUrl(); // Initialize baseurl based on hostname
  }

  ngOninit(): any {
    console.log(window.location.hostname)
    this.baseurl = "http://localhost:9999";
    this.setBaseUrl();

  }
  setBaseUrl(): void {
    if (window.location.hostname === "localhost") {
      this.baseurl = "http://localhost:9999";
    } else {
      this.baseurl = "https://stockinsights.netlify.app";
    }
  }
  // API calls

  getTest1() {
    return this.http.get('https://kayal.trendlyne.com/clientapi/kayal/content/checklist-bypk/2633/');
  }
//Screeners Component
  getNteodScreeners(ntoptions: any) {
    return this.http.post(`${this.baseurl}/.netlify/functions/ntscreeners`, ntoptions);
  }

  getTrendlynePostDvm() {
    return this.http.get('https://render-express-e54x.onrender.com/api/trendlyneDVM');
  }

  setOpstraCookie() {
    return this.http.get('https://render-express-e54x.onrender.com/api/Opstracookie');
  }



//Navbar Components
  getTtmmi() {
    return this.http.get(`${this.baseurl}/.netlify/functions/tickertapeapi`);
  }

  getNtVolume() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntvolume`);
  }

  
//Bank Nifty,Pharma Nifty,Share Component
  getTlIndexParams(tlid: string) {
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlyneindex?tlid=${tlid}`);
  }
  //Homepage Component
  getTlrefresh() {
    return this.http.get(`${this.baseurl}/.netlify/functions/tlrefresh`);
  }
//Nifty Component
  getInvestingIndicators(indexid: string, duration: string) {
    return this.http.get(`${this.baseurl}/.netlify/functions/investingindicators?indexid=${indexid}&duration=${duration}`);
  }
//Nifty Component,Navbar Component
getNtNiftyPcrDetails() {
  return this.http.get(`${this.baseurl}/.netlify/functions/ntniftypcr`);
}

  getKite1(timeframe: string, eqsymbol: string) {
    return this.http.get(`${this.baseurl}/kite1?timeframe=${timeframe}&eqsymbol=${eqsymbol}`);
  }
//Share Component
  getKotakScore(stock: string) {
    return this.http.get(`${this.baseurl}/.netlify/functions/KotakScoreRead?stock=${stock}`);
  }
//Share Component
getKotakSectorView(sector: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/KotakSectorRead?sector=${sector}`);
}
//Share Component
getGNewsApi(bqnames: string, dateday5: string, datetoday: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/news?bqnames=${bqnames}&dateday5=${dateday5}&datetoday=${datetoday}`);
}
//Share Component
getOpstraStockPcr(eqsymbol: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/opstrafetchstockpcr?eqsymbol=${eqsymbol}`);
}
//Share Component
getOpstraStockPcrIntra(eqsymbol: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/opstrafetchstockpcrintra?eqsymbol=${eqsymbol}`);
}
//Share Component
getNtStock1Yr(eqsymbol: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/ntstock1yr?eqsymbol=${eqsymbol}`);
}
//Share Component
getMmData(stockid: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/mmdata?stockid=${stockid}`);
}
getMmValuation(stockid: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/mmvaluation?stockid=${stockid}`);
}
//Share Component
getNtStockDetails(eqsymbol: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/ntstockdetails?eqsymbol=${eqsymbol}`);
}
//Share Component
getNtStockPcrDetails(eqsymbol: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/ntstockpcrdetails?eqsymbol=${eqsymbol}`);
}
//Share Component
getTrendlyne3Fetch(tlid: string, tlname: string, eqsymbol: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/chrometrendlyne?tlid=${tlid}&tlname=${tlname}&eqsymbol=${eqsymbol}`);
}
//Share Component
getTrendlyne2Fetch(tlid: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/trendlyne2?tlid=${tlid}`);
}


  getOpstraRefresh() {
    return this.http.get(`${this.baseurl}/.netlify/functions/opstrarefresh`);
  }


  //Analytics Component,Screeners Component
  getTlScreeners(screenercode: string) {
    return this.http.get(`${this.baseurl}/.netlify/functions/tlstockscreeners?screenercode=${screenercode}`);
  }
//Share Component


  getTlDvm() {
    return this.http.get(`${this.baseurl}/.netlify/functions/TLDVMread`);
  }
//Navbar Component
  // setTtVolume() {
  //   return this.http.get('https://render-express-e54x.onrender.com/api/ttvolnmcinsight');
  // }
  //Analytics Component
  getTtVolume() {
    return this.http.get(`${this.baseurl}/.netlify/functions/TTVolumeread`);
  }
//Homepage Component
  getEtIndicesData() {
    return this.http.get(`${this.baseurl}/.netlify/functions/etallindices`);
  }
//Homepage Component
  getEtAllSectorsData() {
    return this.http.get(`${this.baseurl}/.netlify/functions/etallsectors`);
  }
//Hompeage Component
getEtPredefinedFilters(selectedValue: string, filter: string, order: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/etpredefinedFilters?selectedvalue=${selectedValue}&filter=${filter}&order=${order}`);
}
//Homepage Component
getEtStockScoreScreeners(selectedValue: string, filter: string, order: string) {
  return this.http.get(`${this.baseurl}/.netlify/functions/etstockscorescreeners?selectedvalue=${selectedValue}&filter=${filter}&order=${order}`);
}
//Homepage Component
getNtGlobal() {
  return this.http.get(`${this.baseurl}/.netlify/functions/globalstocks`);
}
//Navbar Component
  getTlBuildup(tlid: string) {
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlynebuildup?tlid=${tlid}`);
  }
//Navbar Component
  getTlBuildup5() {
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlynebuildup5`);
  }
  //Analytics Component
  getNtVolumeRead() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntvolumeread`);
  }

  



 

 

 
//Banknifty Component,Navbar Component
  getNtBankNiftyPcrDetails() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntbankniftypcr`);
  }



 
}
