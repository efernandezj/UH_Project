import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-schedule-crud',
  templateUrl: './schedule-crud.component.html',
  styles: []
})
export class ScheduleCrudComponent implements OnInit {
  public isSaving: boolean;
  public days: any;

  constructor() {
    const DAYS = [{ name: 'Monday' },
                  { name: 'Tuesday' },
                  { name: 'Wednesday' },
                  { name: 'Thursday' },
                  { name: 'Friday' },
                  { name: 'Saturday' },
                  { name: 'Sunday' }];
    this.isSaving = false;
    this.days = DAYS;
  }

  ngOnInit() {
  }

}
