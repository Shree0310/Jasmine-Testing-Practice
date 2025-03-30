// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" class="form-control">
        <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="error-message">
          <div *ngIf="name?.errors?.['required']">Name is required</div>
          <div *ngIf="name?.errors?.['minlength']">Name must be at least 3 characters</div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" class="form-control">
        <div *ngIf="email?.invalid && (email?.dirty || email?.touched)" class="error-message">
          <div *ngIf="email?.errors?.['required']">Email is required</div>
          <div *ngIf="email?.errors?.['email']">Please enter a valid email</div>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" formControlName="password" class="form-control">
        <div *ngIf="password?.invalid && (password?.dirty || password?.touched)" class="error-message">
          <div *ngIf="password?.errors?.['required']">Password is required</div>
          <div *ngIf="password?.errors?.['minlength']">Password must be at least 6 characters</div>
        </div>
      </div>

      <button type="submit" [disabled]="userForm.invalid">Register</button>
    </form>
    
    <div *ngIf="submitted" class="success-message">
      Registration successful!
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      margin-top: 4px;
    }
    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }
    .success-message {
      color: green;
      margin-top: 15px;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      this.submitted = true;
      // In a real app, you'd call a service to register the user
    }
  }

  // Getter methods for easier access to form controls
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
}