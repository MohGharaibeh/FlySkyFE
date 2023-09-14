import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';

const routes: Routes = [
  {
    path: 'index',
    component: DashboardComponent
  },
  {
    path: 'airport',
    component: AirportsComponent
  },
  {
    path: 'flight',
    component: FlightsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
