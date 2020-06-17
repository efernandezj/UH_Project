import { Component, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../models/schedule.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.css'],
  providers: [ScheduleService]
})
export class ScheduleBodyComponent implements AfterViewInit, OnDestroy {
  @Input()   public schedules: Schedule[];
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtTable: DataTables.Api;
  public dtOptions: DataTables.Settings;
  // public schedules: Schedule[];
  public schedule: Schedule;
  public crudMode: string;

  constructor(private srvSchedule: ScheduleService) {
    this.schedules = [];
    this.schedule = null;
    this.crudMode = ''

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

  public reloadSchedules(schedules: Schedule[]) {
    this.schedules = schedules;
  }





  private _setLinkEvents(): void {
    const arrLinks = $('#tblResult tbody').find('button');
    $.each(arrLinks, (key: number, btn: HTMLButtonElement) => {
      if ($(btn).attr('data-target')) {
        const key = Number($(btn).attr('data-target'));

        if (!isNaN(key)) {
          // if ($(btn).attr('data-type') === 'u') {
            // UPDATE CLICK EVENT
            $(btn).off('click');
            $(btn).on('click', () => {
              $('#CRUD').slideUp('slow', () => {
                this.schedule = this.schedules.find(e => e.key === key);
                this.crudMode = 'UPDATE';
                $('#CRUD').slideDown('slow')
              });
            })
          // }
        }
      }
    });
  }

}
