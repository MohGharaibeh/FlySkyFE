import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageHomeService } from 'src/app/service/manage-home.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  constructor(public about: ManageHomeService, private dialog: MatDialog){}
  ngOnInit(): void {
    this.about.showAllAboutPage();
  }


  
  updateForms : FormGroup = new FormGroup({
     aboutid : new FormControl(''),
     descriptions: new FormControl(''),
     text1: new FormControl(''),
     text2: new FormControl(''),
     text3: new FormControl(''),
     text4: new FormControl(''),
     text5: new FormControl(''),
     image: new FormControl('')

  });
  @ViewChild('updateDialog') updateDialoge !: TemplateRef<any>
  data:any={}
  openUpdateDialog(obj:any){
    this.data = obj;
    this.dialog.open(this.updateDialoge);
    this.updateForms.controls['aboutid'].setValue(this.data.aboutid);
  }

  updateAbout(){
    this.about.updateAboutPage(this.data);
  }


  uploadImage(file:any){
    if (file.length == 0){
      return ;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.about.uploadAboutImage(formData);
  }
}
