import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// CUSTOME
import { CustomPipesModule } from 'src/app/pipes/custom-pipes.module';

// NGX-BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';

// Angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Classes
import { SwalClass } from './classes/swal.class';


// Components
import { HomeComponent } from './pages/home/home.component';
import { AssestmentComponent } from './pages/assestment/assestment.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { SelectionBodyComponent } from './pages/selection/selection-body/selection-body.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ScheduleBodyComponent } from './pages/schedule/schedule-body/schedule-body.component';
// import { ScheduleCrudComponent } from './pages/schedule/schedule-crud/schedule-crud.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ScheduleModalComponent } from './pages/schedule/schedule-modal/schedule-modal.component';



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
    // ScheduleCrudComponent,
    LoadingComponent,
    ScheduleModalComponent
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
    MatSlideToggleModule,
    DataTablesModule,
    TimepickerModule.forRoot(),
    AlertModule.forRoot(),
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CustomPipesModule
  ],
  providers: [SwalClass],
  bootstrap: [AppComponent]
})
export class AppModule { }
