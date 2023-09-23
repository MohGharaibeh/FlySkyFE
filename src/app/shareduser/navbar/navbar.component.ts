import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private router: Router,public user: RegisterService) { }
  ngOnInit(): void {
    const id = localStorage.getItem('userID');
    this.user.getUserByID(id);
  }
  logout(){
    localStorage.removeItem('token'); // Replace 'token' with the name of your token key
    localStorage.removeItem('user'); // Replace 'user' with the name of your user data key
    localStorage.removeItem('userID');

    this.router.navigate(['']);
  }
}
