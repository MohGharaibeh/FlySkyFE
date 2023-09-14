import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AirportService } from 'src/app/service/airport.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {
constructor(public airport : AirportService, public dialog: MatDialog){}
  ngOnInit(): void {
    this.airport.getAirport();
  }
@ViewChild('deleteDialog') dialoge !: TemplateRef<any>
  confirmDelete(id:number){
    const d = this.dialog.open(this.dialoge);
    d.afterClosed().subscribe((result)=>{
      if (result != undefined){
        if (result == 'yes'){
          this.airport.deleteAirport(id);
        }
        else if(result == 'no'){
          console.log('No');
          
        }
      }
    })
  }
  updateForm : FormGroup = new FormGroup({
    airportid : new FormControl(''),
    name : new FormControl(''),
    location : new FormControl('')
  })
@ViewChild('updateDialog') updateDialog !: TemplateRef<any>
data:any={};
  openUpdate(obj:any){
     this.dialog.open(this.updateDialog);
     this.data = obj;
      this.updateForm.controls['airportid'].setValue(this.data['airportid'])
  }

  updateAirport(){
    this.airport.updateAirport(this.data)
    
  }
@ViewChild('createDialog') createDialogs !: TemplateRef<any>
  createForm : FormGroup = new FormGroup({
    name : new FormControl(''),
    location : new FormControl('')
  })
  openCreateDialog(){
    this.dialog.open(this.createDialogs);
  }

  createAirport(){

    this.airport.createAirport(this.createForm.value);
  }
}
