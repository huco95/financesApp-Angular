import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { MonthService } from '../month/month.service';
import { AnnualChart } from 'src/app/models/charts/annualChart';
import { ChartData } from 'src/app/models/charts/chartData';

@Injectable({
  providedIn: 'root'
})
export class AnnualChartService {

  constructor(private http: HttpClient, private monthService: MonthService) { }

  public getDataset(): Observable<AnnualChart> {
    return this.http.get<AnnualChart>(environment.api_base + "/stats/chart/annual", {
      params: {
        initDate: this.monthService.getYearInitalDate(),
        endDate: this.monthService.getYearEndDate(),
      }
    })
    .pipe(
      //catchError(() => { return of({{incomes: 0, expenses: 0, balance: 0}}); }),
    );
  }
}
