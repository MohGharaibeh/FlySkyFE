import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicHomeService } from 'src/app/service/dynamic-home.service';
import { ManageHomeService } from 'src/app/service/manage-home.service';
import { StatisticService } from 'src/app/service/statistic.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(public home:DynamicHomeService, public testi:ManageHomeService, public stat: StatisticService){}
  ngOnInit(): void {
    
    this.stat.getNum();
		this.stat.getNumOfAirport();
		this.stat.getMaxReserved();
    this.home.getHomeById();
    this.testi.getAllTestimonial();
    this.home.getAboutById();
  }

  
}

   

