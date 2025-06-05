import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="error-container" *ngIf="message">
      <mat-icon class="error-icon">error</mat-icon>
      <span class="error-text">{{ message }}</span>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      padding: 16px;
      margin: 8px 0;
      background-color: #ffebee;
      border-radius: 4px;
      color: #c62828;
    }
    .error-icon {
      margin-right: 8px;
    }
    .error-text {
      font-size: 14px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  @Input() message = '';
} 