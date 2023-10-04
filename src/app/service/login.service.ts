import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import jwt_decode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient, private router:Router, public toast:ToastrService) { }

  async login(body: any): Promise<boolean> { // Specify the return type as Promise<boolean>
    try {
      const request = {
        email: body.email,
        password: body.password
      };
  
      const headerDirc = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
  
      const requestOption = {
        headers: new HttpHeaders(headerDirc)
      };
  
      const res: any = await this.http.post('https://localhost:7152/api/UserAccount/login', request, requestOption).toPromise();
  
      const response = {
        token: res.toString() // to string because of localStorage
      };
  
      // Save token in local storage
      localStorage.setItem('token', response.token);
  
      let data: any = jwt_decode(response.token);
      localStorage.setItem('userID', data['Useracountid']);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userEmail', data['email']);
      localStorage.setItem('fname', data['fname']);
      const role = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
      if (role === '1') {
        this.router.navigate(['admin/index']);
      } else if (role === '2') {
        this.router.navigate(['user/index']);
      }
      
      return true; // Return true for successful login
    } catch (err) {
      console.log(err);
      return false; // Return false for failed login
    }
  }
  
}
