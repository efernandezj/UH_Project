import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule/services/schedule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalClass } from 'src/app/classes/swal.class';
import { Schedule } from './models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: []
})
export class ScheduleComponent implements OnInit {
  public loading: boolean;
  public schedules: Schedule[];

  constructor(private srvSchedule: ScheduleService, private swal: SwalClass,) {
    this.loading = true;
   }

   ngOnInit() {
    this.srvSchedule.getSchedule().subscribe((result: any) => {
      if (result.IsCorrect) {
        this.schedules = result.Schedules;
      } else {
        this.swal.showAlert('Attention', result.Message, 'warning');
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.swal.showAlert('Error', err.error.Message, 'error');
      this.loading = false;
    });
  }

}
