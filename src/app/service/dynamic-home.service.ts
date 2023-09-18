import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicHomeService {

  constructor(private http:HttpClient) { }
  fullHome:any=[{}]
  imageHome:string='';
  t1:string=''
  getHomeById(){
    this.http.get('https://localhost:7152/api/page/getid').subscribe((res:any)=>{
      this.fullHome=res;
      this.imageHome = res.image;
      this.t1 = res.text1;
    }, err=>{
      console.log(err);
      
    })
  }
}
