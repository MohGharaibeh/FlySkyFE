import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ManageHomeService } from 'src/app/service/manage-home.service';
import emailjs from '@emailjs/browser'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(public contact: ManageHomeService, public dialog:MatDialog){}
  ngOnInit(): void {
    this.contact.gatAllContact();
  }
  @ViewChild('replay') Replay !: TemplateRef<any>
  openDialog(){
    this.dialog.open(this.Replay)
  }
  message:string=''
  async send(){
        emailjs.init('WUYDaTHGfphEyabcy');
        await emailjs.send("service_nvrfer9","template_s0kj9tp",{
          from_name: "GoTrip",
          to_name: this.userEmail,
          message: this.message,
          email: this.userEmail,
        });
      }
      userEmail: string='';
      gitItById(id: number) {
    
        this.contact.getContactById(id).subscribe(
          (data) => {
            this.userEmail = data.email; 
            this.dialog.open(this.Replay)
          },
          (error) => {
            console.error(error);
          }
        );
      }
}
