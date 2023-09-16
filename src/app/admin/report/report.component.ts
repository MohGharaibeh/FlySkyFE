import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ManageHomeService } from 'src/app/service/manage-home.service';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Chart, registerables} from 'node_modules/chart.js'
import { UserOptions } from 'jspdf-autotable';
Chart.register(...registerables)
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  chartOptions: any;
@ViewChild('reportData') reportData !: TemplateRef<any>
  departulDate : string ='';
  arrivelDate: string ='';
  constructor(public reports:ManageHomeService){}
  ngOnInit(): void {
  this.reports.viewReport();
  
    this.renderChart(this.reports.labeldata, this.reports.realdata);
  
}

searchOn(){
  const report = {Departuredate: this.departulDate, Arrivaldate: this.arrivelDate};
  this.reports.dateShow;
  this.reports.searchDate(report);
}

onSearch(){
  
  const report = {Departuredate: this.departulDate, Arrivaldate: this.arrivelDate};
  this.reports.searchDate(report);

}
renderChart(labeldata:any, maindata:any){
  const myChart = new Chart("chart", {
    type: 'bar',
    data: {
      labels: labeldata,
      datasets: [{
        label: '# of Votes',
        data: maindata,
        backgroundColor: [
          'rgba(255, 99, 132, 1)'
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
  
  makePDF(){
    let pdf = new jsPDF('landscape')
    autoTable(pdf, {html:"#down"})
    pdf.save('report.pdf')
  }
  obj:any;
  search2Date(body:any){
    this.obj = body;
    this.reports.searchDate(body)
  }


  
}
