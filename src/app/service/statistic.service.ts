import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getNumOfUser(){
    this.http.get('https://localhost:7152/api/Statistic').subscribe((res:any)=>{
    console.log(res);
    
    }, err=>{
      console.log(err);
      
    })
  }
}
