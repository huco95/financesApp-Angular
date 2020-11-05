import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  showPassword: boolean = false;
  errorMessage: string;
  showError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', {updateOn: 'change', validators: [Validators.required]}],
      email: ['', {updateOn: 'change', validators: [Validators.required, Validators.email]}],
      password: ['', {updateOn: 'change', validators: [Validators.required]}],
    });
  }

  // Form getters
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  ngOnInit(): void {
  }

  /**
   * Register process.
   */
  registerUser() {
    this.isLoading = true;
    this.showError = false;
    this.showPassword = false;

    if (this.registerForm.valid) {
      this.authService.register(this.username.value, this.password.value).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['login', { user: 'new' }]);

          } else if (response.message === 'duplicate') {
            this.displayError('This username is already registered.');

          } else {
            this.displayError('There was an error creating your account. Please, try again.');
          }
        },
        err => {
          this.displayError('There was an error creating your account. Please, try again.');
        }
      );

    } else {
      this.showFormErrors();
    }

    this.isLoading = false;
  }

  private displayError(msg: string) {
    this.showError = true;
    this.errorMessage = msg;
  }
  
  /**
   * Mark all form controls as touched to show form errors.
   */
  private showFormErrors() {
    Object.keys(this.registerForm.controls).forEach(field => {
      this.registerForm.get(field).markAsTouched({ onlySelf: true });
    });
  }

  /**
   * Toogle show/hide password.
   */
  tooglePassword() {
    this.showPassword = !this.showPassword;
  }
}
