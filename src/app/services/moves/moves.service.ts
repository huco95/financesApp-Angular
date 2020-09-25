import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovesDate } from 'src/app/models/moves/movesDate';

import { environment } from '../../../environments/environment';

import { Observable, Subject } from 'rxjs';
import { Move } from 'src/app/models/moves/move';
import { MonthService } from '../month/month.service';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  // Observable move source
  private moveSubmitedSource = new Subject<Move>();
  private movesUpdatedSource = new Subject<Move>();

  // Observable move stream
  moveSubmited = this.moveSubmitedSource.asObservable();
  movesUpdated = this.movesUpdatedSource.asObservable();

  constructor(private http: HttpClient, private monthService: MonthService) { }

  // Moves commands
  submitMove(move: Move) {
    this.moveSubmitedSource.next(move);
  }

  updateMoves(move: Move) {
    this.movesUpdatedSource.next(move);
  }

  public getAllMoves(): Observable<Array<MovesDate>> {
    return this.http.get<Array<MovesDate>>(environment.api_base + "/moves/dateGrouped", {
      params: {
        initDate: this.monthService.getInitalDate(),
        endDate: this.monthService.getEndDate(),
      }
    })
    .pipe(
      //catchError(() => { return of({{incomes: 0, expenses: 0, balance: 0}}); }),
    );
  }

  public saveMove(move: Move): any {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(environment.api_base + '/move', JSON.stringify(move), {headers: headers});
  }

  public getMove(id: string): Observable<Move> {
    return this.http.get<Move>(environment.api_base + '/move/' + id);
  }

  public delteMove(id: string): Observable<any> {
    return this.http.delete<any>(environment.api_base + '/move/' + id);
  }
}
