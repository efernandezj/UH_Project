import { Component, OnInit } from '@angular/core';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.css']
})
export class ScheduleBodyComponent implements OnInit {
  public isProcessing: boolean;
  public isEmptySchedules: boolean;
  public dtOptions: DataTables.Settings;

  constructor() { 
    this.isProcessing = false;
    this.isEmptySchedules = true;

    this.dtOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      responsive: true
    };
  }

  ngOnInit() {
  }

}
