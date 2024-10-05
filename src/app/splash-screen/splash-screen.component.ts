import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Show the splash screen for 3 seconds (3000 ms) and then navigate to the homepage
    setTimeout(() => {
      this.router.navigate(['/homepage']);
    }, 3000);
  }
}
