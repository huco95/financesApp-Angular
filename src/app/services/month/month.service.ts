import { Injectable } from '@angular/core';

import * as dayjs from 'dayjs';
import * as localeData from 'dayjs/plugin/localeData';

const INIT_DATE_KEY = 'date-init';
const END_DATE_KEY = 'date-end';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  private localeData;

  constructor() {
    dayjs.extend(localeData);
    this.localeData = dayjs().localeData();
  }

  public initalizeDates() {
    if (this.getInitalDate() == null && this.getEndDate() == null) {
      this.setCurrentDate();
    }
  }

  public setCurrentDate() {
    this.setInitalDate(dayjs(new Date()).startOf('month').toDate());
    this.setEndDate(dayjs(new Date()).endOf('month').toDate());
  }

  public updateDates(month: number, year: number) {
    let date: dayjs.Dayjs = dayjs(new Date()).month(month).year(year);
    this.setInitalDate(date.startOf('month').toDate());
    this.setEndDate(date.endOf('month').toDate());
  }

  public setInitalDate(initialDate: Date) {
    sessionStorage.removeItem(INIT_DATE_KEY);
    sessionStorage.setItem(INIT_DATE_KEY, dayjs(initialDate).valueOf().toString());
  }

  public getInitalDate(): string {
    return sessionStorage.getItem(INIT_DATE_KEY);
  }

  public setEndDate(endDate: Date) {
    sessionStorage.removeItem(END_DATE_KEY);
    sessionStorage.setItem(END_DATE_KEY, dayjs(endDate).valueOf().toString());
  }

  public getEndDate(): string {
    return sessionStorage.getItem(END_DATE_KEY);
  }

  public getYearInitalDate(): string {
    return dayjs(Number(this.getInitalDate())).startOf('year').valueOf().toString();
  }

  public getYearEndDate(): string {
    return dayjs(Number(this.getEndDate())).endOf('year').valueOf().toString();
  }

  public getCurrentMonth(): number {
    return dayjs(Number(this.getInitalDate())).month();
  }

  public getCurrentYear(): number {
    return dayjs(Number(this.getInitalDate())).year();
  }

  public getMonthsShort(): string[] {
    return this.localeData.monthsShort();
  }

  public getMonthsLong(): string[] {
    return this.localeData.months();
  }
}
