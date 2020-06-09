import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.css'],
  providers: [ScheduleService]
})
export class ScheduleBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtTable: DataTables.Api;
  public dtOptions: DataTables.Settings;
  public isLoading: boolean;
  public schedules: Schedule[];
  

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
      // columnDefs: [{ responsivePriority: 1, targets: 3 }] as any[],
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
            return `<button type="button" data-target="${row.key}" class="btn btn-link p-0"><i class="fas fa-pencil-alt"></i></button>`;
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

  ngAfterViewInit() {
    if (this.dtElement) {
      this.dtElement.dtInstance.then(tbl => {
        this.dtTable = tbl;
        this.dtTable.on('draw', () => this._setLinkEvents());
        this.dtTable.ajax.reload();
        console.log('In Condition');
      });
    }
    console.log('afterView');
  }

  ngOnDestroy() {
    if (this.dtTable) {
      this.dtTable.destroy(true);
    }
  }

  public reloadSchedules(schedules: Schedule[]) {
    this.schedules = schedules;
  }





  private _setLinkEvents(): void {
    console.log('test');
    const arrLinks = $('#tblResult tbody').find('button');
    $.each(arrLinks, (key: number, btn: HTMLButtonElement) => {
      if ($(btn).attr('data-target')) {
        const key = Number($(btn).attr('data-target'));
        console.log('btn');

      }
    });
  }

}
