// StatisticService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpClient) { }
  
  num : number =0;
  getNum(){
    this.http.get('https://localhost:7152/api/Statistic').subscribe((res:any)=>{
      this.num = +res ;
    }, err =>{
      console.log(err);
      
    })
  }
  NumOfAirport : number =0;
  getNumOfAirport() {
    this.http.get<number>('https://localhost:7152/api/Statistic/viewAirport').subscribe((res:any)=>{
    this.NumOfAirport = +res;
    }, err=>{
      console.log(err);
      
    })
      
  }
  maxReserved : number=0;
  getMaxReserved(){
    this.http.get('https://localhost:7152/api/Statistic/maxReserveFlight').subscribe((res:any)=>{
    this.maxReserved = +res;
    }, err =>{
      console.log(err);
      
    })
  }
}