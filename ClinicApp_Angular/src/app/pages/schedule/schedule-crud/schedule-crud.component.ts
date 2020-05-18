import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-schedule-crud',
  templateUrl: './schedule-crud.component.html',
  styles: []
})
export class ScheduleCrudComponent implements OnInit {
  public isSaving: boolean;
  public frmSchedule: FormGroup;


  constructor() {
    this.isSaving = false;

    this.frmSchedule = new FormGroup({
      scheduleName: new FormControl(''),
      scheduleDescrip: new FormControl(''),
      days: new FormArray([])
    });

    this.createForm();
  }

  get days() {
    return this.frmSchedule.get('days') as FormArray;
  }

  ngOnInit() {

  }

  private createForm(): void {
    ['Monday', 'Tuesday', 'Wednesday ', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
      this.days.push(
        new FormGroup({
          dayName: new FormControl(day),
          startTime: new FormControl(new Date()),
          endTime: new FormControl(new Date()),
          dayDescrip: new FormControl('DayOff'),
          isWorkingday: new FormControl(true)
        })
      )
    })
  }


}
