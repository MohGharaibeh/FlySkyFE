import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlightService } from 'src/app/service/flight.service';
import { ReservedService } from 'src/app/service/reserved.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  constructor(public reserv:ReservedService, private _formBuilder: FormBuilder,
     public fly:FlightService, private route: ActivatedRoute, private toast:ToastrService, private router:Router){
  
  }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit(): void {
    console.log(paypal); 
console.log(this.Pay.nativeElement);

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
        var email = {
          NumOfTicket:this.fly.ticket,
          UserEmail:localStorage.getItem('userEmail'),
          TotalPrice:this.fly.totalPrice,
          ArrivalDate: this.fly.arrDate,
          DepartureDate: this.fly.depDate
        }
        this.reserv.reservedFlight(b,email)
        
        return actions.order.capture().then((details: any) => {

          console.log(details);
          this.toast.success('Payment Success')
          this.router.navigate(['user/track'])
          // Put toastr
        });
        
      },
      onError: (error: any) => {
        console.log(error);
        this.toast.error('Somthing Error')
        // toastr errors here
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
    UserEmail: new FormControl(localStorage.getItem('userEmail')),
    DepartureDate: new FormControl(this.fly.depDate),
    ArrivalDate: new FormControl(this.fly.arrDate)
  })
userEmail:any =localStorage.getItem('userEmail');
  // totalPrice = (ev:any)=>{
  //   console.log(ev.target.value);
  //   this.formPay.controls['balance'].setValue(this.fly.totalPrice);
    
  // }
  
    sendPay(){
      var b ={
        numberofticket:this.formPay.controls['numberofticket'].value,
        useracountid:this.formPay.controls['useracountid'].value,
        flightid:this.formPay.controls['flightid'].value
      }
      var email = {
        NumOfTicket:this.formPay.controls['numberofticket'].value,
        UserEmail:this.formPay.controls['UserEmail'].value,
        TotalPrice:this.formPay.controls['balance'].value,
        ArrivalDate: this.formPay.controls['ArrivalDate'].value,
        DepartureDate: this.formPay.controls['DepartureDate'].value
      }
     // await this.reserv.reservedFlight(b,email)

      var bank={
        iban:this.formPay.controls['iban'].value,
        cvv:this.formPay.controls['cvv'].value,
        exdate:this.formPay.controls['exdate'].value,
        balance:this.formPay.controls['balance'].value
      }

      // var chBaln ={
      //   iban:this.formPay.controls['iban'].value,
      //   cvv:this.formPay.controls['cvv'].value,
      //   exdate:this.formPay.controls['exdate'].value,
      //   balance:this.formPay.controls['balance'].value
      // }
      var chBank ={
        iban:this.formPay.controls['iban'].value,
        cvv:this.formPay.controls['cvv'].value,
        exdate:this.formPay.controls['exdate'].value
      }
      this.reserv.reservedAndCheck(b,email,chBank,bank)
     // await this.reserv.updateBalance(bank)
      
    }
    
}
