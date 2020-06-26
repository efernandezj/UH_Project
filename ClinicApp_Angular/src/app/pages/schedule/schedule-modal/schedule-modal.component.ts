import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Day} from '../models/schedule.model';



@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styles: [
  ]
})
export class ScheduleModalComponent implements OnInit {
  @Input() public day: Day;
  @Input() public modalRef: BsModalRef;
  @Output() public dataCompleted: EventEmitter<Day>;

  public isSaving: boolean;
  public frmGroup: FormGroup;

  constructor() {
    this.dataCompleted = new EventEmitter();
    this.isSaving = false;
    this.frmGroup = new FormGroup({
      startTime: new FormGroup({
        hours: new FormControl('12', [Validators.required]),
        minute: new FormControl('00', [Validators.required]),
        period: new FormControl('AM', [Validators.required])
      }),
      endTime: new FormGroup({
        hours: new FormControl('12', [Validators.required]),
        minute: new FormControl('00', [Validators.required]),
        period: new FormControl('AM', [Validators.required])
      })
    });
  }

  ngOnInit() {
    if (this.day) {
      this.frmGroup.get('startTime').setValue(this._getHours(this.day.startTime));
      this.frmGroup.get('endTime').setValue(this._getHours(this.day.endTime));
    }
  }

  public formSubmit(): void {
    const startTime = this.frmGroup.get('startTime').value;
    const endTime = this.frmGroup.get('endTime').value;

    this.day.startTime = `${startTime.hours}:${startTime.minute} ${startTime.period}`;
    this.day.endTime = `${endTime.hours}:${endTime.minute} ${endTime.period}`;

    this.dayCompleted();
    this.modalRef.hide();
  }

  public counter(n: number): Array<number> {
    return new Array(n);
  }

  public deleteHours(): void {
    this.day.startTime = null;
    this.day.endTime = null;

    this.dayCompleted();
    this.modalRef.hide();
  }

  public dayCompleted() {
    this.dataCompleted.emit(this.day);
  }

  private _getHours(data: string): any {
    if (!data || (data && data === '')) {
      return { hours: '12', minute: '00', period: 'AM' };
    }
    
    const baseArray = data.split(':');
    return {
      hours: baseArray[0].trim(),
      minute: baseArray[1].trim().split(' ')[0].trim(),
      period: baseArray[1].trim().split(' ')[1].trim()
    };
  }
}
