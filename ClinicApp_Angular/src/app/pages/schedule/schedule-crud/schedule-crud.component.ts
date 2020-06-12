import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SwalClass } from '../../../classes/swal.class';
import { Schedule, ScheduleHour, Day } from '../models/schedule.model';
import { ScheduleService } from '../services/schedule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-schedule-crud',
  templateUrl: './schedule-crud.component.html',
  styleUrls: ['./schedule-crud.component.css'],
  providers: [ScheduleService, BsModalService]
})
export class ScheduleCrudComponent implements OnInit {
  @Input() public schedule: Schedule;
  @Input() public crudMode: string;
  @Output() public saveCompleted: EventEmitter<any>;
  public isSaving: boolean;
  public frmSchedule: FormGroup;
  public modalRef: BsModalRef;
  public day: Day;



  constructor(private swal: SwalClass, private srvSchedule: ScheduleService, private modalService: BsModalService) {
    this.saveCompleted = new EventEmitter();
    this.isSaving = false;

    this.frmSchedule = new FormGroup({
      scheduleName: new FormControl('', Validators.required),
      scheduleDescrip: new FormControl('', Validators.required),
      days: new FormArray([])
    });
  }

  get days() {
    return this.frmSchedule.get('days') as FormArray;
  }

  ngOnInit() {
    console.log(this.schedule);
    this.createForm(this.crudMode, this.schedule);
  }

  private createForm(crudMode: string, schedule: Schedule): void {
    let DAYS: any[];
    if (crudMode === 'CREATE') {
      DAYS = [{ dayName: 'Monday', startTime: '', endTime: '' },
              { dayName: 'Tuesday', startTime: '', endTime: '' },
              { dayName: 'Wednesday', startTime: '', endTime: '' },
              { dayName: 'Thursday', startTime: '', endTime: '' },
              { dayName: 'Friday', startTime: '', endTime: '' },
              { dayName: 'Saturday', startTime: '', endTime: '' },
              { dayName: 'Sunday', startTime: '', endTime: '' }
      ];
    } else {
      DAYS = this.schedule.days;
    }

    DAYS.forEach(day => {
      this.days.push(
        new FormGroup({
          dayName: new FormControl(day.dayName),
          startTime: new FormControl(day.startTime),
          endTime: new FormControl(day.endTime),
          dayDescrip: new FormControl(day.dayDescrip),
          isWorkingday: new FormControl(day.isWorkingDay)
        })
      )
    })
  }

  public cleanScheduleForm(): void {
    this.frmSchedule.get('scheduleName').setValue('');
    this.frmSchedule.get('scheduleDescrip').setValue('');
    this.days.controls.forEach(day => {
      day.get('startTime').setValue(null);
      day.get('endTime').setValue(null);
      day.get('dayDescrip').setValue('DayOff');
      day.get('isWorkingday').setValue(false);

    })
  }

  public formtSubmit(): void {
    this.isSaving = true;

    if (this.days.controls.filter(e => e.get('isWorkingday').value === true).length == 0) {
      this.swal.showAlert('Attention', 'You must check at least one day as working day.', 'error');
      this.isSaving = false;
      return;
    }

    const data: Schedule = this.frmSchedule.value;

    this.srvSchedule.postSchedule(data).subscribe((result: any) => {
      if (result.IsCorrect) {
        this.saveCompleted.emit(result.Data as any);
        console.log(result.Data);
        this.swal.showAlert('Success', result.Message, 'success');
      } else {
        this.swal.showAlert('Attention', result.Message, 'error');
      }
      this.isSaving = false;
    }, ((err: HttpErrorResponse) => {
      this.swal.showAlert('Attention', err.error.Message, 'error');
      this.isSaving = false;
    }));
  }

  public openEditHour(idx: number, tempalte: TemplateRef<any>): void {
    this.day = this.schedule.days[idx];
    this.modalRef = this.modalService.show(tempalte, { class: 'modal-lg' });
    const suscription = this.modalService.onHide.subscribe(() => {
      this.day = null;
      suscription.unsubscribe();
    });
  }


}
