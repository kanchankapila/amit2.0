import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-title>Profile Settings</mat-card-title>
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <mat-form-field>
              <mat-label>Name</mat-label>
              <input matInput formControlName="name">
              <mat-error *ngIf="profileForm.get('name')?.errors?.['required']">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error *ngIf="profileForm.get('email')?.errors?.['required']">Email is required</mat-error>
              <mat-error *ngIf="profileForm.get('email')?.errors?.['email']">Invalid email format</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone">
            </mat-form-field>

            <div class="actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="profileForm.invalid || !profileForm.dirty">
                Save Changes
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="password-card">
        <mat-card-title>Change Password</mat-card-title>
        <mat-card-content>
          <form [formGroup]="passwordForm" (ngSubmit)="onPasswordSubmit()">
            <mat-form-field>
              <mat-label>Current Password</mat-label>
              <input matInput type="password" formControlName="currentPassword">
              <mat-error *ngIf="passwordForm.get('currentPassword')?.errors?.['required']">Current password is required</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>New Password</mat-label>
              <input matInput type="password" formControlName="newPassword">
              <mat-error *ngIf="passwordForm.get('newPassword')?.errors?.['required']">New password is required</mat-error>
              <mat-error *ngIf="passwordForm.get('newPassword')?.errors?.['minlength']">Password must be at least 8 characters</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Confirm New Password</mat-label>
              <input matInput type="password" formControlName="confirmPassword">
              <mat-error *ngIf="passwordForm.get('confirmPassword')?.errors?.['required']">Confirm password is required</mat-error>
              <mat-error *ngIf="passwordForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="passwordForm.invalid">
                Change Password
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    mat-card {
      margin-bottom: 2rem;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // TODO: Load user profile data
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.profileForm.dirty) {
      // TODO: Implement profile update logic
      console.log('Profile form submitted:', this.profileForm.value);
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      // TODO: Implement password change logic
      console.log('Password form submitted:', this.passwordForm.value);
    }
  }
} 