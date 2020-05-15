import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-schedule-crud',
  templateUrl: './schedule-crud.component.html',
  styles: []
})
export class ScheduleCrudComponent implements OnInit {
  public isSaving: boolean;
  private _days: any;
  public frmSchedule: FormGroup;
  

  constructor() {
    const DAYS = [{ name: 'Monday' },
                  { name: 'Tuesday' },
                  { name: 'Wednesday' },
                  { name: 'Thursday' },
                  { name: 'Friday' },
                  { name: 'Saturday' },
                  { name: 'Sunday' }];
    this.isSaving = false;
    this._days = DAYS;

    this.frmSchedule = new FormGroup({
      scheduleName: new FormControl(''),
      days: new FormArray([])
    });

    
  }

  ngOnInit() {
    this._days.forEach(e => {
      const dayGrp = new FormGroup({
        dayName: new FormControl(e.name),
        startTime: new FormControl(),
        endTime: new FormControl(),
        dayDescrip: new FormControl('DayOff'),
        isWorkingday: new FormControl(true)
      });
      
      (this.frmSchedule.get('days') as FormArray).push(dayGrp);
    });

    console.log(this.getControls());
  }

  public getControls(): AbstractControl[] {
    return (this.frmSchedule.get('days') as FormArray).controls;
  }

}
