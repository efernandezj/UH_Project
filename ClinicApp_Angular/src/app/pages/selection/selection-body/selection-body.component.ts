import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { IEmployees } from '../../interfaces/selection.interface';

@Component({
  selector: 'app-selection-body',
  templateUrl: './selection-body.component.html'
})
export class SelectionBodyComponent implements OnInit {
  @ViewChild(DataTableDirective)
  public isFecthing: boolean;
  public dtOptions: DataTables.Settings;
  public employees: IEmployees[];

  constructor() {
    this.isFecthing = false;
    this.employees = [];
    this.dtOptions = {
      pageLength: 10,
      responsive: true,
      columnDefs: [{ responsivePriority: 1, targets: 2 }] as any[],
      ajax: (dataTablesParameters: any, callback) => {
        callback({
          recordsTotal: this.employees.length,
          recordsFiltered: this.employees.length,
          data: this.employees
        });
      },
      columns: [
        { id: 0, data: 'Employee ID' },
        { id: 1, data: 'Employee Name' },
        {
          id: 2, data: null, sortable: false, className: 'text-center', render: (data: any, type: any, row: IEmployees) => {
            return `<a href='javascript:void(0)' data-target='${row.key}'><i class='fas fa-folder-open'></i></a>`;
          }
        }
      ] as any
    };
  }

  ngOnInit() {
  }

}
