import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeuserRoutingModule } from './homeuser-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareduserModule } from '../shareduser/shareduser.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { TestinomialComponent } from './testinomial/testinomial.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchflightComponent } from './searchflight/searchflight.component';
import { PaymentComponent } from './payment/payment.component';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    TestinomialComponent,
    ProfileComponent,
    ContactusComponent,
    SearchflightComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    HomeuserRoutingModule,
    ShareduserModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule
    
  ]
})
export class HomeuserModule { }
