
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],

  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class ShareComponent implements OnInit {

  shareForm: FormGroup;

  shareForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.shareForm = this.formBuilder.group({
      recipient: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  onSubmit(): void {
    if (this.shareForm.valid) {
      // Handle form submission
      console.log('Form submitted:', this.shareForm.value);
      this.snackBar.open('Shared successfully!', 'Close', {
        duration: 3000
      });
      // Navigate back to dashboard after successful share
      this.router.navigate(['/dashboard']);
    }
  }

}
