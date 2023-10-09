import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
Chart.register(...registerables)
import { ToastrService } from 'ngx-toastr';
import { ManageHomeService } from 'src/app/service/manage-home.service';
import { StatisticService } from 'src/app/service/statistic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
data:any[]=[]
label:any[]=['User', 'Airport', 'Max Reserved', 'Profit']
	constructor(public stat: StatisticService, private toast:ToastrService, public report:ManageHomeService){}
	ngOnInit() {
		try {
			// Fetch data asynchronously
			this.stat.getNum();
			this.stat.getNumOfAirport();
			this.stat.getMaxReserved();
			this.report.profit();
		
			// Create the data array with fetched values
			this.data = [
			  this.stat.num,
			  this.stat.NumOfAirport,
			  this.stat.maxReserved.totaL_TICKETS,
			  this.report.myProfit
			];
		
			// Render the chart
			setTimeout(() => {
				this.renderChart(this.label, this.data);
			}, 1000);
			
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		
	  }
	  renderChart(labeldata:any, maindata:any){
		const myChart = new Chart("chart", {
		  type: 'bar',
		  data: {
			labels: labeldata,
			datasets: [{
			  //label: 'Statistic',
			  data: maindata,
			  backgroundColor: [
				'rgba(0, 128, 0, 1)',    // Green
  'rgba(255, 165, 0, 1)',  // Orange
  'rgba(0, 0, 255, 1)',    // Blue
  'rgba(255, 255, 0, 1)'   // Yellow
			  ],
			  borderColor: [
				'rgba(255, 99, 132, 1)'
			  ],
			  borderWidth: 1
			}]
		  },
		  options: {
			scales: {
			  y: {
				beginAtZero: true
			  }
			}
		  }
		});
	  }
}
