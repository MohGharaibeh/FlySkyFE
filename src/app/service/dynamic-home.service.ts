import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  fullAbout:any=[{}];
  imageAbout:string='';
  getAboutById(){
    this.http.get('https://localhost:7152/api/about/getid').subscribe((res:any)=>{
      this.fullAbout = res;
      this.imageAbout = res.image;
    }, err=>{
      console.log(err);
      
    })
  }

  createContact(body:any){
    debugger;
    const currentDate = new Date();
    body.senddate = currentDate.toISOString();
    this.http.post('https://localhost:7152/api/Contact', body).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    }, err=>{
      console.log('Error:'+err);
      
    })
  }

  
}
