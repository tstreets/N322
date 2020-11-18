import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.page.html',
  styleUrls: ['./week-schedule.page.scss'],
})
export class WeekSchedulePage implements OnInit {
  public weekSchedule: any = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    hours: [],
  }

  constructor() {
    for(let h = 0; h < 24; h++) {
      // change m < #; 1 yeilds hour mark; 2 yields half-hour mark;
      for(let m = 0; m < 1; m++) {
        this.weekSchedule.hours.push(`${h}:${(!!m) ? 3 : 0 }0`);
      }
    }
  }

  ngOnInit() {
  }

}
