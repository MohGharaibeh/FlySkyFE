import { Component, OnInit } from '@angular/core';
import { DynamicHomeService } from 'src/app/service/dynamic-home.service';
import { ManageHomeService } from 'src/app/service/manage-home.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  constructor(public home:DynamicHomeService, public testi:ManageHomeService){}
  ngOnInit(): void {
    
    this.home.getHomeById();
    this.testi.getAllTestimonial();
    this.home.getAboutById();
  }
}
