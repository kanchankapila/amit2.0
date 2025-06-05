import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-container">
      <mat-card>
        <mat-card-title>Application Settings</mat-card-title>
        <mat-card-content>
          <form [formGroup]="settingsForm">
            <!-- Theme Settings -->
            <div class="settings-section">
              <h3>Theme</h3>
              <mat-slide-toggle formControlName="darkMode">
                Dark Mode
              </mat-slide-toggle>
            </div>

            <!-- Notification Settings -->
            <div class="settings-section">
              <h3>Notifications</h3>
              <mat-slide-toggle formControlName="emailNotifications">
                Email Notifications
              </mat-slide-toggle>
              
              <mat-slide-toggle formControlName="pushNotifications">
                Push Notifications
              </mat-slide-toggle>

              <mat-form-field>
                <mat-label>Alert Frequency</mat-label>
                <mat-select formControlName="alertFrequency">
                  <mat-option value="realtime">Real-time</mat-option>
                  <mat-option value="hourly">Hourly</mat-option>
                  <mat-option value="daily">Daily</mat-option>
                  <mat-option value="weekly">Weekly</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Data Display Settings -->
            <div class="settings-section">
              <h3>Data Display</h3>
              <mat-form-field>
                <mat-label>Default Chart Type</mat-label>
                <mat-select formControlName="defaultChartType">
                  <mat-option value="candlestick">Candlestick</mat-option>
                  <mat-option value="line">Line</mat-option>
                  <mat-option value="area">Area</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Default Time Frame</mat-label>
                <mat-select formControlName="defaultTimeFrame">
                  <mat-option value="1D">1 Day</mat-option>
                  <mat-option value="1W">1 Week</mat-option>
                  <mat-option value="1M">1 Month</mat-option>
                  <mat-option value="3M">3 Months</mat-option>
                  <mat-option value="1Y">1 Year</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="actions">
              <button mat-raised-button color="primary" (click)="saveSettings()">
                Save Settings
              </button>
              <button mat-button (click)="resetSettings()">
                Reset to Defaults
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .settings-section {
      margin-bottom: 2rem;
    }
    .settings-section h3 {
      margin-bottom: 1rem;
      color: var(--mat-primary-text);
    }
    mat-slide-toggle {
      display: block;
      margin-bottom: 1rem;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      darkMode: [false],
      emailNotifications: [true],
      pushNotifications: [true],
      alertFrequency: ['daily'],
      defaultChartType: ['candlestick'],
      defaultTimeFrame: ['1D']
    });
  }

  ngOnInit(): void {
    // TODO: Load user settings
    this.loadSettings();
  }

  loadSettings(): void {
    // TODO: Implement loading settings from storage/API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settingsForm.patchValue(JSON.parse(savedSettings));
    }
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      // TODO: Implement saving settings to storage/API
      localStorage.setItem('userSettings', JSON.stringify(this.settingsForm.value));
      console.log('Settings saved:', this.settingsForm.value);
    }
  }

  resetSettings(): void {
    this.settingsForm.reset({
      darkMode: false,
      emailNotifications: true,
      pushNotifications: true,
      alertFrequency: 'daily',
      defaultChartType: 'candlestick',
      defaultTimeFrame: '1D'
    });
  }
} 