import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageHomeService } from 'src/app/service/manage-home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(public home : ManageHomeService,private dialog: MatDialog){}
  ngOnInit(): void {
    this.home.showAllHomePage();
  }

  updateForms : FormGroup = new FormGroup({
    pagesid : new FormControl(''),
    paragraph: new FormControl(''),
     text1: new FormControl(''),
     text2: new FormControl(''),
     text3: new FormControl(''),
     text4: new FormControl(''),
     text5: new FormControl(''),
     text6: new FormControl(''),
     text7: new FormControl(''),
     image: new FormControl('')

  });
  @ViewChild('updateDialog') updateDialoge !: TemplateRef<any>
  data:any={}
  openUpdateDialog(obj:any){
    this.data = obj;
    this.dialog.open(this.updateDialoge);
    this.updateForms.controls['pagesid'].setValue(this.data.pagesid);
  }

  updateHome(){
    this.home.updateHomePage(this.data);
  }


  uploadImage(file:any){
    if (file.length == 0){
      return ;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.home.uploadImage(formData);
  }

}
