import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovesService } from 'src/app/services/moves/moves.service';
import { TotalsService } from 'src/app/services/stats/totals.service';

@Component({
  selector: 'app-stats-totals',
  templateUrl: './totals.component.html'
})
export class TotalsComponent implements OnInit, OnDestroy {
  isLoading: boolean;

  incomes: number = 0;
  expenses: number = 0;
  balance: number = 0;

  subscription: Subscription;

  constructor(private movesService: MovesService, private totalsService: TotalsService) { }

  ngOnInit(): void {
    this.subscription = this.movesService.movesUpdated.subscribe(
      () => {
        this.isLoading = true;
        this.initalizeTotals();
      }
    );
    
    this.isLoading = true;
    this.initalizeTotals();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private initalizeTotals() {
    this.totalsService.getTotals().subscribe(
      totals => {
        this.incomes = totals.incomes;
        this.expenses = totals.expenses;
        this.balance = totals.balance;

        this.isLoading = false;
      }
    );
  }
}
