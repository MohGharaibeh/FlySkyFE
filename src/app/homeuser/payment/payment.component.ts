import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlightService } from 'src/app/service/flight.service';
import { ReservedService } from 'src/app/service/reserved.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  constructor(public reserv:ReservedService, private _formBuilder: FormBuilder, public fly:FlightService){
    // if (this.fly?.flightData?.price) {
    //   // Use the Number() function to convert strings to numbers safely
    //   this.balance = new FormControl(
    //     Number(this.fly.flightData.price) * Number(this.numberofticket)
    //   );
    //   this.flightid.setValue(this.fly.flightData.flightid);
    // } else {
    //   this.balance = new FormControl(0); // Set a default value if flightData or price is not defined
    // }
  }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit(): void {
    console.log(window.paypal);
    console.log(this.Pay.nativeElement);
    // Attempt to render PayPal buttons
    if (window.paypal && this.Pay.nativeElement) {
      window.paypal.Buttons(
        {
          style:{
            layout:'horizontal',
            label:'paypal',
            color:'blue',
            shape:'rect',
          },
          createOrder(data:any, action:any){
            return action.order.Create({
              burchase_units:[
                {
                  amount:{
                    value:0, //dynamic amount put here 
                    currency_code:'USD'
                  }
                }
              ]
            });
          },
          onApprove:(data:any, action:any)=>{
            return action.order.Capture().then((details:any)=>{
              console.log(details);
              // put toastr here
              
            });
          },
          onError:(error:any)=>{
            console.log(error);
            //error toastr here
          }
        }
      ).render(this.Pay.nativeElement);
    
  }
}


  @ViewChild('paypal', {static:true}) Pay !:ElementRef;
    
  formPay: FormGroup = new FormGroup({
    numberofticket : new FormControl(),
    iban : new FormControl(),
    cvv : new FormControl(),
    exdate : new FormControl(),
    balance : new FormControl,
    useracountid : new FormControl(localStorage.getItem('userID')),
    flightid : new FormControl(this.fly.flightID),
  })

  totalPrice = (ev:any)=>{
    console.log(ev.target.value);
    this.formPay.controls['balance'].setValue(ev.target.value * this.fly.priceFly);
    
  }
  
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
