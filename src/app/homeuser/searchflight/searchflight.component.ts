import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/service/flight.service';
import { SearchDateUserService } from 'src/app/service/search-date-user.service';

@Component({
  selector: 'app-searchflight',
  templateUrl: './searchflight.component.html',
  styleUrls: ['./searchflight.component.css']
})
export class SearchflightComponent implements OnInit{
  constructor(public search: SearchDateUserService,public fly: FlightService,public dialog:MatDialog,public router:Router){}
  ngOnInit(): void {
    
  }
  @ViewChild('putTicketCard') ticketCard !: TemplateRef<any>;
  tikCard:number=0;
  cardDialog(id:number, price:number){
    this.fly.flightID = id;
    this.fly.priceMap = price;
    this.fly.ticket = this.tikCard;
    this.dialog.open(this.ticketCard);
  }

  takeCardTicket(){
    this.fly.totalPrice = this.tikCard * this.fly.priceMap;
    
    this.dialog.closeAll();
    this.router.navigate(['/user/pay'])
  }
  tickCard = (ev:any)=>{
    this.tikCard = Number(ev.target.value);
    this.fly.ticket = Number(ev.target.value);
    
  }
}
