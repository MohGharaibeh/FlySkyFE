import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http : HttpClient) { }

  airports: any=[{}];
  getAirport(){
    this.http.get('https://localhost:7152/api/Airport').subscribe((res)=>{
      this.airports = res;
    }, err=>{
      console.log(err);
      
    })
  }

  deleteAirport(id : number){
    this.http.delete('https://localhost:7152/api/Airport/'+id).subscribe((res)=>{
      console.log(res);
      
    }, err=>{
      console.log(err);
      
    })
    window.location.reload();
  }

  updateAirport(body:any){
    this.http.put('https://localhost:7152/api/Airport', body).subscribe((res: any)=>{
      console.log(res);
      window.location.reload();
    }, err=>{
      console.log(err);
      
    })
  }

  async createAirport(body:any){
    debugger;
    await this.http.post('https://localhost:7152/api/Airport/AddAirport/', body).subscribe((res:any)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, err=>{
      console.log(err);
      
    })
  }
}
