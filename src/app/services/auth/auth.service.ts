import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Response } from 'src/app/models/reponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  public login(username: string, password: string): Observable<any> {
    const payload = new HttpParams().set('username', username).set('password', password);
    return this.http.post<any>(environment.api_base + '/login/jwt', payload);
  }

  public register(username: string, password: string): Observable<Response> {
    const payload = new HttpParams().set('username', username).set('password', password);
    return this.http.post<any>(environment.api_base + '/signup', payload);
  }

  public logout() {
    this.tokenStorageService.removeToken();
    this.router.navigate(['login']);
  }

  public isLoggedIn() {
    return this.tokenStorageService.getToken();
  }

  public saveToken(token) {
    this.tokenStorageService.saveToken(token);
  }
}
