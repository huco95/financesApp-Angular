import { Component, OnInit } from '@angular/core';
import { MonthService } from 'src/app/services/month/month.service';

@Component({
  selector: 'app-move-list-empty',
  templateUrl: './move-list-empty.component.html',
  styleUrls: ['./move-list-empty.component.css']
})
export class MoveListEmptyComponent implements OnInit {

  constructor(private monthService: MonthService) { }

  ngOnInit(): void {
  }

  getCurrentMonth(): string {
    return this.monthService.getMonthsLong()[this.monthService.getCurrentMonth()];
  }

}
