import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:LoginService){}
loginForm = new FormGroup({
  email : new FormControl(''),
  password : new FormControl('')
})
 

  async submit(){
    debugger;
    //console.log(this.email.value);
    
    await this.auth.login(this.loginForm.value)
  }
}
