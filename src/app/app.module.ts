import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HTTP_INTERCEPTORS, HttpClientModule}from  '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { token } from 'src/interseptor/token';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
    
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: token,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
