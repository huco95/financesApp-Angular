import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', {updateOn: 'change', validators: [Validators.required]}],
      password: ['', {updateOn: 'change', validators: [Validators.required]}],
      confirmPassword: ['', {updateOn: 'change', validators: [Validators.required]}]
    });
  }

  // Form getters
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  ngOnInit(): void {
  }

  registerUser() {
    // TOOD register user
    if (this.registerForm.valid) {
       
    } else {
      this.showFormErrors();
    }
  }
  
  /**
   * Mark all form controls as touched to show form errors.
   */
  private showFormErrors() {
    Object.keys(this.registerForm.controls).forEach(field => {
      this.registerForm.get(field).markAsTouched({ onlySelf: true });
    });
  }


  tooglePassword() {
    this.showPassword = !this.showPassword;
  }
}
