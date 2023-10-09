import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchDateUserService {

  dateShow: any = [{}];
  countryShow: any = [{}];
  constructor(private http: HttpClient) { }

  serachDate(body:any){
    debugger;
    this.http.post('https://localhost:7152/api/UserAccount/ByDate',body).subscribe((res:any)=>{
      
      this.dateShow = res.filter((x:any)=>x.status ==='wait');
      console.log(this.dateShow)
    },err=>{
      console.log(err)
    })
  }

  searchCountry(body:any){
    debugger;
    this.http.post('https://localhost:7152/api/UserAccount/ByCountry',body).subscribe((res:any)=>{
      this.countryShow = res.filter((x:any)=>x.status ==='wait');
      console.log(this.dateShow)
    })
  }
}
