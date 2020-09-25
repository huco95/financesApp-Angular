import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private tokenService : TokenStorageService,
    private http: HttpClient,
    private router : Router) { }

    public async canActivate() {
      if (this.tokenService.getToken() && await this.validateToken()) {
        return true;
      }

      this.tokenService.removeToken();
      this.router.navigate(['login']);
      return false;
    }

    private validateToken() {
      return this.http.get(environment.api_base + '/login/jwt/validate').toPromise()
              .then(res => { return true; })
              .catch(err => { return false; });
    }
}
