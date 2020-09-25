import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ChartData } from 'src/app/models/stats/chartData';
import { MonthService } from '../month/month.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesChartService {

  constructor(private http: HttpClient, private monthService: MonthService) { }

  public getDataset(): Observable<ChartData> {
    return this.http.get<ChartData>(environment.api_base + "/stats/chart/categories", {
      params: {
        initDate: this.monthService.getInitalDate(),
        endDate: this.monthService.getEndDate(),
      }
    })
    .pipe(
      //catchError(() => { return of({{incomes: 0, expenses: 0, balance: 0}}); }),
    );
  }
}
