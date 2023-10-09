import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReservedService {

  constructor(private http:HttpClient, private toast:ToastrService,public router: Router) { }


  reservedFlight(body:any,email:any){
    debugger;
    const reservedDate:Date = new Date();
    body.reserveddate = reservedDate.toISOString();
    email.reservedDate = reservedDate.toISOString();
    const requestData = {
      reservedflight: body,
      data: email
    };
    this.http.post('https://localhost:7152/api/ReservedFlight',requestData).subscribe((res:any)=>{
      console.log(res);
    }, err=>{
      console.log(err);
      
    })
  }

  updateBalance(body:any){
    debugger;
    this.http.put('https://localhost:7152/api/Bank', body).subscribe((res:any)=>{
      console.log(res);
      this.toast.success('Reserved Complete')
    }, err=>{
      console.log(err);
      this.toast.error('Somthing error')
    })
  }

  bankCheck:any = {};
  checkBank(bank:any){
    //debugger;
    this.http.post('https://localhost:7152/api/Bank/checkBank',bank).subscribe((res:any)=>{
      this.bankCheck = res;
      console.log(this.bankCheck);
    },err=>{
      console.log(err)
    })
  }

  BalanceCheck: any ={};
  checkBalance(bank:any){
    this.http.post('https://localhost:7152/api/Bank/checkBalance',bank).subscribe((res:any)=>{
      this.BalanceCheck = res;
      console.log(this.BalanceCheck);
    },err=>{
      console.log(err)
    })
  }


  flightCapacity:any = {};
  gitFlight(id:number){
    debugger;
    this.http.get('https://localhost:7152/api/Flight/GetByID/'+id).subscribe((res:any)=>{
      this.flightCapacity = res;
      console.log(this.flightCapacity)
    },err=>{
      console.log(err);
    })
  }

  updateCapacity(id:any,cap:any){
    const body = {
      flightid : id,
      capacity: cap
    }
    this.http.put('https://localhost:7152/api/Flight/updateCapacity',body).subscribe((res)=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  async reservedAndCheck(reserved:any,email:any , chBank:any, updBaln:any){
   // this.checkBalance(chBaln);
    this.checkBank(chBank);
    this.gitFlight(reserved.flightid)
    debugger;
    if(this.bankCheck == null) {
      
      this.toast.error('This card is not exist');
      //window.location.reload();
      console.log('bank res',this.bankCheck)
    }
  
      if(this.bankCheck.balance >= updBaln.balance){
       
      if(this.flightCapacity.capacity >= reserved.numberofticket){
        await this.reservedFlight(reserved,email);
        await this.updateBalance(updBaln);
        await this.updateCapacity(reserved.flightid,reserved.numberofticket);
 
       setTimeout(() => {
         this.router.navigate(['/user/track']);
         
       }, 2000);
       this.toast.success('Success Payment');
       // window.location.reload();
      }

      if(this.flightCapacity.capacity < reserved.numberofticket){
        this.toast.error('Capacity of this flight is not enough')
      }
       
      }
      if(this.bankCheck.balance < updBaln.balance){
        this.toast.error('Your balance not enough');
       // window.location.reload();
      }

      
      
    
  }

  flightUser:any=[{}];
  getReservedUser(id:number){
    //id:number = localStorage.getItem('userID')
    this.http.get(`https://localhost:7152/api/UserAccount/getres/${id}`).subscribe((res:any)=>{
      this.flightUser = res;
      console.log(res);
    }, err=>{
      console.log(err);
    })
  }
}
