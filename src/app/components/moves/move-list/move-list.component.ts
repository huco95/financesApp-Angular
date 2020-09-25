import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Move } from 'src/app/models/moves/move';
import { MovesDate } from 'src/app/models/moves/movesDate';
import { MovesService } from 'src/app/services/moves/moves.service';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent implements OnInit, OnDestroy {
  movesDate: Array<MovesDate>;
  updatedMove: Move;

  subscription: Subscription;

  constructor(private movesService: MovesService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subscription = this.movesService.movesUpdated.subscribe(
      move => {
        this.updatedMove = move;
        this.getMoves();
      }
    );
    
    this.getMoves();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private getMoves() {
    this.movesService.getAllMoves().subscribe(
      movesDate => {
        this.movesDate = movesDate;

        this.movesDate.forEach((moveDate) => {
          moveDate.moves.forEach((move) => {
            switch (move.category.name) {
              case "Nomina":
                move.category.icon_svg = this.sanitizer.bypassSecurityTrustHtml('<svg height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>');
                move.category.color = 'bg-green-600';
                break;
              case "Ingreso Extra":
                  move.category.icon_svg = this.sanitizer.bypassSecurityTrustHtml('<svg height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>');
                  move.category.color = 'bg-teal-600';
                  break;
              case "Gasolina":
                  move.category.icon_svg = this.sanitizer.bypassSecurityTrustHtml('<svg height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path fill="#fff" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>');
                  move.category.color = 'bg-gray-800';
                  break;
              case "Alimentación":
                  move.category.icon_svg = this.sanitizer.bypassSecurityTrustHtml('<svg height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>');
                  move.category.color = 'bg-orange-600';
                  break;
              case "Ocio":
                move.category.icon_svg = this.sanitizer.bypassSecurityTrustHtml('<svg height="24" width="24"< fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>');
                move.category.color = 'bg-indigo-600';
                break;
            
              default:
                break;
            }
          });
        });
      }
    );
  }

}
