import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  constructor(public router: Router){}
  logout(){
    localStorage.removeItem('token'); // Replace 'token' with the name of your token key
    localStorage.removeItem('user'); // Replace 'user' with the name of your user data key
    localStorage.removeItem('userID');

    this.router.navigate(['']);
  }
}
