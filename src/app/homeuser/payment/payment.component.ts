import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/service/flight.service';
import { ReservedService } from 'src/app/service/reserved.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  constructor(public reserv:ReservedService, private _formBuilder: FormBuilder,
     public fly:FlightService, private route: ActivatedRoute){
  
  }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit(): void {
    console.log(paypal); // Check if 'paypal' object is accessible globally
console.log(this.Pay.nativeElement);

// Attempt to render PayPal buttons
if (paypal && this.Pay.nativeElement) {
  paypal.Buttons(
    {
      style: {
        layout: 'horizontal',
        label: 'paypal',
        color: 'blue',
        shape: 'rect',
      },
      createOrder: (data: any, actions: any) => {
        var total = this.fly.totalPrice;
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total, // Dynamic amount goes here
                currency_code: 'USD'
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        var b ={
          numberofticket:this.fly.ticket,
          useracountid:localStorage.getItem('userID'),
          flightid:this.fly.flightID
        }
        this.reserv.reservedFlight(b)
        return actions.order.capture().then((details: any) => {

          console.log(details);
          // Put toastr or any other handling here
        });
      },
      onError: (error: any) => {
        console.log(error);
        // Handle errors here
      }
    }
  ).render(this.Pay.nativeElement);

  this.route.queryParams.subscribe((params) => {
    const flightId = params['flightid'];
    const price = params['price'];

    // Now you can use flightId and price in your PayComponent
    console.log('Flight ID:', flightId);
    console.log('Price:', price);
  });

}
  
}


  @ViewChild('paypal', {static:true}) Pay !:ElementRef;
    
  formPay: FormGroup = new FormGroup({
    numberofticket : new FormControl(this.fly.ticket),
    iban : new FormControl(),
    cvv : new FormControl(),
    exdate : new FormControl(),
    balance : new FormControl(this.fly.totalPrice),
    useracountid : new FormControl(localStorage.getItem('userID')),
    flightid : new FormControl(this.fly.flightID),
  })

  // totalPrice = (ev:any)=>{
  //   console.log(ev.target.value);
  //   this.formPay.controls['balance'].setValue(this.fly.totalPrice);
    
  // }
  
    async sendPay(){
      debugger;
      var b ={
        numberofticket:this.formPay.controls['numberofticket'].value,
        useracountid:this.formPay.controls['useracountid'].value,
        flightid:this.formPay.controls['flightid'].value
      }
      await this.reserv.reservedFlight(b)

      var bank={
        iban:this.formPay.controls['iban'].value,
        cvv:this.formPay.controls['cvv'].value,
        exdate:this.formPay.controls['exdate'].value,
        balance:this.formPay.controls['balance'].value
      }
      await this.reserv.updateBalance(bank)
      
    }
    
}
