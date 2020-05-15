import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';


// Components
import { HomeComponent }            from './pages/home/home.component';
import { AssestmentComponent }      from './pages/assestment/assestment.component';
import { LoginComponent }           from './pages/login/login.component';
import { SelectionComponent }       from './pages/selection/selection.component';
import { SelectionBodyComponent }   from './pages/selection/selection-body/selection-body.component';
import { ScheduleComponent }        from './pages/schedule/schedule.component';
import { ScheduleBodyComponent } from './pages/schedule/schedule-body/schedule-body.component';
import { ScheduleCrudComponent } from './pages/schedule/schedule-crud/schedule-crud.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssestmentComponent,
    SelectionComponent,
    LoginComponent,
    SelectionBodyComponent,
    ScheduleComponent,
    ScheduleBodyComponent,
    ScheduleCrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    DataTablesModule,
    TimepickerModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
