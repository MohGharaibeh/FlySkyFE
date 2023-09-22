import { Component, OnInit } from '@angular/core';
import { SearchDateUserService } from 'src/app/service/search-date-user.service';

@Component({
  selector: 'app-searchflight',
  templateUrl: './searchflight.component.html',
  styleUrls: ['./searchflight.component.css']
})
export class SearchflightComponent implements OnInit{
  constructor(public search: SearchDateUserService){}
  ngOnInit(): void {
    
  }

}
