import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AssestmentComponent } from './pages/assestment/assestment.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'selection', component: SelectionComponent},
  { path: 'assestment', component: AssestmentComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
