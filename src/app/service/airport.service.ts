import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http : HttpClient, private toast:ToastrService) { }

  airports: any=[{}];
  getAirport(){
    this.http.get('https://localhost:7152/api/Airport').subscribe((res)=>{
      this.airports = res;
    }, err=>{
      console.log(err);
      
    })
  }

  deleteAirport(id : number){
    debugger;
    this.http.delete('https://localhost:7152/api/Airport/'+id).subscribe((res)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Delete Sucssesfuly')
    }, err=>{
      console.log(err);
      this.toast.error('Somthing Error')
    })
  }

  updateAirport(body:any){
    this.http.put('https://localhost:7152/api/Airport', body).subscribe((res: any)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Update Sucssesfuly')
    }, err=>{
      console.log(err);
      
    })
  }

   createAirport(body:any){
    debugger;
     this.http.post('https://localhost:7152/api/Airport/', body).subscribe((res:any)=>{
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
}
