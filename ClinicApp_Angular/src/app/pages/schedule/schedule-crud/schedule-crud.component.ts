import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';


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
      scheduleName: new FormControl('',Validators.required),
      scheduleDescrip: new FormControl('',Validators.required),
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
          startTime: new FormControl(),
          endTime: new FormControl(),
          dayDescrip: new FormControl('DayOff'),
          isWorkingday: new FormControl(false)
        })
      )
    })
  }

  public changeDescription(idx: number): void {
    if(this.days.at(idx).get('isWorkingday').value) {
      this.days.at(idx).get('dayDescrip').setValue('This is a Business day.');
      // this.days.at(idx).get('startTime').setValidators(Validators.required);
    } else {
      this.days.at(idx).get('dayDescrip').setValue('DayOff');
    }
  }

  public cleanScheduleForm(): void {
    this.frmSchedule.get('scheduleName').setValue('');
    this.frmSchedule.get('scheduleDescrip').setValue('');
    this.days.controls.forEach( day => {
      day.get('startTime').setValue(null);
      day.get('endTime').setValue(null);
      day.get('dayDescrip').setValue('DayOff');
      day.get('isWorkingday').setValue(false);

    })
  }

  public formtSubmit(): void {
    console.log(this.frmSchedule.value);
  }


}
