import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  onlyDate(date: Date) {
    return moment(date).format('DD-MM-YYYY');
  }

  isToday(date: Date) {
    return moment(date).isSame(moment(), 'day');
  }
}
