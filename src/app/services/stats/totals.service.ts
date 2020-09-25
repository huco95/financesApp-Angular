import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Totals } from 'src/app/models/stats/totals';
import { MonthService } from '../month/month.service';

@Injectable({
  providedIn: 'root'
})
export class TotalsService {

  constructor(private http: HttpClient, private monthService: MonthService) { }

  public getTotals(): Observable<Totals> {
    return this.http.get<Totals>(environment.api_base + '/stats/totals', {
      params: {
        initDate: this.monthService.getInitalDate(),
        endDate: this.monthService.getEndDate(),
      }
    })
    .pipe(
      catchError(() => { return of({incomes: 0, expenses: 0, balance: 0}); }),
    );
  }
}
