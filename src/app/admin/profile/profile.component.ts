import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public user: RegisterService,public toaster : ToastrService,public dialog: MatDialog){}
  ngOnInit(): void {
    const id = localStorage.getItem('userID');
    if (id){
      this.user.getUserByID(id);
    }
    
  }

  @ViewChild('changePassword') changePass !: TemplateRef<any>;
  @ViewChild('changeInfo') changeInfo !: TemplateRef<any>;

  openInfo(){
    this.dialog.open(this.changeInfo);
  }

  openPass(){
    this.dialog.open(this.changePass);
  }

  updateForm: FormGroup = new FormGroup({
    useracountid: new FormControl(localStorage.getItem('userID')),
    email : new FormControl(''),
    password: new FormControl(this.user.profileUser.password,[Validators.required]),
    image : new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    roleid: new FormControl(1),
    birthdate: new FormControl(),
  })

  updatePassForm: FormGroup = new FormGroup({
    password: new FormControl('',[Validators.required]),
    newpassword: new FormControl('',[Validators.required]),
    repassword: new FormControl('',[Validators.required]),

    useracountid: new FormControl(localStorage.getItem('userID')),
    email : new FormControl(this.user.profileUser.email),
    image : new FormControl(this.user.profileUser.image),
    fname: new FormControl(this.user.profileUser.fname),
    lname: new FormControl(this.user.profileUser.lname),
    roleid: new FormControl(1),
    birthdate: new FormControl(this.user.profileUser.birthdate),
  })

  matchPass(){

    if (this.updatePassForm.controls['password'].value == this.user.profileUser.password){
      if(this.updatePassForm.controls['newpassword'].value == this.updatePassForm.controls['repassword'].value){
        this.updatePassForm.controls['password'].setValue(this.updatePassForm.controls['newpassword'].value) 
        this.user.newPass = this.updatePassForm.controls['password'].value;
        this.user.updateUser(this.updatePassForm.value)
      }
      else{
        this.toaster.error('new password not matched')
      }
    
    }
    else{
      this.toaster.error('current password not correct')
    }
  }
  submitUdpate(){
    this.user.newPass = this.user.profileUser.password;
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
