import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideInAnimation } from 'src/animations/slideInAnimation';
import { MonthService } from 'src/app/services/month/month.service';
import { MovesService } from 'src/app/services/moves/moves.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private monthService: MonthService, private movesService: MovesService) {
    this. subscription = movesService.moveSubmited.subscribe(
      move => {
        movesService.updateMoves(move);
      }
    );
   }

  ngOnInit(): void {
    this.monthService.initalizeDates();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
