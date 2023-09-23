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

  profileUser:any ={};
  imageUser:any ='';
  getUserByID(id:any){
    this.http.get('https://localhost:7152/api/UserAccount/get/'+id).subscribe((res:any)=>{
      //console.log(res);
      this.profileUser = res;
      this.showImage = res.image;
      console.log(this.profileUser)
    },err=>{
      console.log(err);
    })
  }

  updateUser(body:any){
    debugger;
   body.image = this.showImage;
    this.http.put('https://localhost:7152/api/UserAccount',body).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      console.log(err)
    })

    window.location.reload();
  }
}
