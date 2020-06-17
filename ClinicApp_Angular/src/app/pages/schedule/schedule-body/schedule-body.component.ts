import { Component, AfterViewInit, OnDestroy, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { Schedule, Day } from '../models/schedule.model';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SwalClass } from '../../../classes/swal.class';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.css'],
  providers: [ScheduleService]
})
export class ScheduleBodyComponent implements AfterViewInit, OnDestroy {
  @Input() public schedules: Schedule[];
  @Output() public saveCompleted: EventEmitter<any>;
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtTable: DataTables.Api;
  public dtOptions: DataTables.Settings;
  public schedule: Schedule;
  public isSaving: boolean;
  public frmSchedule: FormGroup;
  public modalRef: BsModalRef;
  public day: Day;

  constructor(private swal: SwalClass, private srvSchedule: ScheduleService, private modalService: BsModalService) {
    this.schedules = [];
    this.schedule = null;
    this.saveCompleted = new EventEmitter();
    this.isSaving = false;

    this.frmSchedule = new FormGroup({
      scheduleName: new FormControl('', Validators.required),
      scheduleDescrip: new FormControl('', Validators.required),
      isActive: new FormControl(true),
      days: new FormArray([])
    });

    this.dtOptions = {
      pageLength: 10,
      // paging: false,
      // searching: false,
      // info: false,
      ordering: false,
      responsive: true,
      columnDefs: [{ responsivePriority: 1, targets: 3 }] as any[],
      ajax: (dataTablesParameters: any, callback) => {
        callback({
          recordsTotal: this.schedules.length,
          recordsFiltered: this.schedules.length,
          data: this.schedules
        });
      },
      columns: <any>[
        { id: 0, data: 'scheduleName' },
        { id: 1, data: 'scheduleDescrip' },
        {
          id: 2, data: null, render: (data: any, type: any, row: Schedule) => {
            return row.isActive ? 'Active' : 'Disabled';
          }
        },
        {
          id: 3, data: null, sortable: false, className: 'text-center', render: (data: any, type: any, row: Schedule) => {
            return `<button type="button" data-target="${row.key}" class="btn btn-link p-0 ml-2 mr-2"><i class="fas fa-pencil-alt"></i></button>`;
          }
        }
      ]
    };
  }

  get days() {
    return this.frmSchedule.get('days') as FormArray;
  }

  ngAfterViewInit() {
    if (this.dtElement) {
      this.dtElement.dtInstance.then(tbl => {
        this.dtTable = tbl;
        this.dtTable.on('draw', () => this._setLinkEvents());
        this.dtTable.ajax.reload();
      });
    }
  }

  ngOnDestroy() {
    if (this.dtTable) {
      this.dtTable.destroy(true);
    }
  }

  private _setLinkEvents(): void {
    const arrLinks = $('#tblResult tbody').find('button');
    $.each(arrLinks, (key: number, btn: HTMLButtonElement) => {
      if ($(btn).attr('data-target')) {
        const key = Number($(btn).attr('data-target'));

        if (!isNaN(key)) {
          // UPDATE CLICK EVENT
          $(btn).off('click');
          $(btn).on('click', () => {
            $('#divBody').slideUp('slow', () => {
              this.schedule = this.schedules.find(e => e.key === key);
              this.createForm('UPDATE');
              setTimeout(() => {
                $('#divBody').slideDown('slow');
              }, 200);
            });
          })
        }
      }
    });
  }



  private createForm(crudMode: string): void {
    setTimeout(() => {


      this.cleanScheduleForm();
      let DAYS: any[];
      if (crudMode === 'CREATE') {
        DAYS = [{ dayName: 'Sunday', startTime: '', endTime: '' },
        { dayName: 'Monday', startTime: '', endTime: '' },
        { dayName: 'Tuesday', startTime: '', endTime: '' },
        { dayName: 'Wednesday', startTime: '', endTime: '' },
        { dayName: 'Thursday', startTime: '', endTime: '' },
        { dayName: 'Friday', startTime: '', endTime: '' },
        { dayName: 'Saturday', startTime: '', endTime: '' }
        ];
      } else {
        DAYS = this.schedule.days;
        this.frmSchedule.get('scheduleName').setValue(this.schedule.scheduleName);
        this.frmSchedule.get('scheduleDescrip').setValue(this.schedule.scheduleDescrip);
        this.frmSchedule.get('isActive').setValue(this.schedule.isActive);
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
    }, 200);
  }

  public closeForm(): void {
    setTimeout(() => {
      $('#divBody').slideUp('slow', () => {
        this.cleanScheduleForm();
      });
    }, 200);
  }

  public cleanScheduleForm(): void {
    this.frmSchedule.get('scheduleName').setValue('');
    this.frmSchedule.get('scheduleDescrip').setValue('');
    (this.frmSchedule.get('days') as FormArray).clear();
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
