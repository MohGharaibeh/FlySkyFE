import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedadminModule } from '../sharedadmin/sharedadmin.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AirportsComponent,
    FlightsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedadminModule,
    CanvasJSAngularChartsModule
  ]
})
export class AdminModule { }
