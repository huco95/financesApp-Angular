import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { MonthService } from '../month/month.service';
import { CategoriesChart } from 'src/app/models/charts/categoriesChart';

@Injectable({
  providedIn: 'root'
})
export class CategoriesChartService {

  constructor(private http: HttpClient, private monthService: MonthService) { }

  public getDataset(): Observable<Array<CategoriesChart>> {
    return this.http.get<Array<CategoriesChart>>(environment.api_base + "/stats/chart/categories", {
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
