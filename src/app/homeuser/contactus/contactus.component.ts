import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicHomeService } from 'src/app/service/dynamic-home.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit{
  constructor(public home:DynamicHomeService){}

  ngOnInit(): void {
    this.home.getHomeById();
  }
  AddContact:FormGroup=new FormGroup({
    email:new FormControl(''),
    phone: new FormControl(''),
    message: new FormControl(''),
    subject: new FormControl('')
  })

  createContact(){
    this.home.createContact(this.AddContact.value)
  }
  
}
