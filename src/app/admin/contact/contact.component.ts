import { Component, OnInit } from '@angular/core';
import { ManageHomeService } from 'src/app/service/manage-home.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(public contact: ManageHomeService){}
  ngOnInit(): void {
    this.contact.gatAllContact();
  }
}
