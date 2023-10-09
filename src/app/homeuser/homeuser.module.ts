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
import { TrackingComponent } from './tracking/tracking.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatbotService } from '../service/chatbot.service';
import { SearchdateComponent } from './searchdate/searchdate.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    TestinomialComponent,
    ProfileComponent,
    ContactusComponent,
    SearchflightComponent,
    PaymentComponent,
    TrackingComponent,
    ChatComponent,
    ChatbotComponent,
    SearchdateComponent
  ],
  imports: [
    CommonModule,
    HomeuserRoutingModule,
    ShareduserModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    HttpClientModule
    
  ],
  providers:[ChatbotService]
})
export class HomeuserModule { }
