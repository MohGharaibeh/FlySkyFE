import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';
import { RegisterdUserComponent } from './registerd-user/registerd-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';

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
  },
  {
    path: 'aboutpage',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'testimonial',
    component: TestimonialComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path:'chat',
    component: ChatComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
