import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isNewUser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

    this.isNewUser = this.activatedRoute.snapshot.paramMap.get('user') === 'new';
  }

  login(loginData: any) {
    this.isNewUser = false;
    this.isLoading = true;
    this.showError = false;

    if (loginData.username == "" || loginData.password == "") {
      this.showError = true;
      this.isLoading = false;
    } else {
      this.authService.login(loginData.username, loginData.password).subscribe(
        loginResponse => {
          if (loginResponse.success && loginResponse.token) {
            this.authService.saveToken(loginResponse.token);
            this.router.navigate(['home']);
            
          } else {
            this.showError = true;
            this.isLoading = false;
          }


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
