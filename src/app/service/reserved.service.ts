import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ReservedService {

  constructor(private http:HttpClient, private toast:ToastrService) { }


  reservedFlight(body:any){
    debugger;
    const reservedDate:Date = new Date();
    body.reserveddate = reservedDate.toISOString();
    this.http.post('https://localhost:7152/api/ReservedFlight',body).subscribe((res:any)=>{
      console.log(res);
    }, err=>{
      console.log(err);
      
    })
  }

  updateBalance(body:any){
    debugger;
    this.http.put('https://localhost:7152/api/Bank', body).subscribe((res:any)=>{
      console.log(res);
    }, err=>{
      console.log(err);
    })
  }
}
