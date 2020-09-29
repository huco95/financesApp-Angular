import { Component, OnInit } from '@angular/core';
import { MonthService } from 'src/app/services/month/month.service';
import { MovesService } from 'src/app/services/moves/moves.service';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
})
export class MonthSelectorComponent implements OnInit {
  selector: boolean;
  monthsShort: string[];

  displayMonth: number;
  displayYear: number;

  currentMonth: number;
  currentYear: number;

  constructor(private monthService: MonthService, private moveService: MovesService) { }

  ngOnInit(): void {
    this.selector = false;
    this.monthsShort =  this.monthService.getMonthsShort();

    this.initializeCurrentDate();
    this.setDisplayDates();
  }

  get month(): string { return this.monthsShort[this.displayMonth]; }
  get year(): number { return this.displayYear; }

  private initializeCurrentDate() {
    this.currentMonth = this.monthService.getCurrentMonth();
    this.currentYear = this.monthService.getCurrentYear();
  }

  private setDisplayDates() {
    this.displayMonth = this.currentMonth;
    this.displayYear = this.currentYear;
  }

  toggleSelector() {
    this.selector = !this.selector;
    this.selector ? this.showSelector() : this.hideSelector();
  }
  showSelector() {
    this.initializeCurrentDate();
    this.selector = true;
  }
  hideSelector() { this.selector = false; }

  previousYear() { 
    this.currentMonth = null;
    this.currentYear--; 
  }
  nextYear() {
    this.currentMonth = null;
    this.currentYear++;
  }

  setCurrentMonth() {
    this.monthService.setCurrentDate();
    this.initializeCurrentDate();
    this.setDisplayDates();
    this.moveService.updateMoves(null);
    this.hideSelector();
  }

  updateDate(slectedMonth: number) {
    this.currentMonth = slectedMonth;
    this.setDisplayDates();

    this.monthService.updateDates(this.currentMonth, this.currentYear);
    this.moveService.updateMoves(null);

    this.hideSelector();
  }
}
