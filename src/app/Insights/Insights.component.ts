import { Component , ViewEncapsulation, OnInit } from '@angular/core';


@Component({
  selector: 'app-insights',
  templateUrl: './Insights.component.html',
  styleUrls: ['./Insights.component.scss'],
  encapsulation: ViewEncapsulation.None,
 
})
export class InsightsComponent implements OnInit {
  constructor() {
  }
  async ngOnInit() {
    await Promise.all([
    ])
   
  }
   
}
