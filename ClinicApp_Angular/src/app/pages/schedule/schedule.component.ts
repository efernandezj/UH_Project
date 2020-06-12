import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: []
})
export class ScheduleComponent implements OnInit {
  public loading: boolean;

  constructor() {
    this.loading = true;
   }

  ngOnInit() {
    this.loading = false;
  }

}
