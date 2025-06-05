import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Stock Insights</h3>
          <p>Your comprehensive stock market analysis platform</p>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <nav>
            <a mat-button routerLink="/about">About</a>
            <a mat-button routerLink="/contact">Contact</a>
            <a mat-button routerLink="/privacy">Privacy Policy</a>
            <a mat-button routerLink="/terms">Terms of Service</a>
          </nav>
        </div>

        <div class="footer-section">
          <h4>Connect With Us</h4>
          <nav>
            <a mat-button href="https://twitter.com/stockinsights" target="_blank" rel="noopener">Twitter</a>
            <a mat-button href="https://linkedin.com/company/stockinsights" target="_blank" rel="noopener">LinkedIn</a>
            <a mat-button href="https://facebook.com/stockinsights" target="_blank" rel="noopener">Facebook</a>
          </nav>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Stock Insights. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--mat-toolbar-container-background-color);
      color: var(--mat-toolbar-container-text-color);
      padding: 32px 0 16px;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .footer-section {
      h3, h4 {
        margin: 0 0 16px;
        font-weight: 500;
      }

      p {
        margin: 0;
        opacity: 0.8;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: 8px;

        a {
          text-align: left;
          padding: 0;
          height: 32px;
          line-height: 32px;
          opacity: 0.8;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .footer-bottom {
      margin-top: 32px;
      padding: 16px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);

      p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.8;
      }
    }

    :host-context(.dark-theme) {
      .footer-bottom {
        border-top-color: rgba(255, 255, 255, 0.1);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 