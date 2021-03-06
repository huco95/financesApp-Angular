import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Move } from 'src/app/models/moves/move';
import { MovesDate } from 'src/app/models/moves/movesDate';
import { CategoryService } from 'src/app/services/moves/category.service';
import { MovesService } from 'src/app/services/moves/moves.service';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
})
export class MoveListComponent implements OnInit, OnDestroy {
  isLoading: boolean;

  movesDate: Array<MovesDate>;
  updatedMove: Move;

  subscription: Subscription;

  constructor(private movesService: MovesService, private categroyService: CategoryService) { }

  ngOnInit(): void {
    this.subscription = this.movesService.movesUpdated.subscribe(
      move => {
        this.isLoading = true;
        this.updatedMove = move;
        this.getMoves();
      }
    );
    
    this.isLoading = true;
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
            move.category = this.categroyService.generateCategroyIcon(move.category);
          });
        });

        this.isLoading = false;
      }
    );
  }

  private addUpdatedMove(move: Move) {
    this.updatedMove = move;
    this.updatedMove.category = this.categroyService.generateCategroyIcon(this.updatedMove.category);

    // Add move to the movesDate list
    // Check if the move is for the current move
    // If so, add the move to the correspondig date or create a new moveDate if the date is not present

    this.isLoading = false;
  }

}
