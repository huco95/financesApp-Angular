import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TotalsComponent } from './components/stats/totals/totals.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { AnnualChartComponent } from './components/stats/annual-chart/annual-chart.component';
import { CategoriesChartComponent } from './components/stats/categories-chart/categories-chart.component';
import { MoveListComponent } from './components/moves/move-list/move-list.component';
import { ChartLegendComponent } from './components/stats/chart-legend/chart-legend.component';
import { MoveFormComponent } from './components/moves/move-form/move-form.component';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';
import { ModalComponent } from './components/modal/modal.component';
import { MoveModalComponent } from './components/moves/move-modal/move-modal.component';
import { MoveListEmptyComponent } from './components/moves/move-list-empty/move-list-empty.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TotalsComponent,
    HeaderComponent,
    UserDropdownComponent,
    AnnualChartComponent,
    CategoriesChartComponent,
    MoveListComponent,
    ChartLegendComponent,
    MoveFormComponent,
    MonthSelectorComponent,
    ModalComponent,
    MoveModalComponent,
    MoveListEmptyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
