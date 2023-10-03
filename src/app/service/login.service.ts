import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient, private router:Router) { }

  async login(body:any){
    debugger;
    var request={
      email:body.email,
      password:body.password
    }
    const headerDirc={
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    const requestOption={
      headers:new HttpHeaders(headerDirc)
    }
    await this.http.post('https://localhost:7152/api/UserAccount/login', request, requestOption).subscribe((res:any)=>{
      const response = {
        token:res.toString()// to string becase localstorge
      }
      //save token in local storge
      localStorage.setItem('token', response.token) //take key , value as string هون بكون مشفر
      let data:any = jwt_decode(response.token); // decode for token هون فكينا التشفير
      localStorage.setItem('userID',data['Useracountid']);
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('userEmail',data['email'])
      localStorage.setItem('fname', data['fname'])
      const role = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
      if(role=='1'){
        this.router.navigate(['admin/index']);

      }
      else if (role=='2'){
        this.router.navigate(['user/index'])
      }
      console.log(data);
    }, err=>{
      console.log(err);
      
    })
  }
}
