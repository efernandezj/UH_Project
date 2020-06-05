import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.css'],
  providers: [ScheduleService]
})
export class ScheduleBodyComponent implements OnInit {
  public isLoading: boolean;
  public schedules: Schedule[];
  public dtOptions: DataTables.Settings;

  constructor(private srvSchedule: ScheduleService) {
    this.isLoading = false;
    this.schedules = [];

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
        { id: 2, data: 'startTime' },
        { id: 3, data: 'endTime' }/*,
        {
          id: 4, data: null, sortable: false, className: 'text-center', render: (data: any, type: any, row: Schedule) => {
            return `<button type="button" (click)="startPhase(${row.key})" <i class="fas fa-play"></i> </button>`;
          }
        }*/
      ]
    };
  }



  ngOnInit() {
    this.srvSchedule.getSchedule().subscribe((result: any) => {
      if (result.IsCorrect) {
        this.schedules = result.Schedules;
        console.log(result.Schedules);
      }
    });
  }

  public reloadSchedules(schedules: Schedule[]) {
    this.schedules = schedules;
  }

}
