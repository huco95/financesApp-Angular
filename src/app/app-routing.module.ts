import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuardService } from './services/auth/auth-guard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MoveFormComponent } from './components/moves/move-form/move-form.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {animation: 'LoginPage'} },
  { path: 'register', component: RegisterComponent, data: {animation: 'RegisterPage'} },
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'}, canActivate: [AuthGuardService], 
    children: [
      { path: 'move', component: MoveFormComponent, outlet: 'modal', data: {animation: 'MovePage'} },
      { path: 'move/:id', component: MoveFormComponent, outlet: 'modal', data: {animation: 'MovePage'} }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
