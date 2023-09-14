import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FlightService } from 'src/app/service/flight.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  constructor(public fly: FlightService, public dialog:MatDialog, private router: Router){}
  ngOnInit(): void {
    this.fly.getAllFlight();
  }

  @ViewChild('deleteDialog') deleteDialog !: TemplateRef<any>
  openDeleteDialog(id : number){
    const d =this.dialog.open(this.deleteDialog);
    d.afterClosed().subscribe((res)=>{
      if (res != undefined){
        if (res == 'yes'){
          this.fly.deleteFlight(id);
        }
        else if (res == 'no'){
          console.log('No');
          
        }
      }
    })
  }
  updateForms : FormGroup = new FormGroup({
    flightid : new FormControl(''),
    capacity : new FormControl(''),
    status : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl(''),
    fromcountry : new FormControl(''),
    tocountry : new FormControl(''),
    travelclass : new FormControl(''),
    departuredate : new FormControl(''),
    arrivaldate : new FormControl('')
  });
  @ViewChild('updateDialog') updateDialoge !: TemplateRef<any>
  data:any={}
  openUpdateDialog(obj: any){
    // this.data = {
    //   flightid : obj.flightid,
    //   capacity:obj.capacity,
    //   status: obj.status,
    //   price: obj.price,
    //   description: obj.description,
    //   fromcountry: obj.fromcountry,
    //   tocountry: obj.tocountry,
    //   travelclass:obj.travelclass,
    //   departuredate: obj.departuredate,
    //   arrivaldate: obj.arrivaldate
    // }
    this.data = obj;
    this.dialog.open(this.updateDialoge);
    this.updateForms.controls['flightid'].setValue(this.data.flightid);

  }
  updateFlight(){
    this.fly.updateFlight(this.data);
  }
@ViewChild('createDialog')createDialoge !: TemplateRef<any>

createForms : FormGroup = new FormGroup({
  capacity : new FormControl(''),
  status : new FormControl(''),
  price : new FormControl(''),
  description : new FormControl(''),
  fromcountry : new FormControl(''),
  tocountry : new FormControl(''),
  travelclass : new FormControl(''),
  departuredate : new FormControl(''),
  arrivaldate : new FormControl(''),
  image : new FormControl('')
});
  openCreateDialog(){
    this.dialog.open(this.createDialoge)
  }

  createFlight(){
    debugger;
    this.fly.createFlight(this.createForms.value)
  }

  uploadImage(file:any){
    if (file.length == 0){
      return ;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.fly.uploadImage(formData);
  }

}
