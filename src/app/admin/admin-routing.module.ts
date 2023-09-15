import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';
import { RegisterdUserComponent } from './registerd-user/registerd-user.component';
import { HomePageComponent } from './home-page/home-page.component';

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
  },
  {
    path:'users',
    component:RegisterdUserComponent
  },
  {
    path: 'homepage',
    component: HomePageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
