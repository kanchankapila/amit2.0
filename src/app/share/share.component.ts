import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import jsonp from 'jsonp-modernized';

import { DataapiService } from '../../dataapi.service'
import { PeriodsModel,ITooltipRenderEventArgs,IAxisLabelRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core';
import axios from "axios";
import {  ActivatedRoute } from '@angular/router';
import {RadioButton} from 'primeng/radiobutton';
import { HttpClient } from '@angular/common/http';
import * as  stocks from '../lists/stocklist'
import * as bqstock from '../lists/bqlist'
import * as etsector from '../lists/etsectorlist'
import * as etindex from '../lists/etindexlist'
import * as mcindex from '../lists/mcsectorlist'

import {  ChartOptions, ChartConfiguration, ChartType } from 'chart.js';

import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexYAxis, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexStroke } from "ng-apexcharts";

export type ChartOptions1 = { series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; yaxis: ApexYAxis; plotOptions: ApexPlotOptions; dataLabels: ApexDataLabels; stroke: ApexStroke; };
export interface stockcrossover { text1: any; text2: any; text3: any; }
export interface stockindicatorstile { text1: string; text2: string; text3: string; text4: string; }
export interface stockDatatiles { x: number; open: any; high: any; low: any; close: any; volume: any; }


export interface mcaptile { text1: string; text2: string; text3: string; }
export interface nptile { text1: string; text2: string; text3: string; }
export interface newscardtile { text1: string; text2: string; text3: string; text4: string; text5: string; }
export interface pbvtile { text1: string; text2: string; text3: string; }
export interface pegttmtile { text1: string; text2: string; text3: string; }
export interface pettmtile { text1: string; text2: string; text3: string; }
export interface scoretile { text: string; text1: string; } export interface scorettile { text: string; text1: string; }
export interface techscoretile { text: string; text1: string; text2: string; }
export interface vscoretile { text: string; text1: string; text2: string; }
export interface fscoretile { text: string; text1: string; text2: string; }
export interface qscoretile { text: string; text1: string; text2: string; }
export interface dscoretile { text1: any; text2: any; text3: any; text4: any;text5: any; text6: any;} export interface volscoretile { text1: any; text2: any; } export interface mscoretile { text1: any; text2: any; } export interface srtile { text1: string; text2: string; text3: string; }
export interface beta1tile { text1: string; text2: string; text3: string; }
export interface ema26tile { text1: string; text2: string; text3: string; }
export interface ema50tile { text1: string; text2: string; text3: string; }
export interface ema100tile { text1: string; text2: string; text3: string; }
export interface ema200tile { text1: string; text2: string; text3: string; }
export interface macd1tile { text1: string; text2: string; text3: string; }
export interface macdtile { text1: string; text2: string; text3: string; } export interface macdstile { text1: string; text2: string; text3: string; } export interface mfitile { text1: string; text2: string; text3: string; }
export interface rsitile { text1: string; text2: string; text3: string; }
export interface rsi1tile { text1: string; text2: string; text3: string; } export interface sma30tile { text1: string; text2: string; text3: string; } export interface sma50tile { text1: string; text2: string; text3: string; } export interface sma100tile { text1: string; text2: string; text3: string; } export interface sma200tile { text1: string; text2: string; text3: string; } export interface yr1rtrntile { text1: string; text2: string; text3: string; } export interface rtrn1yvsnftytile { text1: string; text2: string; text3: string; }
export interface positivetile { text1: string; text2: string; text3: string; } export interface negativetile { text1: string; text2: string; text3: string; } export interface neutraltile { text1: string; text2: string; text3: string; } export interface stockematile { text1: string; text2: string; text3: string; text4: string; text5: string; text6: string; text7: string; }
export interface stocksmatile { text1: string; text2: string; text3: string; text4: string; text5: string; text6: string; text7: string; }
export interface stocksentimentstiles { text1: string; text2: string; }
export interface stockhcdatatile { x: number; y: number; }
export interface stockcrossovertile { text1: any; text2: any; text3: any; text4: any; }
export interface stockcrossoverwtile { text1: any; text2: any; text3: any; text4: any; }
export interface stockcrossovermtile { text1: any; text2: any; text3: any; text4: any; }
export interface stockohlctile { x: number; y: [any]; }
export interface stockohlc1yrtile { x: any; open: number,high:number,low:number,close:number,volume:number; }
export interface stockohlc1dtile { x: any; open: number,high:number,low:number,close:number,volume:number; }
export interface stockohlcvolumetile { x: any; y: number; }
export interface stockohlc1wtile { c: number; o: number; h: number; l: number; x: number; }
export interface etstockohlctodaytile { c: number; o: number; h: number; l: number; x: number; }
export interface brokerrecodowngradetile { text1: string; text2: string; text3: string; }
export interface brokerrecoupgradetile { text1: string; text2: string; text3: string; }
export interface brokertargettile { text1: string; text2: string; text3: string; }
export interface ema_26tile { text1: string; text2: string; text3: string; text4: string; }
export interface ema_50tile { text1: string; text2: string; text3: string; text4: string; }
export interface ema_100tile { text1: string; text2: string; text3: string; text4: string; }
export interface ema_200tile { text1: string; text2: string; text3: string; text4: string; }
export interface sma_30tile { text1: string; text2: string; text3: string; text4: string; }
export interface sma_50tile { text1: string; text2: string; text3: string; text4: string; }
export interface sma_100tile { text1: string; text2: string; text3: string; text4: string; }
export interface sma_200tile { text1: string; text2: string; text3: string; text4: string; }
export interface macd1tile { text1: string; text2: string; text3: string; text4: string; }
export interface macdsignal1tile { text1: string; text2: string; text3: string; text4: string; }
export interface rsi1tile { text1: string; text2: string; text3: string; text4: string; }
export interface newscardtile { text1: string; text2: string; text3: string; text4: string; text5: string; }
export interface mfi1tile { text1: string; text2: string; text3: string; text4: string; }
export interface brokertargetdowngradetile { text1: string; text2: string; text3: string; }
export interface brokertargetupgradetile { text1: string; text2: string; text3: string; }
export interface divscoretile { text1: string; text2: string; }
export interface fnomsg1tile { text1: string; text2: string; }
export interface dealsmsgtile { text1: string; text2: string; }
export interface shareholdingmsgtile { text1: string; text2: string; }
export interface rbsscoretile { text1: string; text2: string; }
export interface kvscoretile { text1: string; text2: string; }
export interface kqscoretile { text1: string; text2: string; }
export interface omrscoretile { text1: string; text2: string; }
export interface growthscoretile { text1: string; text2: string; }
export interface healthscoretile { text1: string; text2: string; }
export interface ppscoretile { text1: string; text2: string; }
export interface sectorstockstile { text1: string; text2: string; text3: string; }
export interface stockdetailstile { text1: any; text2: any; text3: any; text4: any;text5: any;text6: any;text7: any;text8: any; }
export interface sectorstockdetailstile { text1: any; text2: any; text3: any; text4: any; }
export interface stockpcrtile { text1: any; text2: any; }
export interface maxpaintile { text1: any; text2: any; }
export interface tlindexparamtile{text1: string;text2: string;text3: string;}



@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
@Injectable()
export class ShareComponent implements OnInit {
 
//Initializing Chart Width




  

public width: string = Browser.isDevice ? '100%' : '30%';


 

  // custom code end
 public radius: string = Browser.isDevice ? '40%' : '40%'
 public startAngle: number = Browser.isDevice ? 62 : 0 ;

 public titlesh: string = 'Shareholdings';
   
 
public markerpv: Object = {
    dataLabel: {
        visible: true,
        position: 'Top',
        font: {
            fontWeight: '600', color: '#ffffff'
        }
    }
}
//Initializing Primary X Axis

public tooltippv: Object = {
    enable: false
};
public legendpv: Object = {
    visible: false,
    enableHighlight : false
}
  // custom code start

  // custom code end
public titlepv: string = 'Volume Analysis';
  visibleSidebar5;
  res;
  @ViewChild("chart") chart: ChartComponent;
 
  // The Dialog shows within the target element.
  public targetElement;

  public chartCandleOptions: Partial<ChartOptions1>;
  public chartBarOptions: Partial<ChartOptions1>;
  public series1: Object[] = [];
  public point1: Object;
  
  public position2: object={ X: 10, Y: 240 };
  public showCloseIcon: Boolean = false;
  public visible: Boolean = false;
  public visible1: Boolean = false;
  public visible2: Boolean = false;
  baseurl:any
  

  
  constructor(private datePipe: DatePipe, private http: HttpClient, private primengConfig: PrimeNGConfig, private dataApi: DataapiService, private route: ActivatedRoute) {
    if (window.location.hostname === "localhost") {
      this.baseurl = "http://localhost:9999"
    } else {
      this.baseurl = "https://stockinsights.netlify.app"
    } 
   }
  selectedValue: string;

  ngAfterViewInit() {
    RadioButton.prototype.select = function () {
      if (!this.disabled) {
          this.inputViewChild.nativeElement.checked = true;
          this.checked = true;
          this.onModelChange(this.value);
          this.onClick.emit(null);
      }
  };
  } 
  public stockhcdate: Array<any> = [];
  public stockohlc: Array<any> = [];
  public stockohlc1yr: stockohlc1yrtile[] = [];
  public stockohlc1d: stockohlc1dtile[] = [];
  public stockohlcvolume: stockohlcvolumetile[] = [];
  public stockohlc1w: stockohlc1wtile[] = [];
  public etstockohlctoday: etstockohlctodaytile[] = [];
  public stockhcvalue: Array<any> = [];
  public stockdata1: Array<number> = [];
  //public stockLabels: Array<any> = [];
  public stockChartLabels: Array<number> = [];
  public stockpcrdata: Array<number> = [];
  public stockpcrtime: Array<any> = [];
  public stockvixdata: Array<number> = [];
  public stockvixtime: Array<any> = [];
  public stockData1: Array<any> = [];
  public stockOptions: any;
  public stock1wdata: Array<number> = [];
  public stock1wLabels: Array<any> = [];
  public stock1wData: Array<any> = [];
  public stock1ddata: Array<number> = [];
  public stock1dLabels: Array<any> = [];
  public stockLabels: Array<any> = [];
  public stockData: Array<any> = [];
  public stock1mdata: Array<number> = [];
  public stock1mLabels: Array<any> = [];
  public stock1mData: Array<any> = [];
  public stock3mdata: Array<number> = [];
 
  public opstrastockpcrdata: Array<number> = [];

  public opstrastockpcrintradata: Array<number> = [];
  public opstrastockpcrData: Array<any> = [];
  public opstrastockLabels: any;
  public opstrastockintraLabels: any;
  public opstrastockpcrLabels: Array<any> = [];
  public opstrastockpcrintraLabels: Array<any> = [];
  public opstrastockpcrintraData: Array<any> = [];

  public stock3mLabels: Array<any> = [];
  public stock3mData: Array<any> = [];
  public stock6mdata: Array<number> = [];
  public stock6mLabels: Array<any> = [];
  public stock6mData: Array<any> = [];
  public stock1yrdata: Array<number> = [];
  public stock1yrLabels: Array<any> = [];
  public stock1yrData: Array<any> = [];
  public stockpcrData: Array<any> = [];
  public stockpcrLabels: Array<number> = [];
  public stockvixData: Array<any> = [];
  public stockvixLabels: Array<number> = [];
  public lineChartmacdwLabels: Array<any> = [];
  public lineChartmacdmLabels: Array<number> = [];;
  public lineChartDatamacdm: Array<number> = [];
  public lineChartDatasignalm: Array<number> = [];
  public lineChartDatapricemacdm: Array<number> = [];
  public lineChartDatamaday50m: Array<number> = [];
  public lineChartDatamaday200m: Array<number> = [];
  public lineChartDatamapricem: Array<number> = [];
  public lineChartDatamadate: Array<number> = [];
  public lineChartDatamaflag: Array<number> = [];
  public lineChartDatabbuband: Array<number> = [];
  public lineChartDatabblband: Array<number> = [];
  public lineChartDatabbdma20: Array<number> = [];
  public lineChartDatabbdate: Array<number> = [];
  public lineChartDatabbprice: Array<number> = [];
  public lineChartDatakst: Array<number> = [];
  public lineChartDatakstprice: Array<number> = [];
  public lineChartDatakstsignal: Array<number> = [];
  public lineChartDatakstdate: Array<number> = [];
  public lineChartDataobvdate: Array<number> = [];
  public lineChartDataobv: Array<number> = [];
  public lineChartDataobvprice: Array<number> = [];
  public lineChartDatadowdate: Array<number> = [];
  public lineChartDatadowprice: Array<number> = [];
  public lineChartDatadowscore: Array<number> = [];
  public lineChartDatadowflag: Array<number> = [];
  public lineChartDatamacdw: Array<number> = [];
  public lineChartDatagrademacdm: Array<number> = [];
  public lineChartDatasignalw: Array<number> = [];
  public lineChartDatapricemacdw: Array<number> = [];
  public lineChartDatapricersiw: Array<number> = [];
  public lineChartDatapricersim: Array<number> = [];
  public lineChartrsimLabels: Array<any> = [];
  public lineChartrsiwLabels: Array<any> = [];
  public lineChartDatarsiw: Array<number> = [];
  public lineChartDataubandw: Array<number> = [];
  public lineChartDatalbandw: Array<number> = [];
  public lineChartDatarsim: Array<number> = [];
  public lineChartDataubandm: Array<number> = [];
  public lineChartDatalbandm: Array<number> = [];
  tlindexparam:tlindexparamtile[]=[];
  
  
  public columnTooltip: boolean = false;
  public primaryXAxis: Object = { majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } };
  public chartAreapv: Object = {
    border: {
      width: 0
    }
  };
  public primaryYAxis: Object = {
    lineStyle: { color: 'transparent' },
    majorTickLines: { color: 'transparent', width: 0 },
  };
  public crosshair: Object = {
    enable: true
  };
  public tooltipRender(args: ITooltipRenderEventArgs): void {
    if (args.text.split('<br/>')[4]) {
      let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
      let value: string = (target / 100000000).toFixed(1) + 'B';
      args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
  };
 
  

  public tooltip: object = { enable: true };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public enable: boolean = true;
  
  public primaryXAxis1: Object = {
    valueType: 'DateTime', majorGridLines: { color: 'transparent' },
    crosshairTooltip: { enable: true }
  };

  public primaryYAxis1: Object = {
    lineStyle: { color: 'transparent' },
    majorTickLines: { color: 'transparent', width: 0 },
    crosshairTooltip: { enable: true }
  };
  public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
    let text: number = parseInt(args.text, 10);
    if (args.axis.name === 'primaryYAxis1') {
      args.text = text / 100000000 + 'B';
    }
  };
  public periods: PeriodsModel[] = [
    { intervalType: 'Minutes', interval: 1, text: '1m' },
    { intervalType: 'Minutes', interval: 15, text: '15m' },
    { intervalType: 'Minutes', interval: 30, text: '30m' },
    { intervalType: 'Minutes', interval: 45, text: '45m' },
    { intervalType: 'Hours', interval: 1, text: '1H' },
    { intervalType: 'Hours', interval: 2, text: '2H' },
    { intervalType: 'Hours', interval: 4, text: '4H' },
    { intervalType: 'Hours', interval: 12, text: '12H', selected: true },
    { intervalType: 'Auto', text: '1D' }
  ];
  public periods1: PeriodsModel[] = [
    
    { intervalType: 'Weeks', interval: 1, text: '1w' },
    { intervalType: 'Months', interval: 1, text: '1M' },
    { intervalType: 'Months', interval: 3, text: '3M', selected: true },
    { intervalType: 'Months', interval: 6, text: '6M' },
    { intervalType: 'Months', interval: 9, text: '9M' },
    { intervalType: 'Years', interval: 1, text: '1Y' },
    { intervalType: 'Auto', text: '1W' }
  ];
  public seriesType: string[] = [];
  public indicatorType: string[] = [];
  public trendlineType: string[] = [];
  public exportType: string[] = [];
  stockcrossover: stockcrossovertile[] = [];
  stockcrossoverw: stockcrossoverwtile[] = [];
  stockcrossoverm: stockcrossovermtile[] = [];
  vscore: vscoretile[] = [];
  fscore: fscoretile[] = [];
  qscore: qscoretile[] = [];
  dscore: dscoretile[] = [];
  
  previousclose: Array<number> = [];
  pclose:any;
  volscore: volscoretile[] = [];
  mscore: mscoretile[] = [];
  techscore: techscoretile[] = [];
  score: scoretile[] = [];
  scoret: scorettile[] = [];
  divscore: divscoretile[] = [];
  rbsscore: rbsscoretile[] = [];
  kvscore: kvscoretile[] = [];
  kqscore: kqscoretile[] = [];
  ppscore: ppscoretile[] = [];
  growthscore: growthscoretile[] = [];
  healthscore: healthscoretile[] = [];
  omrscore: omrscoretile[] = [];
  sectorstocks: sectorstockstile[] = [];
  stockpcr: stockpcrtile[] = [];
  maxpain: maxpaintile[] = [];
  newscard: newscardtile[] = [];
  hmsg: any;
  fnomsg:any;
  fnomsg1: fnomsg1tile[] = [];
  dealsmsg:dealsmsgtile[] = [];
  shareholdingmsg:shareholdingmsgtile[] = [];
  brokertarget: brokertargettile[] = [];
  brokertargetdowngrade: brokertargetdowngradetile[] = [];
  mcsymbol1: any;
  brokerrecoupgrade: brokerrecoupgradetile[] = [];
  brokerrecodowngrade: brokerrecodowngradetile[] = [];
  brokertargetupgrade: brokertargetupgradetile[] = [];
  ema_26: ema_26tile[] = [];
  ema_50: ema_50tile[] = [];
  ema_100: ema_100tile[] = [];
  ema_200: ema_200tile[] = [];
  sma_30: sma_30tile[] = [];
  sma_50: sma_50tile[] = [];
  sma_100: sma_100tile[] = [];
  sma_200: sma_200tile[] = [];
  macd1: macd1tile[] = [];
  macdsignal1: macdsignal1tile[] = [];
  rsi1: rsi1tile[] = [];
  // rsi:rsitile[] = [];
  mfi1: mfi1tile[] = [];
  // mfi:mfitile[] = [];
  nr7: any;
  basicData: any;
  weatherdata: any;
  mmdelivcomp: any;
  basicOptions: any;
  basicData1: any;
  basicOptions1: any;
  companyname: string;
  sectorid: any;
  today: any;
  datetoday: any;
  dateyearback:any

  dateyesterday: any
  date5: any
  dateday5: any
  //chart: any;
  stockindicators: stockindicatorstile[] = [];
  public primaryXAxispv: Object;
  public primaryYAxispv: Object;
  public primaryXAxis2: Object;
  public primaryYAxis2: Object;
  public legendSettingssh: Object;
  public tooltipsh: Object;
  public dataLabelsh: Object;
 
  public dataValues: Object[] = [];
  public datapv: Object[] = [];
  public datash: Object[] = [];
  public stockhcdate1: Array<any> = []; 
  mcap: mcaptile[] = [];
  np: nptile[] = [];
  pbv: pbvtile[] = [];
  pegttm: pegttmtile[] = [];
  pettm: pettmtile[] = [];
  sr: srtile[] = [];
  beta1: beta1tile[] = [];
  ema26: ema26tile[] = [];
  ema50: ema50tile[] = [];
  ema100: ema100tile[] = [];
  ema200: ema200tile[] = [];
  mfi: mfitile[] = [];
  rsi: rsitile[] = [];
  macd: macdtile[] = [];
  macds: macdstile[] = [];
  sma30: sma30tile[] = [];
  sma50: sma50tile[] = [];
  sma100: sma100tile[] = [];
  sma200: sma200tile[] = [];
  yr1rtrn: yr1rtrntile[] = [];
  rtrn1yvsnfty: rtrn1yvsnftytile[] = [];
  positive: positivetile[] = [];
  negative: negativetile[] = [];
  neutral: neutraltile[] = [];
  stockema: stockematile[] = [];
  stocksma: stocksmatile[] = [];
  stockdetails1: stockdetailstile[] = [];
  sectorstockdetails1: sectorstockdetailstile[] = [];
  public data1: Object[] = [];
  public data2: Object[] = [];
  public stockDataema5: Array<number> = [];
  public stockDataema10: Array<number> = [];
  public stockDataema20: Array<number> = [];
  public stockDataema30: Array<number> = [];
  public stockDataema50: Array<number> = [];
  public stockDataema100: Array<number> = [];
  public stockDataema200: Array<number> = [];
  public stockDatasma5: Array<number> = [];
  public stockDatasma10: Array<number> = [];
  public stockDatasma20: Array<number> = [];
  public stockDatasma30: Array<number> = [];
  public stockDatasma50: Array<number> = [];
  public stockDatasma100: Array<number> = [];
  public stockDatasma200: Array<number> = [];
  public delivperc: Array<number> = [];
  public delivperctime: Array<number> = [];
  public volume: Array<number> = [];
  public volumetime: Array<number> = [];
  stockhcdata: stockhcdatatile[] = [];
  stocksentiments: stocksentimentstiles[] = [];
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<number> = [];
  public DelivData: Array<any> = [];
  public DelivLabels: Array<number> = [];
  public VolumeData: Array<any> = [];
  public VolumeLabels: Array<number> = [];
  public stockDatasnrr1: Array<number> = [];
  public stockDatasnrr2: Array<number> = [];
  public stockDatasnrr3: Array<number> = [];
  public stockDatasnrs1: Array<number> = [];
  public stockDatasnrs2: Array<number> = [];
  public stockDatasnrs3: Array<number> = [];
  public stockLabelssnrr1: Array<any> = [];
  public stockLabelsnrr3: Array<any> = [];
  public stockLabelssnrr2: Array<any> = [];
  public stockLabelssnrs1: Array<any> = [];
  public stockLabelssnrs2: Array<any> = [];
  public stockLabelssnrs3: Array<any> = [];
  public stockDatasnrr1w: Array<number> = [];
  public stockDatasnrr2w: Array<number> = [];
  public stockDatasnrr3w: Array<number> = [];
  public stockDatasnrs1w: Array<number> = [];
  public stockDatasnrs2w: Array<number> = [];
  public stockDatasnrs3w: Array<number> = [];
  public stockLabelssnrr1w: Array<any> = [];
  public stockLabelsnrr3w: Array<any> = [];
  public stockLabelssnrr2w: Array<any> = [];
  public stockLabelssnrs1w: Array<any> = [];
  public stockLabelssnrs2w: Array<any> = [];
  public stockLabelssnrs3w: Array<any> = [];
  public stockDatasnrr1m: Array<number> = [];
  public stockDatasnrr2m: Array<number> = [];
  public stockDatasnrr3m: Array<number> = [];
  public stockDatasnrs1m: Array<number> = [];
  public stockDatasnrs2m: Array<number> = [];
  public stockDatasnrs3m: Array<number> = [];
  public stockLabelssnrr1m: Array<any> = [];
  public stockLabelsnrr3m: Array<any> = [];
  public stockLabelssnrr2m: Array<any> = [];
  public stockLabelssnrs1m: Array<any> = [];
  public stockLabelssnrs2m: Array<any> = [];
  public stockLabelssnrs3m: Array<any> = [];
  public apexohlc = [];
  
  public apexvolume: Array<any> = [];
  public stockChartType: ChartType = 'line';
  public DelivChartType: ChartType = 'bar';
  public stockChartData1y: ChartConfiguration['data']
  public macdChartData: ChartConfiguration['data']
  public rsiChartData: ChartConfiguration['data']
  public maChartData: ChartConfiguration['data']
  public bbChartData: ChartConfiguration['data']
  public kstChartData: ChartConfiguration['data']
  public dowChartData: ChartConfiguration['data']
  public obvChartData: ChartConfiguration['data']
  public stockChartData1w: ChartConfiguration['data']
  public etstockChartData: ChartConfiguration['data']
  public stockChartOptions: ChartOptions = {
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


  basicData3: any;
  basicOptions3: any;
  stockList: any
  etsectors: any
  etindexs: any
  stock: any
  mcsymbol2:any
  bqstocks: any
  mcindexs: any
  eqsymbol: any
  tlid: any
  tlname: any
  bbmsg: any
  dowmsg: any
  title: string;
  kstmsg: any
  mamsg: any
  macdmsg: any
  obvmsg: any
  rsimsg: any
  stockname: any
  stockisin: any
  mcsymbol: any
  mcsymbolname: any
  stockid: any
  all_cookies: any;
  bqnames: any
  companyid: any
  indexid:any;
  duration:any;
  todayepoch: any
  yesterday: any
  yesterdayepoch: any
  date: any
  yearback: any
  yearbackepoch: any
  firstDay: any
  lastDay: any
  monthLastDay:any
  hours:any;
  minutes:any;
  time:any;
  // periods: any
  
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
   
    this.primengConfig.ripple = true;
    this.today = new Date();
    
    this.datetoday = this.datePipe.transform(this.today, 'yyyy-MM-dd')
    this.dateyesterday = this.datePipe.transform(this.today.setDate(this.today.getDate() - 1), 'yyyy-MM-dd')
    this.dateday5 = this.datePipe.transform(this.today.setDate(this.today.getDate() - 5), 'yyyy-MM-dd')
      
    
    this.date = new Date();
    
    this.todayepoch = Math.floor(this.date.getTime() / 1000);
   
    
    this.yesterday = (new Date(this.date.getFullYear(), this.date.getMonth(), new Date().getDate() - 1))
    this.yearback = (new Date(this.date.getFullYear(), this.date.getMonth(), new Date().getDate() - 365))
    this.yesterdayepoch = Math.floor(this.yesterday.getTime() / 1000);
    this.yearbackepoch= Math.floor(this.yearback.getTime()/1000);

    this.firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  
    this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
   
    this.monthLastDay = Math.floor(this.lastDay.getTime()/1000);
    
  

    this.stockList = stocks.default.Data
    this.stock = stocks.default.Data
    this.bqstocks = bqstock.default.Data
    this.etsectors = etsector.default.Data
    this.etindexs = etindex.default.Data
    this.mcindexs = mcindex.default.Data
    this.route.queryParams.subscribe(params => {
      this.eqsymbol = this.stockList.filter(i => i.isin == params.stock)[0].symbol
      this.tlid = this.stockList.filter(i => i.isin == params.stock)[0].tlid
      this.indexid=this.tlid;
      this.tlname = this.stockList.filter(i => i.isin == params.stock)[0].tlname
      this.stockname = this.stockList.filter(i => i.isin == params.stock)[0].name
      this.title = this.stockname;
      this.stockisin = this.stockList.filter(i => i.isin == params.stock)[0].isin
      this.mcsymbol = this.stockList.filter(i => i.isin == params.stock)[0].mcsymbol
      this.mcsymbolname = this.stockList.filter(i => i.isin == params.stock)[0].mcsymbol
      this.stockid = this.stockList.filter(i => i.isin == params.stock)[0].stockid
      this.bqnames = this.stockList.filter(i => i.isin == params.stock)[0].bqname
      this.companyid = this.stockList.filter(i => i.isin == params.stock)[0].companyid
    });
   await Promise.all([
    
    
    this.getmcpricevolume(this.mcsymbol),
    this.getetshareholding(this.stockid),
    this.gettrendlynestocks2(this.tlid),
    //this.gettrendlynestocks3(this.tlid)
    this.getshare3m(this.eqsymbol),
    this.getopstrastockpcr(this.eqsymbol),
    this.getopstrastockpcrintra(this.eqsymbol),
    // this.getzerodha(),
    // this.getkotak(),
    this.gettlstockparams(this.tlid,this.duration),
    this.gettrendlynestocksti(this.tlid),
    this.getkotakview(this.eqsymbol),
    this.getmcstockinsight(this.mcsymbol),
    
    this.getshare1m(this.eqsymbol),
    this.getmmdata(this.stockid),
    this.getshare6m(this.eqsymbol),
    this.getshare1w(this.eqsymbol),
    // this.getntstock1yr(this.eqsymbol)
    this.getmcstockohlc1yr(this.eqsymbol,this.yearbackepoch,this.todayepoch),
    this.getgnewsapi(this.bqnames, this.dateday5, this.datetoday),
    this.getntstockdetails(this.eqsymbol),
    this.getntstockpcrdetails(this.eqsymbol),
    this.getmcstockrealtime(this.mcsymbol),
    this.getstocktoday(this.mcsymbol, this.eqsymbol),
    this.getstocktoday1(this.mcsymbol),
    this.getstockmaema(this.eqsymbol),
    this.getstocksentiments(this.mcsymbol),
    this.getntstockdetails(this.eqsymbol),
    // this.gettrendlynestocks1(this.tlid, this.eqsymbol, this.tlname)
    this.gettrendlyne3fetch(this.tlid, this.eqsymbol, this.tlname)]
   )
    //  this.getmcstocktodayohlc(this.mcsymbol)
    // this.getetsharetoday(this.eqsymbol)
    setInterval(() => { this.getstocktoday(this.mcsymbol, this.eqsymbol) }, 30000);
    //setInterval(() => { this.getetsharetoday(this.mcsymbol) }, 60000);
    setInterval(() => { this.getmcstockrealtime(this.mcsymbol) }, 3000);
     setInterval(() => {this.getmcpricevolume(this.mcsymbol)}, 3000);
      setInterval(() => {this.opstrarefresh()},86400000);
     
    
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
  this.displayMaximizable2 = true;
} 
displayMaximizable3: boolean;
showMaximizableDialog3() {
  this.displayMaximizable3 = true;
} 
displayMaximizable4: boolean;
showMaximizableDialog4() {
  this.displayMaximizable4 = true;
}  


  gettlstockparams(indexid,selectedValue){
    // this.indexid='1898';
   
    this.dataApi.gettlindexparams(this.indexid,this.selectedValue).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.tlindexparam.length=0;
      

      for(let val in nestedItems[0].body.parameters){
        if(nestedItems[0].body.parameters[val].hasOwnProperty('name')){
        this.tlindexparam.push({ text1:nestedItems[0].body.parameters[val].name,text2:nestedItems[0].body.parameters[val].value,text3:nestedItems[0].body.parameters[val].color})
      }else{continue;}
    };
     })
  }





  onClick(event) {
  this.gettlstockparams(this.indexid,this.selectedValue)
  
}

 opstrarefresh() {
 
     this.http.get(this.baseurl+'/.netlify/functions/opstrarefresh').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      console.log(nestedItems)
  // this.dataApi.getopstrarefresh();
    console.log("Opstrarefresh is hit")
  });
   };

    
 

 async getkotakview(eqsymbol) {
    this.dataApi.getkotakhealthscore(eqsymbol).subscribe(data => {
      let nestedItems = Object.keys(data).map(key => {
        return data[key];
      });
     
      if(nestedItems[0].length != 0){
      this.divscore.push({ text1: nestedItems[0][0].DividendScore, text2: "Dividend" })
       
        this.growthscore.push({ text1: nestedItems[0][0].GrowthScore, text2: "Growth" })
   
    this.healthscore.push({ text1: nestedItems[0][0].HealthScore, text2: "Health" }),
        this.omrscore.push({ text1: nestedItems[0][0].OverallMarketRank, text2: "Market Rank" }),
        this.kqscore.push({ text1: nestedItems[0][0].QualityScore, text2: "Quality" }),
        this.rbsscore.push({ text1: nestedItems[0][0].RankBySector, text2: "Sector Rank" }),
        this.kvscore.push({ text1: nestedItems[0][0].ValueScore, text2: "Value" }),
        this.ppscore.push({ text1: nestedItems[0][0].PastPerformanceScore, text2: "Past Performance" })
      this.sectorid = nestedItems[0][0].SectorId
      }
      
      this.dataApi.getkotaksectorview(this.sectorid).subscribe(async data => {
        let nestedItems = Object.keys(data).map(key => {
          return data[key];
        });
      
         for (let val in nestedItems[0]) {
        
         
           if((this.stockList.filter(i => i.symbol == nestedItems[0][val].CompanyShortName)).length == 0){
          
            continue;
          
            
           }else{
          
           this.mcsymbol1=(this.stockList.filter(i => i.symbol == nestedItems[0][val].CompanyShortName)[0].mcsymbol)
          
             await this.getmcstockrealtime1(this.mcsymbol1)
          
           }
             
           
        }
        
       
      });
    }, err => {
      console.log(err)
    })
  }
  getkotak() {
    this.http.get<any>('https://kayal.trendlyne.com/broker-webview/all-in-one-screener-get/kayal/?perPageCount=25&pageNumber=0&screenpk=82596&groupType=all&groupName=').subscribe(data5 => {
      // let nestedItems = Object.keys(data5).map(key => {
      //   return data5[key];
      // });
      // console.log(nestedItems) To be explored
    })
  }
  async getgnewsapi(bqnames,dateday5,datetoday) {
    this.dataApi.getgnewsapi(this.bqnames,this.dateday5,this.datetoday).subscribe(async data => {
      let nestedItems = Object.keys(data).map(key => {
        return data[key];
      });
      
 this.newscard.length = 0;
       for (let val in nestedItems[0].articles) {
         this.newscard.push({text1:nestedItems[0].articles[val].title,text2:nestedItems[0].articles[val].url,text3:nestedItems[0].articles[val].urlToImage,text4:nestedItems[0].articles[val].description,text5:nestedItems[0].articles[val].content})
        }
       
     
     
});
       
  }  
    
   


   
  
  gettrendlynestocksti(tlid) {
    axios.get('https://trendlyne.com/mapp/v1/stock/adv-technical-analysis/' + this.tlid + '/24/')
      .then((response) => {
        let nestedItems = Object.keys((response.data)).map(key => {
          return (response.data)[key];
        });;
         console.log(nestedItems)
      });
  }
  async getetshareholding(stockid) {
  
      try {
        
        
      this.http.get("https://www.bqprime.com/next/feapi/stock/"+this.stockid+"/shareholding-snapshot").subscribe(data5 => {
        let nestedItems = Object.keys(data5).map(key => {
          return data5[key];
        });
         
         
     this.legendSettingssh= {
        visible: true,
    };
    this.tooltipsh = {
      enable: true,
      header: '',
      format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>'
   };
    //Initializing DataLabel
    this.dataLabelsh= {
        visible: true,
        name: 'DataLabelMappingName',
        position: 'Inside',
        font: {
            fontWeight: '100',
        },
        connectorStyle: { 
            length: '20px',
            type: 'Curve'
         },
         
    };
  
  for(let val in nestedItems[0]['chart']){
        
          
          this.datash.push({value:nestedItems[0]['chart'][val].value,DataLabelMappingName:nestedItems[0]['chart'][val].label})
    
        }
        
      });
    
  } catch (err) {
    console.error(err);
  }
  } 
    
  
  
  
  async getmcpricevolume(mcsymbol) {
  try {
    const response = await fetch("https://api.moneycontrol.com/mcapi/v1/stock/price-volume?scId="+this.mcsymbol, {
      method: 'GET',
      headers: {
       
      }
    });
  
    if (response.ok) {
      const pricevolume = await response.json();
      this.primaryXAxispv=  {
        valueType: 'Category',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
     this.primaryYAxispv= {
        labelFormat: '{value}',
        
        edgeLabelPlacement: 'Shift',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
    }; 
      
      this.datapv.length=0;
      for(let val in pricevolume['data']['stock_price_volume_data']['volume']){
      
         this.datapv.unshift({Day:val,cvol:pricevolume['data']['stock_price_volume_data']['volume'][val].cvol,delivery:pricevolume['data']['stock_price_volume_data']['volume'][val].delivery})
      }
      
      
    }
  } catch (err) {
    console.error(err);
  }
  }
  async getmcstockinsight(mcsymbol) {
    try {
      const response = await fetch("https://api.moneycontrol.com//mcapi//v1//extdata//mc-insights?scId="+this.mcsymbol+"&type=d", {
        method: 'GET',
        headers: {
         
        }
      });
    
      if (response.ok) {
        const insight = await response.json();
        if(insight['data']['insightData']['price'].hasOwnProperty('5')){
        this.dealsmsg.length=0;
       this.dealsmsg.push({text1:insight['data']['insightData']['price'][5]['shortDesc'],text2:insight['data']['insightData']['price'][5]['color']})
        }
        this.shareholdingmsg.length=0;
       for(let val in insight['data']['insightData']['shareholding']){
       this.shareholdingmsg.push({text1:insight['data']['insightData']['shareholding'][val]['shortDesc'],text2:insight['data']['insightData']['shareholding'][val]['color']})
        }
        if(insight['data']['insightData']['price'].hasOwnProperty('4')){
         this.fnomsg=insight['data']['insightData']['price'][4]['shortDesc']
this.fnomsg1.length=0;
if(this.fnomsg.includes("Short Covering")){
  this.fnomsg1.push({text1:insight['data']['insightData']['price'][4]['shortDesc'],text2:'positive'})
}
else if(this.fnomsg.includes("Long Buildup")){
  this.fnomsg1.push({text1:insight['data']['insightData']['price'][4]['shortDesc'],text2:'positive'})
}
else if(this.fnomsg.includes("Long Unwinding")){
  this.fnomsg1.push({text1:insight['data']['insightData']['price'][4]['shortDesc'],text2:'negative'})
}
else if(this.fnomsg.includes("Short Buildup")){
  this.fnomsg1.push({text1:insight['data']['insightData']['price'][4]['shortDesc'],text2:'negative'})
}
        }else {console.log("No FnO")}

      // this.stockdetails1.length = 0;
      // await this.stockdetails1.push({ text1: result1.data['SC_FULLNM'], text2: result1.data['pricechange'], text3: result1.data['pricepercentchange'], text4: result1.data['pricecurrent'] })
    
     
    }
  } catch (err) {
    console.error(err);
  }
  }
 
  async getmcstockrealtime(mcsymbol) {
    try {
      const response = await fetch("https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/"+this.mcsymbol, {
        method: 'GET',
        headers: {
         
        }
      });
    
      if (response.ok) {
        const result1 = await response.json();
       
       
      this.stockdetails1.length = 0;
      await this.stockdetails1.push({ text1: result1.data['SC_FULLNM'], text2: result1.data['pricechange'], text3: result1.data['pricepercentchange'], text4: result1.data['pricecurrent'],text5: result1.data['52H'],text6: result1.data['52L'],text7: result1.data['upper_circuit_limit'],text8: result1.data['lower_circuit_limit'] })
    
     
    }
  } catch (err) {
    console.error(err);
  }
  }
  async getmcstockrealtime1(mcsymbol1) {
    try {
   
      const response = await fetch("https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/"+this.mcsymbol1, {
        method: 'GET',
        headers: {
         
        }
      });
    
      if (response.ok) {
        const result = await response.json();
       
      
     
      await this.sectorstockdetails1.push({ text1: result.data['SC_FULLNM'], text2: result.data['pricechange'], text3: result.data['pricepercentchange'], text4: result.data['pricecurrent'] })
     
     
    }
   
  } catch (err) {
    console.error(err);
  }
  }
 
  async getmcstockohlc1yr(eqsymbol,yearbackepoch,todayepoch) {
    try {
        const response = await fetch('https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol='+this.eqsymbol+'&resolution=1D&from='+this.yearbackepoch+'&to='+this.todayepoch+'&countback=365&currencyCode=INR', {
        method: 'GET',
        headers: {
         
        }
      });
    
      if (response.ok) {
        const result = await response.json();
       
       
      this.stockohlc1yr.length = 0;
      
      
        for (let val in result.c) {
          this.stockohlc1yr.push({ x: new Date((result.t[val])*1000), open: result.o[val], high: result.h[val], low: result.l[val], close: result.c[val], volume: result.v[val] })
        
        
        }
     
   
    
      this.data1=this.stockohlc1yr

    
      }
    
  } catch (err) {
    console.error(err);
  }
  
    
  }
  
  getopstrastockpcr(eqsymbol) {
    this.dataApi.getopstrastockpcr(this.eqsymbol).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
      this.opstrastockpcrdata.length=0;
       this.opstrastockpcrLabels.length=0;
      for(let val in nestedItems[0]['data']){
        this.opstrastockpcrdata.push(nestedItems[0]['data'][val][2]);
        this.opstrastockpcrLabels.push((new Date(nestedItems[0]['data'][val][0]).toLocaleString()).split(",")[0]);

      }
      console.log(this.opstrastockpcrdata)
      console.log(this.opstrastockpcrLabels)
    });
    this.opstrastockpcrData = [{
      label: 'Price',
      data: this.opstrastockpcrdata,
      borderWidth: 1,
      fill: false
    }];
    this.opstrastockLabels = this.opstrastockpcrLabels;
  }
  getopstrastockpcrintra(eqsymbol) {
    this.dataApi.getopstrastockpcrintra(this.eqsymbol).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });

      this.opstrastockpcrintradata.length=0;
      this.opstrastockpcrintraLabels.length=0;
      for(let val in nestedItems[0]['data']){
        this.opstrastockpcrintradata.push(nestedItems[0]['data'][val][2]);
        this.opstrastockpcrintraLabels.push((new Date(nestedItems[0]['data'][val][0]).toLocaleString()).split(",")[0]);
     
      }
       });
    this.opstrastockpcrintraData = [{
      label: 'Price',
      data: this.opstrastockpcrintradata,
      borderWidth: 1,
      fill: false
    }];
    this.opstrastockintraLabels = this.opstrastockpcrintraLabels;
  }
  getntstock1yr(eqsymbol) {
    this.stockohlc.length = 0;
    // this.http.get('https://api.niftytrader.in/webapi/Live/livechartsBySymbol?symbol=' + this.eqsymbol).subscribe(data5 => {
    //   let nestedItems = Object.keys(data5).map(key => {
    //     return data5[key];
    //   });
    this.dataApi.getntstock1yr(this.eqsymbol).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
      this.stockohlc.length = 0;
      this.stockohlcvolume.length = 0;
      for (let val in nestedItems[3]) {
        this.stockohlc.push({ x: new Date(nestedItems[3][val]['created_at']).getTime(), y: [nestedItems[3][val].open, nestedItems[3][val].high, nestedItems[3][val].low, nestedItems[3][val].close] })
        this.stockohlcvolume.push({ x: new Date(nestedItems[3][val]['created_at']).getTime(), y: nestedItems[3][val].volume })
      }

      this.stockohlc1yr.length = 0;
      
      
     
     
    
      this.chartCandleOptions = {
        series: [
          {
           
            data: this.stockohlc
          }
        ],
        chart: {
          type: "candlestick",
          height: 390,
          id: "candles",
          toolbar: {
            autoSelected: "pan",
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#3C90EB",
              downward: "#DF7D46"
            }
          }
        },
        xaxis: {
          type: "datetime"
        }
      };
      this.chartBarOptions = {
        series: [
          {
            
          
            data: this.stockohlcvolume
          }
        ],
        chart: {
          height: 160,
          type: "bar",
          brush: {
            enabled: true,
            target: "candles"
          },
          selection: {
            enabled: true,
            xaxis: {
            },
            fill: {
              color: "#ccc",
              opacity: 0.4
            },
            stroke: {
              color: "#0D47A1"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            colors: {
              ranges: [
                {
                  from: -1000,
                  to: 0,
                  color: "#F15B46"
                },
                {
                  from: 1,
                  to: 10000,
                  color: "#FEB019"
                }
              ]
            }
          }
        },
        stroke: {
          width: 0
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            offsetX: 13
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        }
      };
    })
  }
  getshare3m(eqsymbol) {
    ////////////////Nifty 3 months/////////////////////////////
    this.http.get('https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode=' + this.eqsymbol + 'EQ&exchangeid=50&datatype=eod&filtertype=eod&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=3m').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[0]['results']['quotedata']) {
        this.stock3mdata.unshift(nestedItems[0]['results']['quotedata'][val][1])
        this.stock3mLabels.unshift((new Date(nestedItems[0]['results']['quotedata'][val][0]).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).split(",").slice(0,6)[0])
      }
    }), err => {
      console.log(err)
    }
    this.stock3mData = [{
      label: 'Price',
      data: this.stock3mdata,
      borderWidth: 1,
      fill: false
    }];
    this.stock3mLabels = this.stock3mLabels;
  }
  // getzerodha() {
  //   this.http.get('https://stockreports.zerodha.com/api/pdf/').subscribe(data5 => {
  //     let nestedItems = Object.keys(data5).map(key => {
  //       return data5[key];
  //     });
  //     //console.log(nestedItems) explore
  //   });
  // }
 
   
      
      
 async getmmdata(stockid) {
    this.dataApi.getmmdata(this.stockid).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
    // this.http.get('https://www.trading80.com/technical_card/getCardInfo?sid=' + this.stockid + '&se=bse&cardlist=sectPrice_techScore,sectPrice_indiScale,sectIndigraph_graph,sectMacd_macd_w,sectRsi_rsi_w,sectBb_bb_w,sectMa_ma_w,sectKst_kst_w,sectDow_dow_w,sectObv_obv_w').subscribe(data5 => {
    //   let nestedItems = Object.keys(data5).map(key => {
    //     return data5[key];
    //   });
    
      this.hmsg = (nestedItems[0]['data'].sectPrice_techScore['header_msg'])
      for (let val in nestedItems[0]['data']['sectPrice_indiScale']){
        if(nestedItems[0]['data']['sectPrice_indiScale'][val].sid == this.stockid){
         
      //this.hmsg.push({ text:nestedItems[0]['data'].sectPrice_techScore['header_msg'], text1: nestedItems[0]['data'].sectPrice_techScore['score'], text2: nestedItems[0]['data'].sectPrice_techScore['tech_text'] })
      // this.score.push({text1:nestedItems[0]['data']['sectPrice_indiScale'][val].fin_trend_clr,text2:nestedItems[0]['data']['sectPrice_indiScale'][val].fin_trend_points,text3:nestedItems[0]['data']['sectPrice_indiScale'][val].fin_trend_text,text4:nestedItems[0]['data']['sectPrice_indiScale'][val].quality_clr, text5: nestedItems[0]['data']['sectPrice_indiScale'][val].quality_rank, text6: nestedItems[0]['data']['sectPrice_indiScale'][val].quality_text})
      this.fscore.push({ text: nestedItems[0]['data']['sectPrice_indiScale'][val].fin_trend_clr, text1: nestedItems[0]['data']['sectPrice_indiScale'][val].fin_trend_points, text2: nestedItems[0]['data']['sectPrice_indiScale'][val].fin_trend_text })
      this.qscore.push({ text: nestedItems[0]['data']['sectPrice_indiScale'][val].quality_clr, text1: nestedItems[0]['data']['sectPrice_indiScale'][val].quality_rank, text2: nestedItems[0]['data']['sectPrice_indiScale'][val].quality_text })
      this.techscore.push({ text: nestedItems[0]['data']['sectPrice_indiScale'][val].tech_clr, text1: nestedItems[0]['data']['sectPrice_indiScale'][val].tech_score, text2: nestedItems[0]['data']['sectPrice_indiScale'][val].tech_text })
      this.vscore.push({ text: nestedItems[0]['data']['sectPrice_indiScale'][val].valuation_clr, text1: nestedItems[0]['data']['sectPrice_indiScale'][val].valuation_rank, text2: nestedItems[0]['data']['sectPrice_indiScale'][val].valuation_text })
        }
      }
      this.lineChartDatamacdm.length = 0;
      this.lineChartDatasignalm.length = 0;
      this.lineChartDatapricemacdm.length = 0;
      this.lineChartDatagrademacdm.length = 0;
      // this.msg = nestedItems[0]['data']['sectBb_bb_m'].text
      for (let val in nestedItems[0]['data']['sectMacd_macd_w']["stock"]) {
        this.lineChartDatamacdm.push(nestedItems[0]['data']['sectMacd_macd_w']["stock"][val].macd)
        this.lineChartDatasignalm.push(nestedItems[0]['data']['sectMacd_macd_w']["stock"][val].signal)
        this.lineChartDatapricemacdm.push(nestedItems[0]['data']['sectMacd_macd_w']["stock"][val].price)
        this.lineChartmacdmLabels.push(nestedItems[0]['data']['sectMacd_macd_w']["stock"][val].date)
        this.lineChartDatagrademacdm.push(nestedItems[0]['data']['sectMacd_macd_w']["stock"][val].grade)
      }
      this.macdmsg = nestedItems[0]['data']['sectMacd_macd_w']['text']
      this.macdChartData = {
        datasets: [
          {
            label: 'macd',
            data: this.lineChartDatamacdm
          },
          {
            label: 'signal',
            data: this.lineChartDatasignalm
          },
          {
            label: 'price',
            data: this.lineChartDatapricemacdm
          }],
        labels: this.lineChartmacdmLabels
      };
      this.lineChartDatarsim.length = 0;
      this.lineChartDataubandm.length = 0;
      this.lineChartDatalbandm.length = 0;
      this.lineChartDatapricersim.length = 0;
      this.lineChartrsimLabels.length = 0;
      for (let val in nestedItems[0]['data']['sectRsi_rsi_w']["stock"]) {
        this.lineChartDatarsim.push(nestedItems[0]['data']['sectRsi_rsi_w']["stock"][val].rsi)
        this.lineChartDataubandm.push(nestedItems[0]['data']['sectRsi_rsi_w']["stock"][val].uband)
        this.lineChartDatalbandm.push(nestedItems[0]['data']['sectRsi_rsi_w']["stock"][val].lband)
        this.lineChartDatapricersim.push(nestedItems[0]['data']['sectRsi_rsi_w']["stock"][val].price)
        this.lineChartrsimLabels.push(nestedItems[0]['data']['sectRsi_rsi_w']["stock"][val].date)
      }
      this.rsimsg = nestedItems[0]['data']['sectRsi_rsi_w']['text']
      this.rsiChartData = {
        datasets: [
          {
            label: 'RSI',
            data: this.lineChartDatarsim
          },
          {
            label: 'uband',
            data: this.lineChartDataubandm
          },
          {
            label: 'lband',
            data: this.lineChartDatalbandm
          }],
        labels: this.lineChartrsimLabels
      };
      this.lineChartDatamaday50m.length = 0;
      this.lineChartDatamaday200m.length = 0;
      this.lineChartDatamapricem.length = 0;
      this.lineChartDatamadate.length = 0;
      this.lineChartDatamaflag.length = 0;
      for (let val in nestedItems[0]['data']['sectMa_ma_w']["stock"]) {
        this.lineChartDatamaday50m.push(nestedItems[0]['data']['sectMa_ma_w']["stock"][val].day50)
        this.lineChartDatamaday200m.push(nestedItems[0]['data']['sectMa_ma_w']["stock"][val].day200)
        this.lineChartDatamapricem.push(nestedItems[0]['data']['sectMa_ma_w']["stock"][val].price)
        this.lineChartDatamadate.push(nestedItems[0]['data']['sectMa_ma_w']["stock"][val].date)
        this.lineChartDatamaflag.push(nestedItems[0]['data']['sectMa_ma_w']["stock"][val].flag)
      }
      this.mamsg = nestedItems[0]['data']['sectMa_ma_w']['text']
      this.maChartData = {
        datasets: [
          {
            label: 'Price',
            data: this.lineChartDatamapricem,
          },
          {
            label: '200d MA',
            data: this.lineChartDatamaday200m
          },
          {
            label: '50d MA',
            data: this.lineChartDatamaday50m
          }],
        labels: this.lineChartDatamadate
      };
      this.lineChartDatabbuband.length = 0;
      this.lineChartDatabblband.length = 0;
      this.lineChartDatabbdma20.length = 0;
      this.lineChartDatabbdate.length = 0;
      this.lineChartDatabbprice.length = 0;
      for (let val in nestedItems[0]['data']['sectBb_bb_w']["stock"]) {
        this.lineChartDatabbuband.push(nestedItems[0]['data']['sectBb_bb_w']["stock"][val].uband)
        this.lineChartDatabblband.push(nestedItems[0]['data']['sectBb_bb_w']["stock"][val].lband)
        this.lineChartDatabbdma20.push(nestedItems[0]['data']['sectBb_bb_w']["stock"][val].dma20)
        this.lineChartDatabbdate.push(nestedItems[0]['data']['sectBb_bb_w']["stock"][val].date)
        this.lineChartDatabbprice.push(nestedItems[0]['data']['sectBb_bb_w']["stock"][val].price)
      }
      this.bbmsg = nestedItems[0]['data']['sectBb_bb_w']['text']
      this.bbChartData = {
        datasets: [
          {
            label: 'BB uband',
            data: this.lineChartDatabbuband,
          },
          {
            label: 'BB lband',
            data: this.lineChartDatabblband
          },
          {
            label: 'Price',
            data: this.lineChartDatabbprice
          },
          {
            label: 'dma20',
            data: this.lineChartDatabbdma20
          }],
        labels: this.lineChartDatabbdate
      };
      this.lineChartDatakst.length = 0;
      this.lineChartDatakstsignal.length = 0;
      this.lineChartDatakstprice.length = 0;
      this.lineChartDatakstdate.length = 0;
      for (let val in nestedItems[0]['data']['sectKst_kst_w']["stock"]) {
        this.lineChartDatakst.push(nestedItems[0]['data']['sectKst_kst_w']["stock"][val].kst)
        this.lineChartDatakstsignal.push(nestedItems[0]['data']['sectKst_kst_w']["stock"][val].signal)
        this.lineChartDatakstprice.push(nestedItems[0]['data']['sectKst_kst_w']["stock"][val].price)
        this.lineChartDatakstdate.push(nestedItems[0]['data']['sectKst_kst_w']["stock"][val].date)
        //   this.lineChartrsimLabels.push(nestedItems[0]['data']['sectKst_kst_w']["stock"][val].date)
      }
      this.kstmsg = nestedItems[0]['data']['sectKst_kst_w']['text']
      this.kstChartData = {
        datasets: [
          {
            label: 'KST',
            data: this.lineChartDatakst,
          },
          {
            label: 'Signal',
            data: this.lineChartDatakstsignal
          },
          {
            label: 'Price',
            data: this.lineChartDatakstprice
          }
        ],
        labels: this.lineChartDatakstdate
      };
      this.lineChartDatadowdate.length = 0;
      this.lineChartDatadowprice.length = 0;
      this.lineChartDatadowscore.length = 0;
      this.lineChartDatadowflag.length = 0;
      for (let val in nestedItems[0]['data']['sectDow_dow_w']["stock"]) {
        this.lineChartDatadowdate.push(nestedItems[0]['data']['sectDow_dow_w']["stock"][val].date)
        this.lineChartDatadowprice.push(nestedItems[0]['data']['sectDow_dow_w']["stock"][val].price)
        this.lineChartDatadowscore.push(nestedItems[0]['data']['sectDow_dow_w']["stock"][val].score)
        this.lineChartDatadowflag.push(nestedItems[0]['data']['sectDow_dow_w']["stock"][val].flag)
        //   this.lineChartrsimLabels.push(nestedItems[0]['data']['sectDow_dow_w']["stock"][val].date)
      }
      this.dowmsg = nestedItems[0]['data']['sectDow_dow_w']['text']
      this.dowChartData = {
        datasets: [
          {
            label: 'score',
            data: this.lineChartDatadowscore
          },
          {
            label: 'Price',
            data: this.lineChartDatadowprice
          },
          {
            label: 'flag',
            data: this.lineChartDatadowflag
          }],
        labels: this.lineChartDatadowdate
      };
      this.lineChartDataobvdate.length = 0;
      this.lineChartDataobv.length = 0;
      this.lineChartDataobvprice.length = 0;
      for (let val in nestedItems[0]['data']['sectObv_obv_w']["stock"]) {
        this.lineChartDataobvdate.push(nestedItems[0]['data']['sectObv_obv_w']["stock"][val].date)
        this.lineChartDataobv.push(nestedItems[0]['data']['sectObv_obv_w']["stock"][val].obv)
        this.lineChartDataobvprice.push(nestedItems[0]['data']['sectObv_obv_w']["stock"][val].price)
        //   this.lineChartDatapricersim.push(nestedItems[0]['data']['sectObv_obv_w']["stock"][val].price)
        //   this.lineChartrsimLabels.push(nestedItems[0]['data']['sectObv_obv_w']["stock"][val].date)
      }
      this.obvmsg = nestedItems[0]['data']['sectObv_obv_w']['text']
      this.obvChartData = {
        datasets: [
          {
            label: 'OBV',
            data: this.lineChartDataobv,
          },
          {
            label: 'Price',
            data: this.lineChartDataobvprice
          },
        ],
        labels: this.lineChartDataobvdate
      };
    }), err => {
      console.log(err)
    }
  }
  trackByFunction(index, item) {return item.text2}
  trackByFunction1(index1, item1) {return item1.text1}
  trackByFunction2(index2, item2) {return item2.text1}
  trackByFunction3(index3, item3) {return item3.text1;}
  trackByFunction4(index4, item4) {return item4.text2;}
  trackByFunction5(index5, item5) {return item5.text1;}
  trackByFunction6(index6, item6) {return item6.text1;}
  trackByFunction7(index7, item7) {return item7.text1;}
  trackByFunction8(index8, item8) {return item8.text3;}
  trackByFunction9(index9, item9) {return item9.text3;}
  trackByFunction10(index10, item10) {return item10.text1;}
  trackByFunction11(index11, item11) {return item11.text3;}
  trackByFunction12(index12, item12) {return item12.text1}
  trackByFunction13(index13, item13) {return item13.text1;}
  trackByFunction14(index14, item14) {item14.text2;}
  trackByFunction15(index15, item15) {return item15.text1;}
  trackByFunction16(index16, item16) {return item16.text1;}
  trackByFunction17(index17, item17) {return item17.text1;}
  trackByFunction18(index18, item18) {return item18.text3;}
  trackByFunction19(index19, item19) {return item19.text3;}
  trackByFunction20(index20, item20) {return item20.text3;}
  trackByFunction21(index21, item21) { return item21.text3; }
  trackByFunction22(index22, item22) {return item22.text2}
  trackByFunction23(index23, item23) {return item23.text1}
  trackByFunction24(index24, item24) {return item24.text1}
  trackByFunction25(index25, item25) {return item25.text1;}
  trackByFunction26(index26, item26) {return item26.text2;}
  trackByFunction27(index27, item27) {return item27.text1;}
  trackByFunction28(index28, item28) {return item28.text1}
  trackByFunction29(index29, item29) {return item29.text1;}
  trackByFunction30(index30, item30) {return item30.text3;}
  trackByFunction31(index31, item31) {return item31.text3;}
  trackByFunction32(index32, item32) {return item32.text3;}
  trackByFunction33(index33, item33) {return item33.text3;}
  trackByFunction34(index34, item34) {return item34.divscore;}
  trackByFunction35(index35, item35) {return item35.text3;}
  trackByFunction36(index36, item36) {return item36.text3;}
  trackByFunction37(index37, item37) {return item37.text3;}
  trackByFunction38(index38, item38) {return item38.text3;}
  trackByFunction39(index39, item39) {return item39.text3; }
  trackByFunction40(index40, item40) {return item40.text3;}
  trackByFunction41(index41, item41) {return item41.text3;}
  trackByFunction42(index42, item42) {return item42.text1;}
  trackByFunction43(index43, item43) {return item43.text2;}
  trackByFunction44(index44, item44) { return item44.text2; }
  trackByFunction45(index45, item45) {return item45.text2;}
  trackByFunction46(index46, item46) {return item46.text1;}
  trackByFunction47(index47, item47) {return item47.text1;}
  trackByFunction48(index48, item48) {return item48.text1;}
  trackByFunction49(index49, item49) {return item49.text1;}
  getshare1w(eqsymbol) {
    ////////////////Nifty 1 Week/////////////////////////////
    this.http.get('https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode=' + this.eqsymbol + 'EQ&exchangeid=50&datatype=eod&filtertype=eod&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1w').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[0]['results']['quotedata']) {
        this.stock1wdata.unshift(nestedItems[0]['results']['quotedata'][val][1])
        this.stock1wLabels.unshift((new Date(nestedItems[0]['results']['quotedata'][val][0]).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).split(",").slice(0,6)[0])
      }
    }), err => {
      console.log(err)
    }
    this.stock1wData = [{
      label: 'Price',
      data: this.stock1wdata,
      borderWidth: 1,
      fill: false
    }];
    this.stock1wLabels = this.stock1wLabels;
  }
  getshare1m(eqsymbol) {
    ////////////////Nifty 3 months/////////////////////////////
    this.http.get('https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode=' + this.eqsymbol + 'EQ&exchangeid=50&datatype=eod&filtertype=eod&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1m').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[0]['results']['quotedata']) {
        this.stock1mdata.unshift(nestedItems[0]['results']['quotedata'][val][1])
        this.stock1mLabels.unshift((new Date(nestedItems[0]['results']['quotedata'][val][0]).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).split(",").slice(0,6)[0])
      }
    }), err => {
      console.log(err)
    }
    this.stock1mData = [{
      label: 'Price',
      data: this.stock1mdata,
      borderWidth: 1,
      fill: false
    }];
    this.stock1mLabels = this.stock1mLabels;
  }
  

    // axios.get('https://www.trading80.com/technical_card/getCardInfo?sid=981456&se=bse&cardlist=sectPrice_techScore,sectPrice_indiScale,sectIndigraph_graph,sectMacd_macd_w,sectRsi_rsi_w,sectBb_bb_w,sectMa_ma_w,sectKst_kst_w,sectDow_dow_w,sectObv_obv_w')
    // .then((response) => {
    //   let nestedItems = Object.keys((response.data)).map(key => {
    //     return (response.data)[key];
    //   });;
    //   console.log(nestedItems)
     
    // }, err => {
    //   console.log(err)
    // })
    
    // try{
    // //   this.http.jsonp('https://api.niftytrader.in/api/NIndex/stocks_list_api', 'callback')
    // // // .subscribe(res => this.res = res);
    //    jsonp('https://api.niftytrader.in/api/NIndex/stocks_list_api')
    //    .subscribe((responseData =>this.res = res{ 
  
    //   console.log(res)}
     
    //    ))
    // }catch (err) {
    //   console.error(err);
    // }
  
  
  
  getshare6m(eqsymbol) {
    this.stockDataema5.length=0;
    this.stockDataema10.length=0;
    this.stockDataema20.length=0;
    this.stockDataema30.length=0;
    this.stockDataema50.length=0;
    this.stockDataema100.length=0;
    this.stockDataema200.length=0;
    this.stockDatasma5.length=0;
    this.stockDatasma10.length=0;
    this.stockDatasma20.length=0;
    this.stockDatasma30.length=0;
    this.stockDatasma50.length=0;
    this.stockDatasma100.length=0;
    this.stockDatasma200.length=0;
    ////////////////Nifty 3 months/////////////////////////////
    this.http.get('https://mo.streak.tech/api/tech_analysis/?timeFrame=day&stock=NSE%3A' + this.eqsymbol).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      
      let val = 0;
      while (val != 400) {
        val = val + 1
        this.stockDataema5.push(nestedItems[10]);
        this.stockDataema10.push(nestedItems[5]);
        this.stockDataema20.push(nestedItems[7]);
        this.stockDataema30.push(nestedItems[9]);
        this.stockDataema50.push(nestedItems[11]);
        this.stockDataema100.push(nestedItems[6]);
        this.stockDataema200.push(nestedItems[8]);
        this.stockDatasma5.push(nestedItems[37]);
        this.stockDatasma10.push(nestedItems[32]);
        this.stockDatasma20.push(nestedItems[34]);
        this.stockDatasma30.push(nestedItems[36]);
        this.stockDatasma50.push(nestedItems[38]);
        this.stockDatasma100.push(nestedItems[33]);
        this.stockDatasma200.push(nestedItems[35]);
      }
      
    });
    this.http.get('https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode=' + this.eqsymbol + 'EQ&exchangeid=50&datatype=eod&filtertype=eod&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=6m').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      for (let val in nestedItems[0]['results']['quotedata']) {
        this.stock6mdata.unshift(nestedItems[0]['results']['quotedata'][val][1])
        this.stock6mLabels.unshift((new Date(nestedItems[0]['results']['quotedata'][val][0]).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).split(",").slice(0,6)[0])
      }
    }), err => {
      console.log(err)
    }
    this.stock6mData = [{
      label: 'Price',
      data: this.stock6mdata,
      borderWidth: 1,
      fill: false
    },
    {
      label: 'EMA5',
      data: this.stockDataema5,
      borderWidth: 1,
      borderColor: '#f44336',
      fill: false
    },
    {
      label: 'EMA10',
      data: this.stockDataema10,
      borderWidth: 1,
      borderColor: '#ead1dc',
      fill: false
    },{
      label: 'EMA20',
      data: this.stockDataema20,
      borderWidth: 1,
      borderColor: '#8b5a48',
      fill: false
    },{
      label: 'EMA30',
      data: this.stockDataema30,
      borderWidth: 1,
      borderColor: '#b40000',
      fill: false
    },{
      label: 'EMA50',
      data: this.stockDataema50,
      borderWidth: 1,
      borderColor: '#38761d',
      fill: false
    },{
      label: 'EMA100',
      data: this.stockDataema100,
      borderWidth: 1,
      borderColor: '#f4cccc',
      fill: false
    },{
      label: 'EMA200',
      data: this.stockDataema200,
      borderWidth: 1,
      borderColor: '#ce7300',
      fill: false
    },{
      label: 'SMA5',
      data: this.stockDatasma5,
      borderWidth: 1,
      borderColor: '#1dc7eb',
      fill: false
    },{
      label: 'SMA10',
      data: this.stockDatasma10,
      borderWidth: 1,
      borderColor: '#300462',
      fill: false
    },{
      label: 'SMA20',
      data: this.stockDatasma20,
      borderWidth: 1,
      borderColor: '#9b7a7a',
      fill: false
    },{
      label: 'SMA30',
      data: this.stockDatasma30,
      borderWidth: 1,
      borderColor: '#a4243b',
      fill: false
    },{
      label: 'SMA50',
      data: this.stockDatasma50,
      borderWidth: 1,
      borderColor: '#2d0320',
      fill: false
    },{
      label: 'SMA100',
      data: this.stockDatasma100,
      borderWidth: 1,
      borderColor: '#27fa03',
      fill: false
    },{
      label: 'SMA200',
      data: this.stockDatasma200,
      borderWidth: 1,
      borderColor: '#ffff00',
      fill: false
    }];
    this.stock6mLabels = this.stock6mLabels;
  }
  getstocksentiments(mcsymbol) {
    this.stocksentiments.length = 0;
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/' + this.mcsymbol + '?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.stocksentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Daily" })
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/W/' + this.mcsymbol + '?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.stocksentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Weekly" })
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/M/' + this.mcsymbol + '?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
      this.stocksentiments.push({ text1: nestedItems[2]['sentiments']['indication'], text2: "Monthly" })
    }, err => {
      console.log(err)
    })
  }

  getstocktoday1(mcsymbol){ 
   
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/' + this.mcsymbol + '?field=RSI').subscribe(data5 => {
      let nestedItems1 = Object.keys(data5).map(key => {
        return data5[key];
      });
    
     this.pclose=nestedItems1[2].pclose; 
    this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + this.mcsymbol + '&resolution=1D').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
   console.log(nestedItems)
       this.dataValues.length=0;  
        this.stockhcdate1.length=0; 
       
      for (let val in nestedItems[6]) {
       
        this.stockhcdate1.push({x:(new Date(nestedItems[6][val]["time"] * 1000).toUTCString()),y:(nestedItems[6][val]["value"])})     
      }
      
      
    

 
this.primaryYAxis2 = {
  rangePadding: 'None',
  // minimum: 12000,
  // maximum: 13000,
  title: 'Price',
  lineStyle: { width: 1 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 }
};
this.primaryXAxis2={
valueType: 'DateTime',
  // labelFormat: 'hms',
  intervalType: 'Minutes',
edgeLabelPlacement: 'Shift',
majorGridLines: { width: 0 }
};
      
this.stockhcdate1.map((value: number, index: number) => {
  


  
 

   if ( (Number(value['y'])) < (this.pclose)){
    this.dataValues.push({
       
          XValue:(value['x']), YValue: Number(value['y']),
        color: ['red']
    });
   }
  else if (Number(value['y']) > (this.pclose )) {
    
     
    this.dataValues.push({
       
        XValue:((value['x'])), YValue: Number(value['y']),
        color: ['green']
    });}
   
  
  }); 
}); 

})
}

   getstocktoday(mcsymbol,eqsymbol) {
   
    
    this.http.get('https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=' + this.mcsymbol + '&resolution=1D').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
 
      this.stock1ddata.length = 0;
      this.stock1dLabels.length = 0;
     

     if(nestedItems[6][0].hasOwnProperty('value') ){
      for (let val in nestedItems[6]) {
        
        this.stock1ddata.push(nestedItems[6][val]["value"])
        this.stock1dLabels.push(((new Date(nestedItems[6][val]["time"] * 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5))
        }
      }
        else if(nestedItems[5][0].hasOwnProperty('value') ){
          for (let val in nestedItems[5]) {
          this.stock1ddata.push(nestedItems[5][val]["value"])
          this.stock1dLabels.push(((new Date(nestedItems[5][val]["time"] * 1000).toUTCString()).split(" ").slice(0,6)[4]).slice(0,5))
          }
      }
    }, err => {
      console.log(err)
    })
    this.http.get('https://priceapi.moneycontrol.com/pricefeed/techindicator/D/' + this.mcsymbol + '?field=RSI').subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
    
     this.pclose=nestedItems[2].pclose; 
      ////////////To get Nifty Today Resistances and Indicators/////////////
      this.stockDatasnrr1.length = 0;
      this.stockDatasnrr2.length = 0;
      this.stockDatasnrr3.length = 0;
      this.stockDatasnrs1.length = 0;
      this.stockDatasnrs2.length = 0;
      this.stockDatasnrs3.length = 0;
      let val = 0;
      while (val != 400) {
        val = val + 1
        this.previousclose.push(nestedItems[2].pclose),
        this.stockDatasnrr1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r1),
          this.stockDatasnrr2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r2),
          this.stockDatasnrr3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.r3),
          this.stockDatasnrs3.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s3),
          this.stockDatasnrs2.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s2),
          this.stockDatasnrs1.push(nestedItems[2]['pivotLevels'][0].pivotLevel.s1)
      }
      this.stockindicators.length = 0;
      this.stockcrossover.length = 0;
      // console.log(nestedItems)
      for (let val in nestedItems[2]['crossover']) {
        this.stockcrossover.push({ text1: nestedItems[2]['crossover'][val]['displayValue'], text3: nestedItems[2]['crossover'][val]['indication'], text2: nestedItems[2]['crossover'][val]['period'], text4: nestedItems[2]['crossover'][val]['period'] })
      }
      for (let val1 in nestedItems[2]['indicators']) {
        
          // if (nestedItems[2]['indicators'][val1]['id'] == 'beta_nse') {
          //   console.log('beta_nse')
          //   this.stockindicators.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
          // }
          // if (nestedItems[2]['indicators'][val1]['id'] == 'beta_bse') {
          //   console.log('beta_bse')
          //   this.stockindicators.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
          // }
          
          if (nestedItems[2]['indicators'][val1]['id'] == 'bollinger') {
            continue;
        }
        else {
          this.stockindicators.push({ text1: nestedItems[2]['indicators'][val1].displayName, text2: nestedItems[2]['indicators'][val1].id, text3: nestedItems[2]['indicators'][val1].indication, text4: nestedItems[2]['indicators'][val1].value })
        }
      }
     
      this.stockData = [{
        label: 'Price',
        data: this.stock1ddata,
        borderWidth: 1,
        
        
       
        fill: false
      },
      {
        label: 'Previous close',
        data: this.previousclose,
        borderWidth: 3,
        borderColor: '#040FFA',
        fill: false
      }];
      this.stockLabels = this.stock1dLabels;
      this.lineChartData = [{
        label: 'Price',
        data: this.stock1ddata,
        borderWidth: 3,
        
        fill: false
      },
      {
        label: 'R2',
        data: this.stockDatasnrr2,
        borderWidth: 1,
        borderColor: '#e3256b',
        fill: false
      },
      {
        label: 'R1',
        data: this.stockDatasnrr1,
        borderWidth: 1,
        bordercolor: '#d3766c',
        fill: false
      }
        , {
        label: 'R3',
        data: this.stockDatasnrr3,
        borderWidth: 1,
        borderColor: '#c84343',
        fill: false
      }, {
        label: 'S1',
        data: this.stockDatasnrs1,
        borderWidth: 1,
        borderColor: '#90b590',
        fill: false
      }, {
        label: 'S2',
        data: this.stockDatasnrs2,
        borderWidth: 1,
        borderColor: '#09c51b',
        fill: false
      }, {
        label: 'S3',
        data: this.stockDatasnrs3,
        borderWidth: 1,
        borderColor: '#375f00',
        fill: false
      },
      {
        label: 'Previous close',
        data: this.previousclose,
        borderWidth: 3,
        borderColor: '#040FFA',
        fill: false
      }];
      this.lineChartLabels = this.stockLabels;
      
        }, err => {
      console.log(err)
    })
   
    
    try {
      
       jsonp('https://ettechcharts.indiatimes.com/ETLiveFeedChartRead/livefeeddata?scripcode='+this.eqsymbol+'EQ&exchangeid=50&datatype=intraday&filtertype=1MIN&tagId=&firstreceivedataid=&lastreceivedataid=&directions=all&scripcodetype=company')
    .then((responseData =>{
        // Response is parsed json
       
    
      
         
      this.stockohlc1d.length = 0;
      for (let val in responseData.query.results.quote) {
            
        this.stockohlc1d.push({ x: new Date((responseData.query.results.quote[val].Date)), open: responseData.query.results.quote[val].Open, high: responseData.query.results.quote[val].High, low: responseData.query.results.quote[val].Low, close: responseData.query.results.quote[val].Close, volume: responseData.query.results.quote[val].Volume })
      }
          
          this.data2 = this.stockohlc1d
         
    
  }))
  .catch((error => {
      // Error contains message and previous if applicable
      console.log(error);
  }));
                
          }catch (err) {
         console.error(err);
       }
  }
  
 
  getstockmaema(eqsymbol) {
    this.http.get('https://mo.streak.tech/api/tech_analysis/?timeFrame=day&stock=NSE%3A' + this.eqsymbol).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
     
      this.stockema.length = 0;
      this.stocksma.length = 0;
      this.stockema.push({ text1: nestedItems[10], text2: nestedItems[5], text3: nestedItems[7], text4: nestedItems[9], text5: nestedItems[11], text6: nestedItems[6], text7: nestedItems[8] })
      this.stocksma.push({ text1: nestedItems[37], text2: nestedItems[32], text3: nestedItems[34], text4: nestedItems[36], text5: nestedItems[38], text6: nestedItems[33], text7: nestedItems[35] })
    }, err => {
      console.log(err)
    })
  }
  async getntstockdetails(eqsymbol) {
    // 
     
      
        
      
           this.dataApi.getntstockdetails(eqsymbol).subscribe(data5 => {
              let nestedItems = Object.keys(data5).map(key => {
                return data5[key];
              });
             
      this.nr7 = (nestedItems[0]['resultData'].stocktrend['nr7_today'])
      this.delivperc.length = 0;
      this.delivperctime.length = 0;
      for (let val in nestedItems[0]['resultData'].priceTable) {
        
        this.delivperc.unshift(nestedItems[0]['resultData'].priceTable[val].delivery_percentage)
        this.delivperctime.unshift((nestedItems[0]['resultData'].priceTable[val].created_at).split("T")[0])
      }
      this.DelivData = [{
        label: 'Delivery Percentage',
        data: this.delivperc,
        borderWidth: 1,
        fill: false
      }];
      this.DelivLabels = this.delivperctime;
      for (let val in nestedItems[0]['resultData'].priceTable) {
        this.volume.unshift(nestedItems[0]['resultData'].priceTable[val].volume)
        this.volumetime.unshift((nestedItems[0]['resultData'].priceTable[val].created_at).split("T")[0])
      }
      this.VolumeData = [{
        label: 'Volume',
        data: this.volume,
        borderWidth: 1,
        fill: false
      }];
      this.VolumeLabels = this.volumetime;
    

    
  }
  )
  }
  
   async getntstockpcrdetails(eqsymbol) {
     this.dataApi.getntstockpcrdetails(eqsymbol).subscribe(data5 => {
       let nestedItems = Object.keys(data5).map(key => {
         return data5[key];
       });
      
    
        
     if (nestedItems[0]['resultData']['futures'].length != 0){
          this.maxpain.push({ text1: 'max pain', text2: nestedItems[0]['resultData']['futureOption'].max_pain })
         this.stockpcr.push({ text1: 'PCR', text2: nestedItems[0]['resultData']['futureOption'].pcr })
        
    }
      
     })
  }

    gettrendlyne3fetch(tlid, eqsymbol, tlname) {
     
     
          this.dataApi.gettrendlyne3fetch(this.tlid, this.eqsymbol, this.tlname).subscribe(data5 => {
            let nestedItems = Object.keys(data5).map(key => {
              return data5[key];
            });
          //  console.log(nestedItems)
           
           if(nestedItems[0].body.hasOwnProperty('_avg_target')){
          
          this.brokertarget.push({ text1: nestedItems[0].body['broker_avg_target']['lt1'], text2: nestedItems[0].body['broker_avg_target']['st1'], text3: nestedItems[0].body['broker_avg_target']['color1'] })
            } if (nestedItems[0].body.hasOwnProperty('ema_26')){
          this.ema_26.push({ text1: nestedItems[0].body['ema_26']['lt1'], text2: nestedItems[0].body['ema_26']['st1'], text3: nestedItems[0].body['ema_26']['color1'], text4: nestedItems[0].body['ema_26']['value'] })
            } if (nestedItems[0].body.hasOwnProperty('ema_50')){
              this.ema_50.push({ text1: nestedItems[0].body['ema_50']['lt1'], text2: nestedItems[0].body['ema_50']['st1'], text3: nestedItems[0].body['ema_50']['color1'], text4: nestedItems[0].body['ema_50']['value'] })
            } if (nestedItems[0].body.hasOwnProperty('ema_100')){
              this.ema_100.push({ text1: nestedItems[0].body['ema_100']['lt1'], text2: nestedItems[0].body['ema_100']['st1'], text3: nestedItems[0].body['ema_100']['color1'], text4: nestedItems[0].body['ema_100']['value'] })
            } if(nestedItems[0].body.hasOwnProperty('ema_200')){
              this.ema_200.push({ text1: nestedItems[0].body['ema_200']['lt1'], text2: nestedItems[0].body['ema_100']['st1'], text3: nestedItems[0].body['ema_100']['color1'], text4: nestedItems[0].body['ema_200']['value'] })
            } if(nestedItems[0].body.hasOwnProperty('sma_30')){
              this.sma_30.push({ text1: nestedItems[0].body['sma_30']['lt1'], text2: nestedItems[0].body['sma_30']['st1'], text3: nestedItems[0].body['sma_30']['color1'], text4: nestedItems[0].body['sma_30']['value'] })
            } if(nestedItems[0].body.hasOwnProperty('sma_50')){
              this.sma_50.push({ text1: nestedItems[0].body['sma_50']['lt1'], text2: nestedItems[0].body['sma_50']['st1'], text3: nestedItems[0].body['sma_50']['color1'], text4: nestedItems[0].body['sma_50']['value'] })
            } if(nestedItems[0].body.hasOwnProperty('sma_100')){
              this.sma_100.push({ text1: nestedItems[0].body['sma_100']['lt1'], text2: nestedItems[0].body['sma_100']['st1'], text3: nestedItems[0].body['sma_100']['color1'], text4: nestedItems[0].body['sma_100']['value'] })
            } if(nestedItems[0].body.hasOwnProperty('sma_100')){
              this.sma_200.push({ text1: nestedItems[0].body['sma_200']['lt1'], text2: nestedItems[0].body['sma_100']['st1'], text3: nestedItems[0].body['sma_100']['color1'], text4: nestedItems[0].body['sma_200']['value'] })
            } if(nestedItems[0].body.hasOwnProperty('macd')){
            this.macd1.push({ text1: nestedItems[0].body['macd']['lt1'], text2: nestedItems[0].body['macd']['st1'], text3: nestedItems[0].body['macd']['color1'], text4: nestedItems[0].body['macd']['value'] })
            }
             if(nestedItems[0].body.hasOwnProperty('rsi')){
              this.rsi1.push({ text1: nestedItems[0].body['rsi']['lt1'], text2: nestedItems[0].body['rsi']['st1'], text3: nestedItems[0].body['rsi']['color1'], text4: nestedItems[0].body['rsi']['value'] })
            }  if(nestedItems[0].body.hasOwnProperty('mfi')){
              this.mfi1.push({ text1: nestedItems[0].body['mfi']['lt1'], text2: nestedItems[0].body['mfi']['st1'], text3: nestedItems[0].body['mfi']['color1'], text4: nestedItems[0].body['mfi']['value'] })
           }   if (nestedItems[0].body.hasOwnProperty('broker_recodown_6M')) {
            this.brokerrecodowngrade.push({ text1: nestedItems[0].body['broker_recodown_6M']['lt1'], text2: nestedItems[0].body['broker_recodown_6M']['st1'], text3: nestedItems[0].body['broker_recodown_6M']['color1'] })
          }
          if (nestedItems[0].body.hasOwnProperty('broker_recoup_6M')) {
            this.brokerrecoupgrade.push({ text1: nestedItems[0].body['broker_recoup_6M']['lt1'], text2: nestedItems[0].body['broker_recoup_6M']['st1'], text3: nestedItems[0].body['broker_recoup_6M']['color1'] })
          }
           if (nestedItems[0].body.hasOwnProperty('broker_targetup_6M')) {
            this.brokertargetupgrade.push({ text1: nestedItems[0].body['broker_targetup_6M']['lt1'], text2: nestedItems[0].body['broker_targetup_6M']['st1'], text3: nestedItems[0].body['broker_targetup_6M']['color1'] })
          }
          if (nestedItems[0].body.hasOwnProperty('broker_targetdown_6M')) {
            this.brokertargetdowngrade.push({ text1: nestedItems[0].body['broker_targetdown_6M']['lt1'], text2: nestedItems[0].body['broker_targetdown_6M']['st1'], text3: nestedItems[0].body['broker_targetdown_6M']['color1'] })
          }
          if (nestedItems[0].body['MCAP_Q']['lt1']) {
            if (nestedItems[0].body['MCAP_Q']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['MCAP_Q']['lt1'], text2: nestedItems[0].body['MCAP_Q']['title'], text3: nestedItems[0].body['MCAP_Q']['value'] })
            }
             if (nestedItems[0].body['MCAP_Q']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['MCAP_Q']['lt1'], text2: nestedItems[0].body['MCAP_Q']['title'], text3: nestedItems[0].body['MCAP_Q']['value'] })
            }
             if (nestedItems[0].body['MCAP_Q']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['MCAP_Q']['lt1'], text2: nestedItems[0].body['MCAP_Q']['title'], text3: nestedItems[0].body['MCAP_Q']['value'] })
            }
          }
          if (nestedItems[0].body['NP_Q']['lt2']) {
            if (nestedItems[0].body['NP_Q']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['NP_Q']['value'], text2: nestedItems[0].body['NP_Q']['lt2'], text3: nestedItems[0].body['NP_Q']['st2'] })
            }
             if (nestedItems[0].body['NP_Q']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['NP_Q']['value'], text2: nestedItems[0].body['NP_Q']['lt2'], text3: nestedItems[0].body['NP_Q']['st2'] })
            }
             if (nestedItems[0].body['NP_Q']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['NP_Q']['value'], text2: nestedItems[0].body['NP_Q']['lt2'], text3: nestedItems[0].body['NP_Q']['st2'] })
            }
          }
          if (nestedItems[0].body['PBV_A']['st1']) {
            if (nestedItems[0].body['PBV_A']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['PBV_A']['lt1'], text2: nestedItems[0].body['PBV_A']['st1'], text3: nestedItems[0].body['PBV_A']['value'] })
            }
             if (nestedItems[0].body['PBV_A']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['PBV_A']['lt1'], text2: nestedItems[0].body['PBV_A']['st1'], text3: nestedItems[0].body['PBV_A']['value'] })
            }
             if (nestedItems[0].body['PBV_A']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['PBV_A']['lt1'], text2: nestedItems[0].body['PBV_A']['st1'], text3: nestedItems[0].body['PBV_A']['value'] })
            }
          }
          if (nestedItems[0].body['PE_TTM']['lt1']) {
            if (nestedItems[0].body['PE_TTM']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['PE_TTM']['lt1'], text2: nestedItems[0].body['PE_TTM']['title'], text3: nestedItems[0].body['PE_TTM']['value'] })
            }
             if (nestedItems[0].body['PE_TTM']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['PE_TTM']['lt1'], text2: nestedItems[0].body['PE_TTM']['title'], text3: nestedItems[0].body['PE_TTM']['value'] })
            }
             if (nestedItems[0].body['PE_TTM']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['PE_TTM']['lt1'], text2: nestedItems[0].body['PE_TTM']['title'], text3: nestedItems[0].body['PE_TTM']['value'] })
            }
          }
          if (nestedItems[0].body['SR_Q']['lt1']) {
            if (nestedItems[0].body['SR_Q']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['SR_Q']['lt2'], text2: nestedItems[0].body['SR_Q']['st2'], text3: nestedItems[0].body['SR_Q']['value'] })
            }
             if (nestedItems[0].body['SR_Q']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['SR_Q']['lt2'], text2: nestedItems[0].body['SR_Q']['st2'], text3: nestedItems[0].body['SR_Q']['value'] })
            }
             if (nestedItems[0].body['SR_Q']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['SR_Q']['lt2'], text2: nestedItems[0].body['SR_Q']['st2'], text3: nestedItems[0].body['SR_Q']['value'] })
            }
          }
          if (nestedItems[0].body['beta_1Y']['lt1']) {
            if (nestedItems[0].body['beta_1Y']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['beta_1Y']['lt1'], text2: nestedItems[0].body['beta_1Y']['st1'], text3: nestedItems[0].body['beta_1Y']['value'] })
            }
             if (nestedItems[0].body['beta_1Y']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['beta_1Y']['lt1'], text2: nestedItems[0].body['beta_1Y']['st1'], text3: nestedItems[0].body['beta_1Y']['value'] })
            }
             if (nestedItems[0].body['beta_1Y']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['beta_1Y']['lt1'], text2: nestedItems[0].body['beta_1Y']['st1'], text3: nestedItems[0].body['beta_1Y']['value'] })
            }
          }
          if (nestedItems[0].body['ema_26']['lt1']) {
            if (nestedItems[0].body['ema_26']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['ema_26']['lt1'], text2: nestedItems[0].body['ema_26']['st1'], text3: nestedItems[0].body['ema_26']['value'] })
            }
             if (nestedItems[0].body['ema_26']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['ema_26']['lt1'], text2: nestedItems[0].body['ema_26']['st1'], text3: nestedItems[0].body['ema_26']['value'] })
            }
             if (nestedItems[0].body['ema_26']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['ema_26']['lt1'], text2: nestedItems[0].body['ema_26']['st1'], text3: nestedItems[0].body['ema_26']['value'] })
            }
          }
          if (nestedItems[0].body['ema_50']['lt1']) {
            if (nestedItems[0].body['ema_50']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['ema_50']['lt1'], text2: nestedItems[0].body['ema_50']['st1'], text3: nestedItems[0].body['ema_50']['value'] })
            }
             if (nestedItems[0].body['ema_50']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['ema_50']['lt1'], text2: nestedItems[0].body['ema_50']['st1'], text3: nestedItems[0].body['ema_50']['value'] })
            }
             if (nestedItems[0].body['ema_50']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['ema_50']['lt1'], text2: nestedItems[0].body['ema_50']['st1'], text3: nestedItems[0].body['ema_50']['value'] })
            }
          }
          if (nestedItems[0].body['ema_100']['lt1']) {
            if (nestedItems[0].body['ema_100']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['ema_100']['lt1'], text2: nestedItems[0].body['ema_100']['st1'], text3: nestedItems[0].body['ema_100']['value'] })
            }
             if (nestedItems[0].body['ema_100']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['ema_100']['lt1'], text2: nestedItems[0].body['ema_100']['st1'], text3: nestedItems[0].body['ema_100']['value'] })
            }
             if (nestedItems[0].body['ema_100']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['ema_100']['lt1'], text2: nestedItems[0].body['ema_100']['st1'], text3: nestedItems[0].body['ema_100']['value'] })
            }
          }
          if (nestedItems[0].body['ema_200']['lt1']) {
            if (nestedItems[0].body['ema_200']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['ema_200']['lt1'], text2: nestedItems[0].body['ema_200']['st1'], text3: nestedItems[0].body['ema_200']['value'] })
            }
             if (nestedItems[0].body['ema_200']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['ema_200']['lt1'], text2: nestedItems[0].body['ema_200']['st1'], text3: nestedItems[0].body['ema_200']['value'] })
            }
             if (nestedItems[0].body['ema_200']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['ema_200']['lt1'], text2: nestedItems[0].body['ema_200']['st1'], text3: nestedItems[0].body['ema_200']['value'] })
            }
          }
          if (nestedItems[0].body['sma_30']['lt1']) {
            if (nestedItems[0].body['sma_30']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['sma_30']['lt1'], text2: nestedItems[0].body['sma_30']['st1'], text3: nestedItems[0].body['sma_30']['value'] })
            }
             if (nestedItems[0].body['sma_30']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['sma_30']['lt1'], text2: nestedItems[0].body['sma_30']['st1'], text3: nestedItems[0].body['sma_30']['value'] })
            }
             if (nestedItems[0].body['sma_30']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['sma_30']['lt1'], text2: nestedItems[0].body['sma_30']['st1'], text3: nestedItems[0].body['sma_30']['value'] })
            }
          }
          if (nestedItems[0].body['sma_50']['lt1']) {
            if (nestedItems[0].body['sma_50']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['sma_50']['lt1'], text2: nestedItems[0].body['sma_50']['st1'], text3: nestedItems[0].body['sma_50']['value'] })
            }
             if (nestedItems[0].body['sma_50']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['sma_50']['lt1'], text2: nestedItems[0].body['sma_50']['st1'], text3: nestedItems[0].body['sma_50']['value'] })
            }
             if (nestedItems[0].body['sma_50']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['sma_50']['lt1'], text2: nestedItems[0].body['sma_50']['st1'], text3: nestedItems[0].body['sma_50']['value'] })
            }
          }
          if (nestedItems[0].body['sma_100']['lt1']) {
            if (nestedItems[0].body['sma_100']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['sma_100']['lt1'], text2: nestedItems[0].body['sma_100']['st1'], text3: nestedItems[0].body['sma_100']['value'] })
            }
             if (nestedItems[0].body['sma_100']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['sma_100']['lt1'], text2: nestedItems[0].body['sma_100']['st1'], text3: nestedItems[0].body['sma_100']['value'] })
            }
             if (nestedItems[0].body['sma_100']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['sma_100']['lt1'], text2: nestedItems[0].body['sma_100']['st1'], text3: nestedItems[0].body['sma_100']['value'] })
            }
          }
          if (nestedItems[0].body['sma_200']['lt1']) {
            if (nestedItems[0].body['sma_200']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['sma_200']['lt1'], text2: nestedItems[0].body['sma_200']['st1'], text3: nestedItems[0].body['sma_200']['value'] })
            }
             if (nestedItems[0].body['sma_200']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['sma_200']['lt1'], text2: nestedItems[0].body['sma_200']['st1'], text3: nestedItems[0].body['sma_200']['value'] })
            }
             if (nestedItems[0].body['sma_200']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['sma_200']['lt1'], text2: nestedItems[0].body['sma_200']['st1'], text3: nestedItems[0].body['sma_200']['value'] })
            }
          }
          if (nestedItems[0].body['macd']['lt1']) {
            if (nestedItems[0].body['macd']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['macd']['lt1'], text2: nestedItems[0].body['macd']['st1'], text3: nestedItems[0].body['macd']['value'] })
            }
             if (nestedItems[0].body['macd']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['macd']['lt1'], text2: nestedItems[0].body['macd']['st1'], text3: nestedItems[0].body['macd']['value'] })
            }
             if (nestedItems[0].body['macd']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['macd']['lt1'], text2: nestedItems[0].body['macd']['st1'], text3: nestedItems[0].body['macd']['value'] })
            }
          }
          // if (nestedItems[0].body['macdsignal']['lt1']) {
          //   if (nestedItems[0].body['macdsignal']['color1'] == 'positive') {
          //     this.positive.push({ text1: nestedItems[0].body['macdsignal']['lt1'], text2: nestedItems[0].body['macdsignal']['st1'], text3: nestedItems[0].body['macdsignal']['value'] })
          //   }
          //   else if (nestedItems[0].body['macdsignal']['color1'] == 'negative') {
          //     this.negative.push({ text1: nestedItems[0].body['macdsignal']['lt1'], text2: nestedItems[0].body['macdsignal']['st1'], text3: nestedItems[0].body['macdsignal']['value'] })
          //   }
          //   else if (nestedItems[0].body['macdsignal']['color1'] == 'neutral') {
          //     this.neutral.push({ text1: nestedItems[0].body['macdsignal']['lt1'], text2: nestedItems[0].body['macdsignal']['st1'], text3: nestedItems[0].body['macdsignal']['value'] })
          //   }
          // }
          if (nestedItems[0].body['mfi']['lt1']) {
            if (nestedItems[0].body['mfi']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['mfi']['lt1'], text2: nestedItems[0].body['mfi']['st1'], text3: nestedItems[0].body['mfi']['value'] })
            }
            else if (nestedItems[0].body['mfi']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['mfi']['lt1'], text2: nestedItems[0].body['mfi']['st1'], text3: nestedItems[0].body['mfi']['value'] })
            }
            else if (nestedItems[0].body['mfi']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['mfi']['lt1'], text2: nestedItems[0].body['mfi']['st1'], text3: nestedItems[0].body['mfi']['value'] })
            }
          }
          if (nestedItems[0].body['rsi']['lt1']) {
            if (nestedItems[0].body['rsi']['color1'] == 'positive') {
              this.positive.push({ text1: nestedItems[0].body['rsi']['lt1'], text2: nestedItems[0].body['rsi']['st1'], text3: nestedItems[0].body['rsi']['value'] })
            }
            else if (nestedItems[0].body['rsi']['color1'] == 'negative') {
              this.negative.push({ text1: nestedItems[0].body['rsi']['lt1'], text2: nestedItems[0].body['rsi']['st1'], text3: nestedItems[0].body['rsi']['value'] })
            }
            else if (nestedItems[0].body['rsi']['color1'] == 'neutral') {
              this.neutral.push({ text1: nestedItems[0].body['rsi']['lt1'], text2: nestedItems[0].body['rsi']['st1'], text3: nestedItems[0].body['rsi']['value'] })
            }
          }
        }, err => {
          console.log(err)
        })
      

  
  }
  
  gettrendlynestocks2(tlid) {
   
    this.dataApi.gettrendlyne2fetch(this.tlid).subscribe(data5 => {
      let nestedItems = Object.keys(data5).map(key => {
        return data5[key];
      });
     
        this.dscore.push({ text1: nestedItems[0]['body']['stockData'][6], text2: nestedItems[0]['body']['stockData'][9],text3:nestedItems[0]['body']['stockData'][7], text4: nestedItems[0]['body']['stockData'][10] ,text5:nestedItems[0]['body']['stockData'][8], text6: nestedItems[0]['body']['stockData'][11]})
        this.volscore.push({ text1: nestedItems[0]['body']['stockData'][7], text2: nestedItems[0]['body']['stockData'][10] })
        this.mscore.push({ text1: nestedItems[0]['body']['stockData'][8], text2: nestedItems[0]['body']['stockData'][11] })
       
      }, err => {
        console.log(err)
      })
  }
  
  ////////////////////////////////Market Mojo///////////////////////////////
  getmmstockinfo(stockid) {
    this.http.get('https://frapi.marketsmojo.com/stocks_stocksid/header_info?sid=' + this.stockid + '&exchange=1').subscribe(data5 => {
      // let nestedItems = Object.keys(data5).map(key => {
      //   return data5[key];
      // });
      // for (let val in nestedItems[5]) {
      //   this.hmsg.push({ text: nestedItems[5][val].header, text1: nestedItems[5][val].msg, text2: nestedItems[5][val].dir })
      // }
      // for (let val in nestedItems[4]["popup"]) {
      //   this.mmdelivcomp=nestedItems[4]["popup"][val] 
      // }
      // this.score.push({ text: nestedItems[2].score, text1: "Score" })
      // this.scoret.push({ text: nestedItems[2].scoreText, text1: "Reco" })
      // this.fscore.push({ text: nestedItems[2].f_clr, text1: nestedItems[2].f_dir, text2: nestedItems[2].f_pts, text3: nestedItems[2].f_txt, text4: "Financial" })
      // this.qscore.push({ text: nestedItems[2].q_clr, text1: nestedItems[2].q_dir, text2: nestedItems[2].q_rank, text3: nestedItems[2].q_txt, text4: "Quality" })
      // this.vscore.push({ text: nestedItems[2].v_clr, text1: nestedItems[2].v_rank, text2: nestedItems[2].v_txt, text3: "Valuation" })
      // this.techscore.push({ text: nestedItems[2].tech_clr, text1: nestedItems[2].tech_score, text2: nestedItems[2].tech_txt, text3: "Tech" })
    }, err => {
      console.log(err)
    }
    )
  }
  
}



