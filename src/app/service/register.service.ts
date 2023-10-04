import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private rout:Router, private toast:ToastrService) { }

  // checkEmailExistence(email: string): Observable<boolean> {
  //   // Make an API call to check if the email exists
  //   return this.http.get<boolean>(`https://localhost:7152/api/UserAccount/chickUser/?email=${email}`);
  // }

existEmail: any ={};
checkEmailExistence(email: string){
  this.http.get('https://localhost:7152/api/UserAccount/chickUser/'+email).subscribe((res:any)=>{
    this.existEmail = res;
  },err=>{
    console.log(err);
  })
}

  createUser(body:any){
    debugger;
    this.checkEmailExistence(body.email);
    if(this.existEmail != null){
      this.toast.error("this email is already exist!")
      console.log(this.existEmail);
    }
    else{
      body.image = this.showImage;
      this.http.post('https://localhost:7152/api/UserAccount/',body).subscribe((res:any)=>{
        console.log(res);
        setTimeout(() => {
          this.rout.navigate(['auth/login'])
        }, 1000);
        this.toast.success('Registerd Sucssesfuly')
      },err =>{
        console.log(err)
        this.toast.error('Somthing Error')
      })
    }
    //const userEmail = body.email;
  //   this.checkEmailExistence(userEmail).subscribe((emailExists: boolean) => {
  //     if (emailExists) {
  //       // Email already exists, show an error message or take appropriate action
  //       this.toast.error('Email already exists');
  //     } 
  //   else{
  //     body.image = this.showImage;
  //     this.http.post('https://localhost:7152/api/UserAccount/',body).subscribe((res:any)=>{
  //       console.log(res);
  //       setTimeout(() => {
  //         this.rout.navigate(['auth/login'])
  //       }, 1000);
  //       this.toast.success('Registerd Sucssesfuly')
  //     },err =>{
  //       console.log(err)
  //       this.toast.error('Somthing Error')
  //     })
  //   }
  // })

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

  newPass:any;

  updateUser(body:any){
    debugger;
   body.image = this.showImage;
   body.fname = this.profileUser.fname;
   body.lname = this.profileUser.lname;
   body.email = this.profileUser.email;
   body.password = this.newPass;
   body.birthdate = this.profileUser.birthdate;
    this.http.put('https://localhost:7152/api/UserAccount',body).subscribe((res:any)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Update Sucssesfuly')
    },err=>{
      console.log(err)
      this.toast.error('Somthing Error')
    })

  }
}
