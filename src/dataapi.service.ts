import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})


export class DataapiService {
  public href: string = "";
  

    
baseurl:any;
  stock: any;
  dbname: any;
    
  location: Location;
  
  constructor(private http: HttpClient,  location: Location ) {
    if (window.location.hostname === "localhost") {
      this.baseurl = "http://localhost:9999"
    } else {
      this.baseurl = "https://stockinsights.netlify.app"
    } 
}
  ngOninit(): any{
    if (window.location.hostname === "localhost") {
      this.baseurl = "http://localhost:9999"
    } else {
      this.baseurl = "https://stockinsights.netlify.app"
    }
 
  }
 
  
 

  nsepostdata1(eqsymbol1) {
    return this.http.post(this.baseurl + '/nsepostdata1',eqsymbol1) 

  }
  nsepostdata2(eqsymbol1) {
   
    return this.http.post(this.baseurl + '/nsepostdata2',eqsymbol1) 
  }
  getnsedataniftyoi() {
    return this.http.get(this.baseurl+'/.netlify/functions/node-fetch1')
  }
  getnsedatabniftyoi() {
    return this.http.get(this.baseurl+'/.netlify/functions/node-fetch2')
  }
  // getnteodscreeners(ntoptions) {
  //   return this.http.post(this.baseurl + '/nteodscreeners',ntoptions)
  // console.log(ntoptions)
  // }
  getopstrastockpcr(eqsymbol) {
    
    return this.http.get(this.baseurl+'/.netlify/functions/opstrarefresh1?eqsymbol='+eqsymbol)
  }
  getopstrastockpcrintra(eqsymbol) {
    return this.http.get(this.baseurl+'/.netlify/functions/opstrarefresh2?eqsymbol='+eqsymbol)
  }
  test1() {
    return this.http.get('https://kayal.trendlyne.com/clientapi/kayal/content/checklist-bypk/2633/')
  }
  getnteodscreeners(ntoptions) {
    
    return this.http.post(this.baseurl+'/.netlify/functions/ntscreeners',ntoptions)
  
  }

  gettrendlynepostdvm(){
    
    return this.http.get('https://render-express-e54x.onrender.com/api/trendlyneDVM')
  }
  setOpstracookie(){
    
    return this.http.get('https://render-express-e54x.onrender.com/api/Opstracookie')
  }
 
  
  getgnewsapi(bqnames,dateday5,datetoday) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/news?bqnames='+bqnames+'&dateday5='+dateday5+'&datetoday='+datetoday)
  
  }
  getetstockscorescreeners(selectedValue,filter,order) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/etstockscorescreeners?selectedvalue='+selectedValue+'&filter='+filter+'&order='+order)
  
  }
  getetpredefinedfilters(selectedValue,filter,order) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/etpredefinedFilters?selectedvalue='+selectedValue+'&filter='+filter+'&order='+order)
  
  }
  getttmmi(){
    return this.http.get(this.baseurl+'/.netlify/functions/tickertapeapi')
  }
  gettlindexparams(indexid,duration) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/trendlyneindex?indexid='+indexid+'&duration='+duration)
  
  }
  getkite1(timeframe,eqsymbol){
    return this.http.get(this.baseurl + '/kite1?timeframe='+timeframe+'&eqsymbol='+eqsymbol)
  }
  getkotakscore(stock) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/KotakScoreRead?stock='+stock)
    
  }
 
  getopstrarefresh() {
   
    return this.http.get(this.baseurl+'/.netlify/functions/opstrarefresh')
    
  }
  getkotaksectorview(sector) {
    
    return this.http.get(this.baseurl+'/.netlify/functions/KotakSectorRead?sector='+sector)
  }
  
  test(){
    return this.http.get(this.baseurl+'/.netlify/functions/node-fetch') 
  }
  getkitestockreports(){
    return this.http.get(this.baseurl + '/kitestockreports')
  }
  getnsetry1(symbol){
    return this.http.get(this.baseurl + '/nsetry1?symbol='+symbol)
  }
 
 nseresults(){
    return this.http.get(this.baseurl + '/nseresults')
  }
  nseinstrading() {
    return this.http.get(this.baseurl + '/nseinstrading')
  }
  nsedatastockohlc1(stock){
    return this.http.get(this.baseurl + '/nsedatastockohlc1?stock='+stock)
  }
  nsedatasioi(){
    return this.http.get(this.baseurl + '/nsedatasioi')
  }
  nsedatastockoi(stock){
    return this.http.get(this.baseurl + '/nsedatastockoi?stock='+stock)
  }
  nsedatapioii(){
    return this.http.get(this.baseurl + '/nsedatapioii')
  }
  gettlscreeners(screenercode){
    console.log(screenercode)
    return this.http.get(this.baseurl+'/.netlify/functions/tlstockscreeners?screenercode='+screenercode)
  }
  getntstock1yr(eqsymbol) {
    return this.http.get(this.baseurl+'/.netlify/functions/ntstock1yr?eqsymbol='+eqsymbol) 
  }
  gettldvm(){
    return this.http.get(this.baseurl+'/.netlify/functions/TLDVMread') 
  }
  
  getmcinsightread(){
    return this.http.get(this.baseurl+'/.netlify/functions/mcinsightread') 
  }
  settldvm(){
    return this.http.get('https://render-express-e54x.onrender.com/api/trendlyneDVM') 
  }
  setttvolume(){
    return this.http.get('https://render-express-e54x.onrender.com/api/ttvolnmcinsight') 
  }
  getttvolume(){
    return this.http.get(this.baseurl+'/.netlify/functions/TTVolumeread') 
  }
  getetindicesdata() {
    return this.http.get(this.baseurl+'/.netlify/functions/etallindices') 
  }
  getetallsectorsdata() {
    return this.http.get(this.baseurl+'/.netlify/functions/etallsectors') 
  }
  gettlbuildup(tlid) {
    return this.http.get(this.baseurl+'/.netlify/functions/trendlynebuildup?tlid='+tlid) 
  }
  gettlbuildup5() {
    return this.http.get(this.baseurl+'/.netlify/functions/trendlynebuildup5') 
  }
 
  nsedataadvdec(){
    return this.http.get(this.baseurl + '/nsedataadvdec')
  }
  nsestockhistdata(stock) {
    return this.http.get(this.baseurl + '/nsestockhistdata?stock='+stock)
  }
  nsedataindices(){
    return this.http.get(this.baseurl + '/nsedataindices')
  }

  
  nsedatastockohlc2(stock){
    return this.http.get(this.baseurl + '/nsedatastockohlc2?stock='+stock)
  }
  nsedata3(){
    return this.http.get(this.baseurl + '/nsedata3')
  }
 

  getmmmarkets(){
    return this.http.get(this.baseurl + '/mmmarkets')
  }
  gettrendlynecookie(){
    return this.http.get(this.baseurl + '/trendlynecookie')

  }
  getopstracookie(){
    return this.http.get(this.baseurl + '/opstracookie')
  }
 
  getnse(){
    return this.http.get(this.baseurl + '/nse')
  }
  getnse1(){
    return this.http.get(this.baseurl + '/nse1')
  }
  getnse2(){
    return this.http.get(this.baseurl + '/nse2')
  }
  gettlrsiall() {
    
    return this.http.get(this.baseurl + '/tlrsiall')
  }
 
  getmcoverall(){
    return this.http.get(this.baseurl + '/mcoverall')
  }
  getmoneycontroloveralldaily(mcsymbol){
    return this.http.post(this.baseurl + '/moneycontroloveralldaily',mcsymbol)
  }
  getmcmovingaverages(mcsymbol){
    return this.http.post(this.baseurl + '/mcmovingaverages',mcsymbol)
  }
  getnr7(mcsymbol){
    return this.http.post(this.baseurl + '/nr7',mcsymbol)
  }
  getetcompanydata(companyid){
    return this.http.post(this.baseurl + '/etcompanydata',companyid)
  }
  getetcompanydataohlc(companyid){
    return this.http.get(this.baseurl + '/etcompanydataohlc?companyid='+companyid)
  }
  getetsectordetails(sectorid,etsectorname){
    return this.http.get(this.baseurl + '/etsectordetails?sectorid='+sectorid+'&&etsectorname='+etsectorname)
  }
  getetindexdetails(indexid,exchange){
    return this.http.get(this.baseurl + '/etindexdetails?indexid='+indexid+'&&exchange='+exchange)
  }
  
  getmccombine(mcsymbol){
    return this.http.post(this.baseurl + '/mccombine',mcsymbol)
  }
  
  getmcmovingaveragesview(stockisin,dbname) {
    
    return this.http.get(this.baseurl + '/mcmovingaveragesview?stockisin='+stockisin+"&&dbname="+dbname)
  }
  getkotakview(eqsymbol) {
    
    return this.http.get(this.baseurl + '/kotakview?eqsymbol='+eqsymbol)
  }
 
  getmcsectorcombine(mcsectorsymbol){
    return this.http.post(this.baseurl + '/mcsectorcombine',mcsectorsymbol)
  }
  getmoneycontrolti(mcsymbol){
    return this.http.post(this.baseurl + '/moneycontrolti',mcsymbol)
  }
  gettlstockchecklist(tlid){
    return this.http.get(this.baseurl + '/.netlify/functions/tlstockchecklist?tlid='+tlid)
  }
  getmcvolume(mcsymbol){
    return this.http.post(this.baseurl + '/mcvolume',mcsymbol)
  }
  getmcvolume1(mcsymbol1){
    return this.http.post(this.baseurl + '/mcvolume',mcsymbol1)
  }
  getmcinsight(mcsymbol){
    return this.http.post(this.baseurl + '/mcinsight',mcsymbol)
  }
  getmcinsightview(){
    return this.http.get(this.baseurl + '/mcinsightview')
  }
  dropmcinsightview() {
    return this.http.get(this.baseurl + '/dropmcinsightview')
  }
 
  getntstockpcrdetails(eqsymbol) {
 
    return this.http.get(this.baseurl+'/.netlify/functions/ntstockpcrdetails?eqsymbol='+eqsymbol)
  }
  getntstockdetails(eqsymbol) {
 
    return this.http.get(this.baseurl+'/.netlify/functions/ntstockdetails?eqsymbol='+eqsymbol)
  }
  getmmdata(stockid){
 
    return this.http.get(this.baseurl+'/.netlify/functions/mmdata?stockid='+stockid)
  }
  
  

  refreshtl() {
 
    return this.http.get(this.baseurl+'/.netlify/functions/tlrefresh')
  }
  tlrefresh(){
    return this.http.get('https://render-express-e54x.onrender.com/api/trendlynecookie')
  }
  getntniftypcrdetails() {
 
    return this.http.get(this.baseurl+'/.netlify/functions/ntniftypcr')
  }
  getntbankniftypcrdetails() {
 
    return this.http.get(this.baseurl+'/.netlify/functions/ntbankniftypcr')
  }
  
  getntglobal(){
    return this.http.get(this.baseurl+'/.netlify/functions/globalstocks')
  }

  
  
  gettrendlynestocks1(tlid, tlname, eqsymbol) {
   
    return this.http.get(this.baseurl + '/trendlynestocks1?tlid='+tlid+'&&tlname='+tlname+'&&eqsymbol='+eqsymbol)
  }
  gettrendlyne3fetch(tlid,tlname,eqsymbol) {

    return this.http.get(this.baseurl+'/.netlify/functions/chrometrendlyne?tlid='+tlid+'&tlname='+tlname+'&eqsymbol='+eqsymbol)
  }
 
  gettrendlyne2fetch(tlid) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/trendlyne2?tlid='+tlid)
  }
  getopstrafetchstockpcr(eqsymbol) {
   
    return this.http.get(this.baseurl+'/.netlify/functions/opstrafetchstockpcr?stock='+eqsymbol)
  }
 


  

  
  
  
  gettrendlynenifty() {
    return this.http.get(this.baseurl + '/trendlynenifty')
  }
  gettrendlynebanknifty() {
    return this.http.get(this.baseurl + '/trendlynebanknifty')
  }
  gettrendlynepharmanifty() {
    return this.http.get(this.baseurl + '/trendlynepharmanifty')
  }

  getniftytradersallstocks(){
    return this.http.get(this.baseurl + '/niftytradersallstocks')
  }
  getetpost1(){
    return this.http.get(this.baseurl + '/etpost1')
  }
  getetDIIBuying() {
    return this.http.get(this.baseurl + '/etDIIBuying') 
  }
  
  
 
  
  
 
 
 
}




