import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    SlickCarouselModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    RouterModule,
    SlickCarouselModule
  ]
})
export class ShareduserModule { }
