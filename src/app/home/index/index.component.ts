import { Component, OnInit } from '@angular/core';
import { DynamicHomeService } from 'src/app/service/dynamic-home.service';
import { ManageHomeService } from 'src/app/service/manage-home.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(public home:DynamicHomeService, public testi:ManageHomeService){}
  ngOnInit(): void {
    this.home.getHomeById();
    this.testi.getAllTestimonial();
  }

  sliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };
  
   
}
