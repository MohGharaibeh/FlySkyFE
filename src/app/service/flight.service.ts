import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http:HttpClient, private toast:ToastrService) { }

  formCountry:any[]=[];
  flight:any = [{}];
  flightForUser: any = [{}];
  getAllFlight(){
    debugger;
    this.http.get('https://localhost:7152/api/Flight').subscribe((res:any)=>{
      this.flight = res;
      this.flightForUser = res.filter((x:any)=>x.status ==='wait');
      console.log(res);
      
      this.formCountry=res.fromcountry;
    }, err =>{
      console.log(err);
    })
  }

  // getAllFlightUser(){
  //   debugger;
  //   this.http.get('https://localhost:7152/api/Flight/flightforuser').subscribe((res:any)=>{
  //     this.flightForUser = res;
  //     // this.flightForUser = res.filter((ress:any)=>
  //     //   ress.status === 'wait'
  //     // )
  //     console.log(res);
  //     //this.formCountry=res.fromcountry;
  //   }, err =>{
  //     console.log(err);
  //   })
  // }

  deleteFlight(id : number){
    this.http.delete('https://localhost:7152/api/Flight/'+id).subscribe((res)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Added Sucssesfuly')
    }, err=>{
      console.log(err);
      this.toast.error('Somthing Error')
    })
  }

  updateFlight(obj:any){
    obj.image=this.showImage;
    this.http.put('https://localhost:7152/api/Flight/',obj).subscribe((res)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Update Sucssesfuly')
    }, err=>{
      console.log(err);
      this.toast.error('Somthing Error')
    })
  }

  createFlight(obj:any){
    obj.image=this.showImage;
    debugger;
    this.http.post('https://localhost:7152/api/Flight/', obj).subscribe((res)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Added Sucssesfuly')
    }, err=>{
      console.log(err);
      this.toast.error('Somthing Error')
    })
  }

  showImage:any;
  uploadImage(img : FormData){
    this.http.post('https://localhost:7152/api/Flight/uploadImage', img).subscribe((res:any)=>{
      console.log(res);
      this.showImage = res.image;
    }, err=>{
      console.log(err);
      
    })
  }
  report : any = [{}];

  searchDate(obj:any){
    debugger;
    const requestDate = {Departuredate: obj.departuredate , Arrivaldate: obj.arrivaldate}
    this.http.post('https://localhost:7152/api/AdminReport/searchFlight', requestDate).subscribe((res:any)=>{
      
      this.flight = res;
      console.log(this.report);
    }, err=>{
      console.log(err);
      
    })
  }
//👀
getFlightById(id: number): Observable<any> {
  return this.http.get(`https://localhost:7152/api/Flight/GetByID/${id}`);
}

flightData: any;
flightID:number=0;
priceFly: number=0;
priceMap:number=0;
totalPrice:number=0;
ticket:number=0;
depDate:Date = new Date();
arrDate: Date = new Date();
flyss:any={};
  gitItById(id: number) {
    debugger;
    this.getFlightById(id).subscribe(
      (data) => {
        this.showImage = data.image;
        this.flightData = data; 
        this.priceFly = data.price;
        this.flyss=data;
        //this.dialog.open(this.openId, { data: { flightData: this.flightData } });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
