import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:LoginService, public toast:ToastrService){}
loginForm = new FormGroup({
  email : new FormControl(''),
  password : new FormControl('')
})
 

  async submit(){
    debugger;
    //console.log(this.email.value);

    
    const x =await this.auth.login(this.loginForm.value)
    if (x === false){
      this.toast.error('Email or password invalid')
    }
    else{
      this.toast.success(`Welcome ${localStorage.getItem('fname')}` )
    }
  }
}
