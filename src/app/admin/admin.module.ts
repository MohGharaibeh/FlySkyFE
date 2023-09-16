import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedadminModule } from '../sharedadmin/sharedadmin.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';
import { RegisterdUserComponent } from './registerd-user/registerd-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ReportComponent } from './report/report.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AirportsComponent,
    FlightsComponent,
    RegisterdUserComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactComponent,
    TestimonialComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedadminModule,
    CanvasJSAngularChartsModule
  ]
})
export class AdminModule { }
