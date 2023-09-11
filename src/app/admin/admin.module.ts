import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedadminModule } from '../sharedadmin/sharedadmin.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedadminModule,
    CanvasJSAngularChartsModule
  ]
})
export class AdminModule { }
