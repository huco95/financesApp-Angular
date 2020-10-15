import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showError: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  login(loginData: any) {
    this.isLoading = true;
    this.showError = false;

    if (loginData.username == "" || loginData.password == "") {
      this.showError = true;
      this.isLoading = false;
    } else {
      this.authService.login(loginData.username, loginData.password).subscribe(
        res => {
          this.authService.saveToken(res);
          this.router.navigate(['home']);
        },
        err => {
          this.showError = true;
          this.isLoading = false;
        }
      );
    }
  }

  tooglePassword() {
    this.showPassword = !this.showPassword;
  }
}
