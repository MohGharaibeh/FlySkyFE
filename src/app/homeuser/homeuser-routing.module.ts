import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestimonialComponent } from '../admin/testimonial/testimonial.component';
import { TestinomialComponent } from './testinomial/testinomial.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchflightComponent } from './searchflight/searchflight.component';
import { PaymentComponent } from './payment/payment.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ChatComponent } from './chat/chat.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  {
    path: 'index',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'testimonial',
    component: TestinomialComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'search',
    component: SearchflightComponent
  },
  {
    path:'pay',
    component: PaymentComponent
  },
  {
    path: 'track',
    component:TrackingComponent
  },
  {
    path:'chat',
    component: ChatComponent
  },
  {
    path:'chatbot',
    component:ChatbotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeuserRoutingModule { }
