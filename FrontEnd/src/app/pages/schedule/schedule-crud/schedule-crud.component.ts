import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-crud',
  templateUrl: './schedule-crud.component.html',
  styles: []
})
export class ScheduleCrudComponent implements OnInit {
  public isSaving: boolean;

  constructor() { 
    this.isSaving = false;
  }

  ngOnInit() {
  }

}
