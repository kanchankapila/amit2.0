import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../core/services/navigation.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SplashScreenComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // Show the splash screen for 3 seconds then navigate to homepage
    setTimeout(() => {
      this.navigationService.goToHomepage({ replaceUrl: true });
    }, 3000);
  }
} 