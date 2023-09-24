import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    SlickCarouselModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    RouterModule,
    SlickCarouselModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule
  ]
})
export class ShareduserModule { }
