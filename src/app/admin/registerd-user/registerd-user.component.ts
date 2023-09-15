import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/service/statistic.service';

@Component({
  selector: 'app-registerd-user',
  templateUrl: './registerd-user.component.html',
  styleUrls: ['./registerd-user.component.css']
})
export class RegisterdUserComponent implements OnInit {
  constructor(public stats : StatisticService){}
  ngOnInit(): void {
this.stats.showRegisterdUser();
  }

}
