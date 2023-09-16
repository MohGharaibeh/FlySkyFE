import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  createUser(body:any){
    debugger;
    body.image = this.showImage;
    this.http.post('https://localhost:7152/api/UserAccount/',body).subscribe((res:any)=>{
      console.log(res);
    },err =>{
      console.log(err)
    })
  }

  showImage:any;
  uploadImage(img : FormData){
    this.http.post('https://localhost:7152/api/UserAccount/uploadImage', img).subscribe((res:any)=>{
      console.log(res);
      this.showImage = res.image;
    }, err=>{
      console.log(err);
      
    })
  }
}
