import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataapiService {
  public href: string = "";
  baseurl: any;
  stock: any;
  dbname: any;

  constructor(private http: HttpClient) {
    this.setBaseUrl();
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

  getopstrastockpcr(eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/opstrarefresh1?eqsymbol=${eqsymbol}`);
  }

  getopstrastockpcrintra(eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/opstrarefresh2?eqsymbol=${eqsymbol}`);
  }

  test1() {
    return this.http.get('https://kayal.trendlyne.com/clientapi/kayal/content/checklist-bypk/2633/');
  }

  getnteodscreeners(ntoptions) {
    return this.http.post(`${this.baseurl}/.netlify/functions/ntscreeners`, ntoptions);
  }

  gettrendlynepostdvm() {
    return this.http.get('https://render-express-e54x.onrender.com/api/trendlyneDVM');
  }

  setOpstracookie() {
    return this.http.get('https://render-express-e54x.onrender.com/api/Opstracookie');
  }

  getgnewsapi(bqnames, dateday5, datetoday) {
    return this.http.get(`${this.baseurl}/.netlify/functions/news?bqnames=${bqnames}&dateday5=${dateday5}&datetoday=${datetoday}`);
  }

  getetstockscorescreeners(selectedValue, filter, order) {
   
    return this.http.get(`${this.baseurl}/.netlify/functions/etstockscorescreeners?selectedvalue=${selectedValue}&filter=${filter}&order=${order}`);
  }

  getetpredefinedfilters(selectedValue, filter, order) {
    return this.http.get(`${this.baseurl}/.netlify/functions/etpredefinedFilters?selectedvalue=${selectedValue}&filter=${filter}&order=${order}`);
  }

  getttmmi() {
    return this.http.get(`${this.baseurl}/.netlify/functions/tickertapeapi`);
  }
  getntvolume() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntvolume`);
  }
  getnhc() {
    return this.http.get(`${this.baseurl}/.netlify/functions/nhc`);
  }
  getnhc1() {
    return this.http.get(`${this.baseurl}/.netlify/functions/nhc1`);
  }

  gettlindexparams(indexid, duration) {
    console.log(indexid, duration)
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlyneindex?indexid=${indexid}&duration=${duration}`);
  }
  getinvestingindicators(indexid, duration) {
    
    return this.http.get(`${this.baseurl}/.netlify/functions/investingindicators?indexid=${indexid}&duration=${duration}`);
  }

  getkite1(timeframe, eqsymbol) {
    return this.http.get(`${this.baseurl}/kite1?timeframe=${timeframe}&eqsymbol=${eqsymbol}`);
  }

  getkotakscore(stock) {
    return this.http.get(`${this.baseurl}/.netlify/functions/KotakScoreRead?stock=${stock}`);
  }

  getopstrarefresh() {
    return this.http.get(`${this.baseurl}/.netlify/functions/opstrarefresh`);
  }

  getkotaksectorview(sector) {
    return this.http.get(`${this.baseurl}/.netlify/functions/KotakSectorRead?sector=${sector}`);
  }

  test() {
    return this.http.get(`${this.baseurl}/.netlify/functions/node-fetch`);
  }

  getkitestockreports() {
    return this.http.get(`${this.baseurl}/kitestockreports`);
  }

  gettlscreeners(screenercode) {
    console.log(screenercode);
    return this.http.get(`${this.baseurl}/.netlify/functions/tlstockscreeners?screenercode=${screenercode}`);
  }

  getntstock1yr(eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntstock1yr?eqsymbol=${eqsymbol}`);
  }

  gettldvm() {
    return this.http.get(`${this.baseurl}/.netlify/functions/TLDVMread`);
  }

  

  settldvm() {
    return this.http.get('https://render-express-e54x.onrender.com/api/trendlyneDVM');
  }

  setttvolume() {
    return this.http.get('https://render-express-e54x.onrender.com/api/ttvolnmcinsight');
  }
 


  getttvolume() {
    return this.http.get(`${this.baseurl}/.netlify/functions/TTVolumeread`);
  }

  getetindicesdata() {
    return this.http.get(`${this.baseurl}/.netlify/functions/etallindices`);
  }

  getetallsectorsdata() {
    return this.http.get(`${this.baseurl}/.netlify/functions/etallsectors`);
  }

  gettlbuildup(tlid) {
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlynebuildup?tlid=${tlid}`);
  }

  gettlbuildup5() {
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlynebuildup5`);
  }

 

  getntvolumeread() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntvolumeread`);
  }

  getntstockpcrdetails(eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntstockpcrdetails?eqsymbol=${eqsymbol}`);
  }

  getntstockdetails(eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntstockdetails?eqsymbol=${eqsymbol}`);
  }

  getmmdata(stockid) {
    return this.http.get(`${this.baseurl}/.netlify/functions/mmdata?stockid=${stockid}`);
  }

  refreshtl() {
    return this.http.get(`${this.baseurl}/.netlify/functions/tlrefresh`);
  }

  tlrefresh() {
    return this.http.get(`${this.baseurl}/.netlify/functions/tlrefresh`);
  }

  getntniftypcrdetails() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntniftypcr`);
  }

  getntbankniftypcrdetails() {
    return this.http.get(`${this.baseurl}/.netlify/functions/ntbankniftypcr`);
  }

  getntglobal() {
    
    return this.http.get(`${this.baseurl}/.netlify/functions/globalstocks`);
  }

  gettrendlyne3fetch(tlid, tlname, eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/chrometrendlyne?tlid=${tlid}&tlname=${tlname}&eqsymbol=${eqsymbol}`);
  }

  chrometrendlyne() {
    return this.http.get(`${this.baseurl}/.netlify/functions/tlrefresh`);
  }

  gettrendlyne2fetch(tlid) {
    return this.http.get(`${this.baseurl}/.netlify/functions/trendlyne2?tlid=${tlid}`);
  }

  getopstrafetchstockpcr(eqsymbol) {
    return this.http.get(`${this.baseurl}/.netlify/functions/opstrafetchstockpcr?stock=${eqsymbol}`);
  }
}
