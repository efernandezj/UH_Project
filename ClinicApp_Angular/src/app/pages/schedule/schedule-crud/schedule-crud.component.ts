import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Schedule} from '../models/schedule.model';


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
      this.days.at(idx).get('startTime').setValue(new Date("January 31 1980 06:30"))
      this.days.at(idx).get('endTime').setValue(new Date("January 31 1980 15:30"))
    } else {
      this.days.at(idx).get('dayDescrip').setValue('DayOff');
      this.days.at(idx).get('startTime').setValue(null)
      this.days.at(idx).get('endTime').setValue(null)
      
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
    // console.log(this.frmSchedule.value);
    this.isSaving = true;
    
    if(this.days.controls.filter( e => e.get('isWorkingday').value === true).length) {
      // this.swal.showAlert('Attention', 'You must check at least one day as working day.', 'error');
      return;
    }
    
    const data: Schedule = this.frmSchedule.value;
  }


}
