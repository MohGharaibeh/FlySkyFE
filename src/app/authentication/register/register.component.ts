import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public register : RegisterService, private router : Router) {}

  createForm : FormGroup = new FormGroup({
    email: new FormControl(''),
    password : new FormControl(''),
    fname : new FormControl(''),
    lname : new FormControl(''),
    image :new FormControl(''),
    birthdate: new FormControl(''),
    roleid : new FormControl(2)
  });

  createUser(){
    this.register.createUser(this.createForm.value);
    this.router.navigate(['/auth/login']);
  }
  uploadImage(file:any){
    if (file.length == 0){
      return ;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.register.uploadImage(formData);
  }
}
