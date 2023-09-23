import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(public user: RegisterService){}
  ngOnInit(): void {
    const id = localStorage.getItem('userID');
    if (id){
      this.user.getUserByID(id);
    }
    
  }

  updateForm: FormGroup = new FormGroup({
    useracountid: new FormControl(localStorage.getItem('userID')),
    email : new FormControl(),
    password: new FormControl(),
    image : new FormControl(),
    fname: new FormControl(),
    lname: new FormControl(),
    roleid: new FormControl(2),
    birthdate: new FormControl()

  })
  submitUdpate(){
    
    this.user.updateUser(this.updateForm.value);
  }

  uploadImage(file:any){
    if (file.length == 0){
      return ;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.user.uploadImage(formData);
  }
 
}
