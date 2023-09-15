import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageHomeService {

  constructor(private http : HttpClient) { }

  homePage:any=[{}];
  showAllHomePage(){
    this.http.get('https://localhost:7152/api/Page').subscribe((res)=>{
      this.homePage = res;
    }, err=>{
      console.log(err);
      
    })
  }

  updateHomePage(body:any){
    body.image=this.showImage ;
    this.http.put('https://localhost:7152/api/Page/', body).subscribe((res)=>{
      console.log(res);
      
    }, err=>{
      console.log(err);
      
    })
  }

  showImage:any;
  uploadImage(img:FormData){
    this.http.post('https://localhost:7152/api/Page/uploadImage/', img).subscribe((res:any)=>{
      this.showImage = res.image;
    }, err=>{
      console.log(err);
      
    })
  }
}
