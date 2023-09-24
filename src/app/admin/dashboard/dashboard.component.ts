import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatisticService } from 'src/app/service/statistic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	// numOfUser: number = 0;
	// numOfAirport: number = 0;

	constructor(public stat: StatisticService, private toast:ToastrService){}
	ngOnInit(): void {
		//this.toast.success('Sucssed')
		this.stat.getNum();
		this.stat.getNumOfAirport();
		this.stat.getMaxReserved();
		this.chartOptions
	  }
  chartOptions = {
	  title: {
		  text: "GoTrip"
	  },
	  animationEnabled: true,
	  axisY: {
		includeZero: false
	  },
	  data: [{
		type: "bar", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		dataPoints: [
			{ x: 'User', y: this.stat.num },
			{ x: 20, y: 55 },
			{ x: 30, y: 50 },
			{ x: 40, y: 65 },
			{ x: 50, y: 71 },
			{ x: 60, y: 92, indexLabel: "Highest\u2191" }
		]
	  }]
	}
}
