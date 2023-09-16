import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeuserRoutingModule } from './homeuser-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareduserModule } from '../shareduser/shareduser.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    HomeuserRoutingModule,
    ShareduserModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class HomeuserModule { }
