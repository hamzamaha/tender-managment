import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NonNullableFormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NzIconModule ,NzDropDownModule ,NzFormModule ,NzInputModule ,FormsModule ,ReactiveFormsModule ,NzButtonModule ,NzCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegistering = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  validateLoginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  validateRegisterForm: FormGroup<{
    fullName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    avatar: FormControl<string>;
    phoneNumber: FormControl<string>;
  }> = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  });

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  submitLoginForm(): void {
    if (this.validateLoginForm.valid) {
      const { userName, password } = this.validateLoginForm.value;
      this.http.post('http://localhost:8200/api/auth/login', {
        email: userName,
        password: password
      }).subscribe(
        (response: any) => {
          const token = response.accessToken;
          localStorage.setItem('authToken', token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login error', error);
        }
      );
    } else {
      Object.values(this.validateLoginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitRegisterForm(): void {
    if (this.validateRegisterForm.valid) {
      const { fullName, email, password, confirmPassword, avatar, phoneNumber } = this.validateRegisterForm.value;
      this.http.post('http://localhost:8200/api/auth/sign-up', {
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        avatar: avatar,
        phoneNumber: phoneNumber
      }).subscribe(
        (response: any) => {
          this.toggleForm(); // Switch back to login form after successful registration
        },
        (error) => {
          console.error('Registration error', error);
        }
      );
    } else {
      Object.values(this.validateRegisterForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
